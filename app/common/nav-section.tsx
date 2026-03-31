import Link from "next/link";
import type { ReactNode } from "react";

export default function NavSection(props: {
	links: { href: string; display: ReactNode }[];
}) {
	const { links } = props;

	return (
		<nav className="text-xl">
			{links.map((link) => (
				<Link key={link.href} href={link.href} className="px-5">
					{link.display}
				</Link>
			))}
		</nav>
	);
}
