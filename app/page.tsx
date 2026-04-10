import TarotPromo from "./homepage/tarot-promo";
import Portraits from "./homepage/portraits";

export default function Page() {
	return (
		<main className="flex flex-col items-center gap-4">
			<TarotPromo />
			<Portraits />
		</main>
	);
}
