"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export default function NavSection(props: { links: { href: string; display: ReactNode }[] }) {
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
				</Link>
			))}
		</nav>
	);
}
