import Link from "next/link";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/app/sanity/client";
import TiltOnHoverText from "../common/tilt-on-hover-text";

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) => {
	if (!projectId || !dataset) return null;
	return createImageUrlBuilder({ projectId, dataset }).image(source);
};

type Album = {
	title: string;
	slug: { current: string };
	coverImage: SanityImageSource;
};

export default function NewAlbumPromo({ album }: { album?: Album }) {
	if (!album) return null;

	return (
		<section className="relative block w-full aspect-[20/9]">
			<img
				src="/new-album-promo/drum.svg"
				className="absolute left-[6%] bottom-[0%] w-[14%] h-auto"
			/>
			<img
				src="/new-album-promo/egg.svg"
				className="absolute right-[0%] top-[0%] w-[2%] h-auto"
			/>
			<img
				src="/new-album-promo/guitar-amp-hat.svg"
				className="absolute right-[0%] bottom-[0%] w-[45%] h-auto"
			/>
			<img
				src="/new-album-promo/guitar.svg"
				className="absolute left-[5%] top-[5%] w-[25%] h-auto"
			/>
			<img
				src="/new-album-promo/heart.svg"
				className="absolute bottom-[0%] bottom-[0%] w-[2%] h-auto"
			/>
			<img
				src="/new-album-promo/synth-laptop.svg"
				className="absolute left-[0%] top-[0%] w-[46%] h-auto"
			/>
			<img
				src="/new-album-promo/xylophone.svg"
				className="absolute right-[12%] top-[0%] w-[18%] h-auto"
			/>
			<Link
				href={`/music/${album.slug.current}`}
				className="group absolute left-[50%] -translate-x-1/2 top-0 w-[36%] h-[100%]"
				style={{ containerType: "inline-size" }} // non-tailwind style because cqw not supported in tailwind
			>
				<TiltOnHoverText className="w-full text-center" style={{ fontSize: "14cqw" }}>
					<img src={urlFor(album.coverImage)?.url()} alt={album.title} />
					Listen Now!
				</TiltOnHoverText>
			</Link>
		</section>
	);
}
