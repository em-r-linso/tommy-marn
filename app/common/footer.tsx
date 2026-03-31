"use client";

import Link from "next/link";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import NavSection from "./nav-section";

const navLinks = [
	{ href: "/music", display: "Music" },
	{ href: "/merch", display: "Merch" },
	{ href: "/newsletter", display: "Newsletter" },
	{ href: "/tour", display: "Tour" },
];

const donationLinks = [
	{ href: "https://www.patreon.com/user?u=91562271", display: "Patreon" },
	{ href: "/", display: "PayPal" }, // TODO: Update with actual PayPal link
	{
		href: "https://www.buymeacoffee.com/thomasmarn",
		display: "BuyMeACoffee",
	},
];

const socialLinks = [
	{
		href: "https://www.instagram.com/thomasmarnmusic/",
		display: <InstagramIcon />,
	},
	{
		href: "https://www.facebook.com/profile.php?id=100092565421512/",
		display: <FacebookIcon />,
	},
	{
		href: "https://x.com/thomas_marn",
		display: <XIcon />,
	},
	{
		href: "https://www.youtube.com/channel/UCpXf2lsrbfIYtQOrhGR1qQg/",
		display: <YouTubeIcon />,
	},
];

export default function Footer() {
	return (
		<footer className="grid grid-cols-[auto_1fr] grid-rows-3 gap-4 text-xl">
			<Link href="/" className="row-span-3">
				<img
					className="h-40"
					src="https://placehold.net/400x400.png"
					alt="Tommy Marn Logo"
				/>
			</Link>
			<NavSection links={socialLinks} />
			<NavSection links={navLinks} />
			<NavSection links={donationLinks} />
		</footer>
	);
}
