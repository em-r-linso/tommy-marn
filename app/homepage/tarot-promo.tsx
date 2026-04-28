"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

// 0 = stays at anchor; 1 = moves all the way to cursor
const CURSOR_FOLLOW_SCALE = 0.2;

export default function TarotPromo() {
	const [ctaPos, setCtaPos] = useState<{ x: number; y: number } | null>(null);
	const [isTouch, setIsTouch] = useState(false);
	const linkRef = useRef<HTMLAnchorElement>(null);

	useEffect(() => {
		if (window.matchMedia("(pointer: coarse)").matches) {
			setIsTouch(true);
		}
	}, []);

	useEffect(() => {
		if (isTouch) return;
		const handleMouseMove = (e: MouseEvent) => {
			if (!linkRef.current) return;
			const rect = linkRef.current.getBoundingClientRect();
			const cx = ((e.clientX - rect.left) / rect.width) * 100;
			const cy = ((e.clientY - rect.top) / rect.height) * 100;
			setCtaPos({
				x: 50 + (cx - 50) * CURSOR_FOLLOW_SCALE,
				y: Math.max(0, Math.min(90, 55 + (cy - 55) * CURSOR_FOLLOW_SCALE)),
			});
		};
		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, [isTouch]);

	return (
		<section className="w-full">
			<Link
				href="/tarot"
				ref={linkRef}
				className="group relative mx-auto block aspect-[16/10] w-[min(100%,70vh)] max-w-5xl overflow-visible transition-transform duration-200 ease-out hover:scale-110"
			>
				<img src="/tarot-deck-promo/back.jpg" alt="Tarot deck" className="w-full" />

				<img
					src="/tarot-deck-promo/title.svg"
					alt="Tarot title"
					className="absolute left-1/2 -translate-x-1/2 top-[0%] h-[15%] max-w-none"
				/>

				<div
					className={
						isTouch || !ctaPos
							? "absolute left-1/2 -translate-x-1/2 top-[55%] h-[10%] w-fit px-4 py-1 rounded-md border-[clamp(1px,0.3vw,100vw)] border-black bg-white shadow-[4px_8px_5px_rgba(0,0,0,0.4)] animate-[tarotcta_20s_linear_infinite] [animation-play-state:paused] group-hover:[animation-play-state:running]"
							: "absolute h-[10%] w-fit px-4 py-1 rounded-md border-[clamp(1px,0.3vw,100vw)] border-black bg-white shadow-[4px_8px_5px_rgba(0,0,0,0.4)]"
					}
					style={
						!isTouch && ctaPos
							? {
									left: `${ctaPos.x}%`,
									top: `${ctaPos.y}%`,
									transform: "translateX(-50%)",
								}
							: undefined
					}
				>
					<img
						src="/tarot-deck-promo/cta.svg"
						alt="Call to action"
						className="block h-full w-auto max-w-none"
					/>
				</div>
			</Link>
		</section>
	);
}
