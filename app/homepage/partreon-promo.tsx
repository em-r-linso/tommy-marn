import Link from "next/link";

export default function PatreonPromo() {
	return (
		<section className="w-full">
			<Link
				href="https://www.patreon.com/user?u=91562271"
				className="flex flex-col items-center gap-0 md:gap-6"
			>
				<div className="flex flex-col md:flex-row space-between items-center gap-0 md:gap-4">
					<span className="text-center text-5xl">Bonus Demos</span>
					<span className="text-center text-3xl">&</span>
					<span className="text-center text-5xl">New Releases</span>
				</div>
				<div className="flex flex-col md:flex-row space-between items-center gap-2 md:gap-4">
					<span className="text-center text-3xl">available now exclusively on</span>
					<img
						src="/social-icons/patreon-text.png"
						alt="Patreon"
						className="inline-block h-8 w-auto"
					/>
				</div>
			</Link>
		</section>
	);
}
