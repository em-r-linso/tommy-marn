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
		<header className="flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center md:items-end w-full gap-y-10">
			<div className="basis-full md:basis-auto flex justify-center md:justify-start">
				<Link href="/">
					<h1 className="text-5xl lg:text-6xl whitespace-nowrap">Tommy Marn</h1>
				</Link>
			</div>
			<div className="basis-full md:basis-auto flex justify-center md:justify-end">
				<NavSection links={navLinks} gapClassName="gap-7" />
			</div>
		</header>
	);
}
