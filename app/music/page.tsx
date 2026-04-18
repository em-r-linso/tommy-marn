import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/app/sanity/client";
import Link from "next/link";

// albums ordered by release date
// null coalesced to distant future to ensure "coming soon" appears first
const QUERY = `*[_type == "album"] | order(coalesce(releaseDate, "9999-12-31") desc){
	title,
	releaseDate,
	coverImage,
	slug {
		current
	}
}`;

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) => {
	if (!projectId || !dataset) {
		return null;
	}
	return createImageUrlBuilder({ projectId, dataset }).image(source);
};

export default async function Page() {
	const albums = await client.fetch(QUERY);
	return (
		<main className="grid w-full gap-4 [grid-template-columns:repeat(auto-fill,minmax(min(100%,20rem),1fr))]">
			{albums.map(
				(album: {
					title: string;
					releaseDate: string | null;
					coverImage: SanityImageSource;
					slug: { current: string };
				}) => {
					const displayDate = album.releaseDate
						? new Date(album.releaseDate).getFullYear()
						: "coming soon";
					return (
						<Link
							key={album.title}
							href={`/music/${album.slug.current}`}
							className="w-full"
						>
							<img
								src={urlFor(album.coverImage)?.url()}
								alt={album.title}
								className="w-full"
							/>
							<p className="text-xl">{album.title}</p>
							<p className="text-xl">{displayDate}</p>
						</Link>
					);
				},
			)}
		</main>
	);
}
