import Link from "next/link";
import TiltOnHoverText from "../common/tilt-on-hover-text";

export default async function Page() {
	return (
		<main className="flex flex-col items-center gap-5 w-full text-center">
			<p className="text-5xl">I made a tarot deck!</p>
			<img
				src="/tarot-deck-promo/details.jpg"
				alt="Tarot Deck Details"
				className="max-h-[50vh] max-w-full"
			/>
			<Link
				href="/tarot/learn-more"
				className="text-5xl group inline-block whitespace-nowrap"
			>
				<TiltOnHoverText>Learn more</TiltOnHoverText>
			</Link>
			<Link href="/" className="text-5xl group inline-block whitespace-nowrap">
				<TiltOnHoverText>Buy now</TiltOnHoverText>
			</Link>
		</main>
	);
}
