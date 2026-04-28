import TiltOnHoverText from "@/app/common/tilt-on-hover-text";
import Link from "next/link";

export default async function Page() {
	return (
		<main className="flex flex-col gap-10 w-full">
			<div className="flex flex-row items-stretch gap-5 w-full">
				<div className="flex flex-col gap-5 font-light text-lg leading-[2]">
					<h2 className="font-semibold text-3xl">About the Deck</h2>
					<p>
						A traditional tarot deck consists of 22 major and 56 minor arcana divided
						into 4 suites. A multitude of decks have been made with the intent to
						faithfully update and/or re- stylize the compositions and motifs of the
						classic Rider Waite Smith deck.
					</p>
					<p>This is not one of them.</p>
					<p>
						This deck is a full re-interpretation of the traditional tarot, using
						themes, objects, and motifs from my own life and music. It contains 78
						original illustrations that follow the themes and divinatory meanings of the
						traditional tarot, using original compositions, personal motifs, and
						featuring places, objects, and situations from my life. The deck is
						organized into 22 major arcana, and 56 minor arcana divided into 4 new suits
						- Dogs (wands), Flowers (cups), Bugs (swords), and Disks (pentacles).
					</p>
					<p>
						When I started this project, I knew little about Tarot. I'd had a handful of
						readings, mostly from close friends, but had never seriously endeavored to
						learn the cards, myself.
					</p>
					<p>
						I purchased my first tarot deck on a whim at a festival, and I was
						immediately fascinated by the tone of the illustrations. I was enamored by
						the way these little images could have the capacity to generate deeply
						personal and flexible meaning for any reader at any time around the whole
						world. There is something fundamentally true about the nature of art that I
						think is clarified in this aspect of Tarot.
					</p>
					<p>
						Over three-ish years of working on this deck, I experienced some of the
						highest highs and deepest lows of my life so far. I pulled cards randomly
						about once a week and did my best to come up with something that would
						satisfy the standard interpretation of the card, while also feeling
						personally resonant in my life at the time.
					</p>
					<p>
						As an artist, I had mostly worked from observation up to this point, and the
						process of creating an illustration from scratch that satisfies an existing
						interpretation was a very new challenge for me.
					</p>
					<p>
						Through this experience, I grew a lot as an artist, and gained a much deeper
						respect and appreciation for tarot. I hope this deck (like the many other
						unique, rare, personal versions of tarot from artists all over the world)
						can continue to serve as an avenue for reflection, divination, and clarity
						for those who seek it.
					</p>
				</div>
				<div className="shrink">
					<div className="relative block aspect-[1/6] min-w-0 sm:min-w-40 md:min-w-60 overflow-hidden">
						<img
							src="/tarot-deck/major-01-the-magician.svg"
							className="absolute left-[50%] -translate-x-1/2 top-[5%] w-[80%] h-auto shadow-[0_0_10px_rgba(0,0,0,0.5)]"
						/>
						<img
							src="/tarot-deck/major-17-the-star.svg"
							className="absolute left-[15%] top-[30%] rotate-[15deg] w-[60%] h-auto shadow-[0_0_10px_rgba(0,0,0,0.5)]"
						/>
						<img
							src="/tarot-deck/minor-14-ace-of-dogs.svg"
							className="absolute left-[5%] top-[58%] rotate-[2deg] w-[60%] h-auto shadow-[0_0_10px_rgba(0,0,0,0.5)]"
						/>
						<img
							src="/tarot-deck/major-16-the-tower.svg"
							className="absolute left-[30%] top-[50%] rotate-[-10deg] w-[60%] h-auto shadow-[0_0_10px_rgba(0,0,0,0.5)]"
						/>
						<img
							src="/tarot-deck/minor-52-five-of-disks.svg"
							className="absolute left-[20%] top-[80%] rotate-[-2deg] w-[60%] h-auto shadow-[0_0_10px_rgba(0,0,0,0.5)]"
						/>
					</div>
				</div>
			</div>
			<div className="flex flex-col sm:flex-row gap-10 text-2xl">
				<Link href="/" className="group">
					<TiltOnHoverText>Buy now</TiltOnHoverText>
				</Link>
				<Link
					href="https://www.tommymarn.com/_files/ugd/31f0e3_b5f95989684741d2881f1b24f0b9137f.pdf"
					className="group"
				>
					<TiltOnHoverText>Download full PDF booklet</TiltOnHoverText>
				</Link>
			</div>
		</main>
	);
}
