"use client";

import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

type NavLink = {
	href: string;
	display: ReactNode;
	decorationImage?: { src: string; height: number; offsetY?: number };
};

export default function NavSection(props: { links: NavLink[] }) {
	const { links } = props;
	const pathname = usePathname();

	return (
		<nav className="text-xl flex gap-4">
			{links.map((link) => (
				<Link
					key={link.href}
					href={link.href}
					className="self-stretch flex items-center cursor-pointer group"
				>
					<span style={{ position: "relative", overflow: "visible" }}>
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
						<span
							className={clsx(
								"inline-block transition-transform duration-150 group-hover:[transform:rotate(10deg)]",
								{
									"text-yellow-500 [text-shadow:2px_2px_0_rgb(0_0_0)]":
										link.href == pathname,
								},
							)}
						>
							{link.display}
						</span>
					</span>
				</Link>
			))}
		</nav>
	);
}
