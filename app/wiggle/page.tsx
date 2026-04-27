import WiggleSvgFile from "@/app/common/wiggle-svg-file";

const RANGE_PX = 0.1;
const FREQUENCY_HZ = 0.65;

export default function Page() {
	return (
		<main className="mx-auto max-w-3xl px-6 py-10 space-y-4">
			<h1 className="text-2xl">Wiggle demo</h1>
			<p>
				File-based SVG wiggle. The component loads an SVG by path and animates
				polygon/polyline/path coordinates. RANGE_PX is now screen-pixel relative, so the
				visible wiggle stays consistent across differently scaled SVGs. Tweak RANGE_PX,
				FREQUENCY_HZ, and SVG_SRC in this file.
			</p>

			<WiggleSvgFile
				src="/tarot-deck/major-00-the-fool.svg"
				rangePx={RANGE_PX}
				frequencyHz={FREQUENCY_HZ}
				className="max-w-md w-20 h-auto"
			/>
			<WiggleSvgFile
				src="/tarot-deck/major-01-the-magician.svg"
				rangePx={RANGE_PX}
				frequencyHz={FREQUENCY_HZ}
				className="max-w-md [&_svg]:w-full [&_svg]:h-auto"
			/>
			<WiggleSvgFile
				src="/tarot-deck/major-02-the-high-priestess.svg"
				rangePx={RANGE_PX}
				frequencyHz={FREQUENCY_HZ}
				className="max-w-md [&_svg]:w-full [&_svg]:h-auto"
			/>
		</main>
	);
}
