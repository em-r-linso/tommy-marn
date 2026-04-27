"use client";

import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// Shared RAF scheduler — a single rAF loop drives all WiggleSvgFile instances.
// Each subscriber has its own target interval and fires independently with a
// small random jitter (±JITTER_FRACTION of the interval) so instances are
// naturally staggered rather than all updating in the same frame.
// ---------------------------------------------------------------------------

// Fraction of the base interval added as random jitter each time a subscriber
// fires.  0.25 means the wait is anywhere from 0.75× to 1.25× the base.
const JITTER_FRACTION = 0.25;

type FrameCallback = (now: number) => void;

type Subscriber = {
	callback: FrameCallback;
	intervalMs: number;
	nextFireTime: number;
};

const subscribers = new Map<FrameCallback, Subscriber>();
let sharedRafId = 0;

function nextFireTime(now: number, intervalMs: number): number {
	const jitter = (Math.random() * 2 - 1) * JITTER_FRACTION * intervalMs;
	return now + intervalMs + jitter;
}

function sharedTick(now: number): void {
	sharedRafId = window.requestAnimationFrame(sharedTick);
	for (const sub of subscribers.values()) {
		if (now >= sub.nextFireTime) {
			sub.nextFireTime = nextFireTime(now, sub.intervalMs);
			sub.callback(now);
		}
	}
}

function subscribeToSharedRaf(callback: FrameCallback, fps: number): () => void {
	const intervalMs = 1000 / fps;
	// Stagger the very first fire so multiple instances mounted together don't
	// all fire on the same frame.
	const sub: Subscriber = {
		callback,
		intervalMs,
		nextFireTime: nextFireTime(performance.now(), intervalMs),
	};
	subscribers.set(callback, sub);
	if (subscribers.size === 1) {
		sharedRafId = window.requestAnimationFrame(sharedTick);
	}
	return () => {
		subscribers.delete(callback);
		if (subscribers.size === 0) {
			window.cancelAnimationFrame(sharedRafId);
			sharedRafId = 0;
		}
	};
}

type WiggleSvgFileProps = {
	src: string;
	rangePx: number;
	frequencyHz: number;
	fps?: number;
	enabled?: boolean;
	className?: string;
};

type NumberRole = "x" | "y" | "other";

type PathToken =
	| {
			kind: "cmd";
			value: string;
	  }
	| {
			kind: "num";
			value: number;
			role: NumberRole;
			seed: number;
	  };

type PathModel = {
	element: SVGPathElement;
	originalD: string;
	tokens: PathToken[];
};

type PolyModel = {
	element: SVGPolygonElement | SVGPolylineElement;
	originalPoints: string;
	baseValues: number[];
	seeds: number[];
};

