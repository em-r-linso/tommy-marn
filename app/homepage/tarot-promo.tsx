import Link from "next/link";

export default function TarotPromo() {
	return (
		<section className="w-full">
			<Link
				href="/tarot"
				className="group relative mx-auto block aspect-[16/10] w-[min(100%,70vh)] max-w-5xl overflow-visible transition-transform duration-200 ease-out hover:scale-110"
			>
				<img src="/tarot-deck-promo/back.jpg" alt="Tarot deck" className="w-full" />

				<img
					src="/tarot-deck-promo/title.svg"
					alt="Tarot title"
					className="absolute left-1/2 -translate-x-1/2 top-[0%] h-[15%] max-w-none"
				/>

				<div className="absolute left-1/2 -translate-x-1/2 top-[55%] h-[10%] w-fit px-4 py-1 rounded-md border-[clamp(1px,0.3vw,100vw)] border-black bg-white shadow-[4px_8px_5px_rgba(0,0,0,0.4)] animate-[tarotcta_20s_linear_infinite] [animation-play-state:paused] group-hover:[animation-play-state:running]">
					<img
						src="/tarot-deck-promo/cta.svg"
						alt="Call to action"
						className="block h-full w-auto max-w-none"
					/>
				</div>
			</Link>
		</section>
	);
}
