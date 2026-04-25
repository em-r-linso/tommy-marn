"use client";

import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import TiltOnHoverText from "./tilt-on-hover-text";

type NavLink = {
	href: string;
	display: ReactNode;
	decorationImage?: { src: string; height: number; offsetY?: number };
	newTab?: boolean;
};

type NavSectionProps = {
	links: NavLink[];
	gapClassName?: string;
	gap?: number;
};

export default function NavSection(props: NavSectionProps) {
	const { links, gapClassName, gap = 4 } = props;
	const pathname = usePathname();
	const resolvedGapClass = gapClassName ?? `gap-${gap}`;

	return (
		<nav className={clsx("text-xl flex", resolvedGapClass)}>
			{links.map((link) => (
				<Link
					key={link.href}
					href={link.href}
					className="self-stretch flex items-center group"
					{...(link.newTab && { target: "_blank", rel: "noopener noreferrer" })}
				>
					<span className="relative inline-block overflow-visible">
						{link.decorationImage && (
							<Image
								src={link.decorationImage.src}
								width={1}
								height={link.decorationImage.height}
								alt=""
								aria-hidden
								style={{
									position: "absolute",
									top: `calc(50% + ${link.decorationImage.offsetY ?? 0}px)`,
									left: "50%",
									transform: "translate(-50%, -50%)",
									width: "auto",
									height: `${link.decorationImage.height}px`,
									maxWidth: "none",
									pointerEvents: "none",
									zIndex: -1,
								}}
							/>
						)}
						<TiltOnHoverText
							className={clsx({
								"[background-image:var(--color-accent)] bg-clip-text text-transparent [filter:drop-shadow(2px_2px_0_rgb(0_0_0))]":
									link.href == pathname,
							})}
						>
							{link.display}
						</TiltOnHoverText>
					</span>
				</Link>
			))}
		</nav>
	);
}