const NUMBER_RE = /[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?/g;
const TOKEN_RE = /[a-zA-Z]|[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?/g;

const REF_ATTRS = [
	"href",
	"xlink:href",
	"clip-path",
	"filter",
	"mask",
	"fill",
	"stroke",
	"marker-start",
	"marker-mid",
	"marker-end",
	"begin",
	"style",
] as const;

const COMMAND_ROLES: Record<string, NumberRole[]> = {
	M: ["x", "y"],
	L: ["x", "y"],
	T: ["x", "y"],
	H: ["x"],
	V: ["y"],
	C: ["x", "y", "x", "y", "x", "y"],
	S: ["x", "y", "x", "y"],
	Q: ["x", "y", "x", "y"],
	A: ["other", "other", "other", "other", "other", "x", "y"],
	Z: [],
};

function formatNumber(value: number): string {
	return Number(value.toFixed(2)).toString();
}

function wave(
	role: NumberRole,
	base: number,
	elapsedSeconds: number,
	omega: number,
	seed: number,
	rangeXUnits: number,
	rangeYUnits: number,
): number {
	if (role === "other") {
		return base;
	}

	const phase = seed * 0.731;
	if (role === "x") {
		return base + Math.sin(omega * elapsedSeconds + phase) * rangeXUnits;
	}

	return base + Math.cos(omega * elapsedSeconds + phase * 1.37) * rangeYUnits;
}

function parsePathTokens(d: string, seedRef: { current: number }): PathToken[] {
	const raw = d.match(TOKEN_RE) ?? [];
	const parsed: PathToken[] = [];

	let activeCommand = "";
	let numericIndexForCommand = 0;

	for (const token of raw) {
		if (/^[a-zA-Z]$/.test(token)) {
			activeCommand = token;
			numericIndexForCommand = 0;
			parsed.push({ kind: "cmd", value: token });
			continue;
		}

		const numericValue = Number(token);
		if (!Number.isFinite(numericValue)) {
			continue;
		}

		const roles = COMMAND_ROLES[activeCommand.toUpperCase()] ?? ["other"];
		const role = roles.length > 0 ? roles[numericIndexForCommand % roles.length] : "other";

		parsed.push({
			kind: "num",
			value: numericValue,
			role,
			seed: seedRef.current,
		});

		seedRef.current += 1;
		numericIndexForCommand += 1;
	}

	return parsed;
}

function buildPathD(
	tokens: PathToken[],
	elapsedSeconds: number,
	omega: number,
	rangeXUnits: number,
	rangeYUnits: number,
): string {
	return tokens
		.map((token) => {
			if (token.kind === "cmd") {
				return token.value;
			}

			return formatNumber(
				wave(
					token.role,
					token.value,
					elapsedSeconds,
					omega,
					token.seed,
					rangeXUnits,
					rangeYUnits,
				),
			);
		})
		.join(" ");
}

function parsePointValues(pointsAttribute: string): number[] {
	const matches = pointsAttribute.match(NUMBER_RE) ?? [];
	return matches.map((value) => Number(value)).filter((value) => Number.isFinite(value));
}

function replaceIdReferences(value: string, idMap: Map<string, string>): string {
	let next = value.replace(/url\(#([^)]+)\)/g, (full, id: string) => {
		const mapped = idMap.get(id);
		return mapped ? `url(#${mapped})` : full;
	});

	next = next.replace(/^#([_a-zA-Z][_a-zA-Z0-9-]*)$/, (full, id: string) => {
		const mapped = idMap.get(id);
		return mapped ? `#${mapped}` : full;
	});

	return next;
}

function namespaceSvg(svg: SVGSVGElement, scope: string): void {
	const classMap = new Map<string, string>();
	for (const element of Array.from(svg.querySelectorAll("[class]"))) {
		const current = element.getAttribute("class");
		if (!current) {
			continue;
		}

		for (const token of current.split(/\s+/).filter(Boolean)) {
			if (!classMap.has(token)) {
				classMap.set(token, `${scope}-${token}`);
			}
		}
	}

	const idMap = new Map<string, string>();
	for (const element of Array.from(svg.querySelectorAll("[id]"))) {
		const current = element.getAttribute("id");
		if (!current) {
			continue;
		}

		const next = `${scope}-id-${current}`;
		idMap.set(current, next);
		element.setAttribute("id", next);
	}

	for (const element of Array.from(svg.querySelectorAll("[class]"))) {
		const current = element.getAttribute("class");
		if (!current) {
			continue;
		}

		const next = current
			.split(/\s+/)
			.filter(Boolean)
			.map((token) => classMap.get(token) ?? token)
			.join(" ");

		element.setAttribute("class", next);
	}

	for (const styleElement of Array.from(svg.querySelectorAll("style"))) {
		const css = styleElement.textContent ?? "";
		let nextCss = css.replace(/\.([_a-zA-Z][_a-zA-Z0-9-]*)/g, (full, className: string) => {
			const mapped = classMap.get(className);
			return mapped ? `.${mapped}` : full;
		});

		nextCss = replaceIdReferences(nextCss, idMap);
		styleElement.textContent = nextCss;
	}

	for (const element of Array.from(svg.querySelectorAll("*"))) {
		for (const attrName of REF_ATTRS) {
			const value = element.getAttribute(attrName);
			if (!value) {
				continue;
			}

			element.setAttribute(attrName, replaceIdReferences(value, idMap));
		}

		for (const attrName of ["aria-labelledby", "aria-describedby"] as const) {
			const value = element.getAttribute(attrName);
			if (!value) {
				continue;
			}

			const next = value
				.split(/\s+/)
				.filter(Boolean)
				.map((id) => idMap.get(id) ?? id)
				.join(" ");

			element.setAttribute(attrName, next);
		}
	}
}

export default function WiggleSvgFile(props: WiggleSvgFileProps) {
	const { src, rangePx, frequencyHz, fps = 3, enabled = true, className } = props;
	const hostRef = useRef<HTMLDivElement | null>(null);
	const scopeRef = useRef(`wsvg-${Math.random().toString(36).slice(2, 10)}`);
	const [svgMarkup, setSvgMarkup] = useState<string>("");
	const [loadError, setLoadError] = useState<string>("");

	useEffect(() => {
		let cancelled = false;

		const loadSvg = async () => {
			setLoadError("");

			try {
				const response = await fetch(src);
				if (!response.ok) {
					throw new Error(`Failed to load SVG: ${response.status}`);
				}

				const text = await response.text();
				const parsed = new DOMParser().parseFromString(text, "image/svg+xml");
				const svg = parsed.querySelector("svg");

				if (!svg) {
					throw new Error("No <svg> root found in file.");
				}

				namespaceSvg(svg, scopeRef.current);

				if (!cancelled) {
					setSvgMarkup(svg.outerHTML);
				}
			} catch (error) {
				if (cancelled) {
					return;
				}

				if (error instanceof Error) {
					setLoadError(error.message);
				} else {
					setLoadError("Unknown SVG load error.");
				}

				setSvgMarkup("");
			}
		};

		void loadSvg();

		return () => {
			cancelled = true;
		};
	}, [src]);

	useEffect(() => {
		const host = hostRef.current;
		if (!host || !svgMarkup) {
			return;
		}

		const svg = host.querySelector("svg");
		if (!svg) {
			return;
		}

		const reducedMotion =
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		const seedRef = { current: 0 };

		const polyModels: PolyModel[] = [];
		for (const element of Array.from(svg.querySelectorAll("polygon, polyline"))) {
			const pointsAttribute = element.getAttribute("points");
			if (!pointsAttribute) {
				continue;
			}

			const baseValues = parsePointValues(pointsAttribute);
			if (baseValues.length < 2) {
				continue;
			}

			const seeds = baseValues.map(() => {
				const seed = seedRef.current;
				seedRef.current += 1;
				return seed;
			});

			polyModels.push({
				element: element as SVGPolygonElement | SVGPolylineElement,
				originalPoints: pointsAttribute,
				baseValues,
				seeds,
			});
		}

		const pathModels: PathModel[] = [];
		for (const element of Array.from(svg.querySelectorAll("path"))) {
			const d = element.getAttribute("d");
			if (!d) {
				continue;
			}

			const tokens = parsePathTokens(d, seedRef);
			if (tokens.length === 0) {
				continue;
			}

			pathModels.push({
				element: element,
				originalD: d,
				tokens,
			});
		}

		if (!enabled || reducedMotion || (polyModels.length === 0 && pathModels.length === 0)) {
			return;
		}

		const omega = Math.PI * 2 * frequencyHz;
		let startTime = -1;

		// Cache CTM so getScreenCTM() is NOT called every frame (forces reflow).
		// The cache is refreshed by a ResizeObserver.
		let rangeXUnits = rangePx;
		let rangeYUnits = rangePx;

		const refreshCtm = () => {
			const ctm = svg.getScreenCTM();
			const px = ctm ? Math.hypot(ctm.a, ctm.b) : 1;
			const py = ctm ? Math.hypot(ctm.c, ctm.d) : 1;
			rangeXUnits = px > 0 ? rangePx / px : rangePx;
			rangeYUnits = py > 0 ? rangePx / py : rangePx;
		};
		refreshCtm();

		const resizeObserver = new ResizeObserver(refreshCtm);
		resizeObserver.observe(svg);

		const animate = (now: number) => {
			if (startTime < 0) {
				startTime = now;
			}

			const elapsedSeconds = (now - startTime) / 1000;

			for (const model of polyModels) {
				const nextPairs: string[] = [];
				for (let index = 0; index < model.baseValues.length - 1; index += 2) {
					const x = wave(
						"x",
						model.baseValues[index],
						elapsedSeconds,
						omega,
						model.seeds[index],
						rangeXUnits,
						rangeYUnits,
					);
					const y = wave(
						"y",
						model.baseValues[index + 1],
						elapsedSeconds,
						omega,
						model.seeds[index + 1],
						rangeXUnits,
						rangeYUnits,
					);
					nextPairs.push(`${formatNumber(x)},${formatNumber(y)}`);
				}

				model.element.setAttribute("points", nextPairs.join(" "));
			}

			for (const model of pathModels) {
				model.element.setAttribute(
					"d",
					buildPathD(model.tokens, elapsedSeconds, omega, rangeXUnits, rangeYUnits),
				);
			}
		};

		const unsubscribe = subscribeToSharedRaf(animate, fps);

		return () => {
			unsubscribe();
			resizeObserver.disconnect();

			for (const model of polyModels) {
				model.element.setAttribute("points", model.originalPoints);
			}

			for (const model of pathModels) {
				model.element.setAttribute("d", model.originalD);
			}
		};
	}, [enabled, fps, frequencyHz, rangePx, svgMarkup]);

	if (loadError) {
		return <p className={className}>SVG load error: {loadError}</p>;
	}

	return (
		<div
			ref={hostRef}
			className={className}
			// The source path is local project content under public/.
			dangerouslySetInnerHTML={svgMarkup ? { __html: svgMarkup } : undefined}
		/>
	);
}
