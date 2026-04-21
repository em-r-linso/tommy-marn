import Link from "next/link";
import NavSection from "./nav-section";

const navLinks = [
	{
		href: "/music",
		display: "Music",
		decorationImage: { src: "/header-nav/music.svg", height: 60, offsetY: -2 },
	},
	{
		href: "/merch",
		display: "Merch",
		decorationImage: { src: "/header-nav/merch.svg", height: 40, offsetY: -30 },
	},
	{
		href: "/newsletter",
		display: "Newsletter",
		decorationImage: { src: "/header-nav/newsletter.svg", height: 40, offsetY: -30 },
	},
	{
		href: "/tour",
		display: "Tour",
		decorationImage: { src: "/header-nav/tour.svg", height: 40, offsetY: -30 },
	},
];

export default function Header() {
	return (
		<header className="flex justify-between items-center w-full">
			<Link href="/">
				<h1 className="text-6xl">Tommy Marn</h1>
			</Link>
			<NavSection links={navLinks} />
		</header>
	);
}
