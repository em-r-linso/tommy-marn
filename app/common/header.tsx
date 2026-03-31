"use client";

import Link from "next/link";
import NavSection from "./nav-section";

const navLinks = [
	{ href: "/music", display: "Music" },
	{ href: "/merch", display: "Merch" },
	{ href: "/newsletter", display: "Newsletter" },
	{ href: "/tour", display: "Tour" },
];

export default function Header() {
	return (
		<header className="flex items-center justify-between">
			<Link href="/">
				<h1 className="text-6xl">Tommy Marn</h1>
			</Link>
			<NavSection links={navLinks} />
		</header>
	);
}
