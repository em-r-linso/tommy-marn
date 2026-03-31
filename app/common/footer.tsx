"use client";

import Link from "next/link";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";

const navLinks = [
	{ href: "/music", label: "Music" },
	{ href: "/merch", label: "Merch" },
	{ href: "/newsletter", label: "Newsletter" },
	{ href: "/tour", label: "Tour" },
];

const donationLinks = [
	{ href: "https://www.patreon.com/user?u=91562271", label: "Patreon" },
	{ href: "/", label: "PayPal" }, // TODO: Update with actual PayPal link
	{ href: "https://www.buymeacoffee.com/thomasmarn", label: "BuyMeACoffee" },
];

const socialLinks = [
	{
		href: "https://www.instagram.com/thomasmarnmusic/",
		icon: <InstagramIcon />,
	},
	{
		href: "https://www.facebook.com/profile.php?id=100092565421512/",
		icon: <FacebookIcon />,
	},
	{
		href: "https://x.com/thomas_marn",
		icon: <XIcon />,
	},
	{
		href: "https://www.youtube.com/channel/UCpXf2lsrbfIYtQOrhGR1qQg/",
		icon: <YouTubeIcon />,
	},
];

export default function Footer() {
	return (
		<footer>
			<Link href="/">
				<h1>Tommy Marn</h1>
			</Link>
			<nav>
				{socialLinks.map((link) => (
					<Link key={link.href} href={link.href}>
						{link.icon}
					</Link>
				))}
			</nav>
			<nav>
				{navLinks.map((link) => (
					<Link key={link.href} href={link.href}>
						{link.label}
					</Link>
				))}
			</nav>
			<nav>
				{donationLinks.map((link) => (
					<Link key={link.href} href={link.href}>
						{link.label}
					</Link>
				))}
			</nav>
		</footer>
	);
}
