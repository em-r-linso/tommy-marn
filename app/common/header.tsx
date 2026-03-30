"use client";

import Link from "next/link";

const navLinks = [
	{ href: "/music", label: "Music" },
	{ href: "/merch", label: "Merch" },
	{ href: "/newsletter", label: "Newsletter" },
	{ href: "/tour", label: "Tour" },
];

export default function Header() {
	return (
		<header>
			<Link href="/">
				<h1>Tommy Marn</h1>
			</Link>
			<nav>
				{navLinks.map((link) => (
					<Link key={link.href} href={link.href}>
						{link.label}
					</Link>
				))}
			</nav>
		</header>
	);
}
