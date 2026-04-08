import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/app/sanity/client";
import Link from "next/link";

const QUERY = `*[_type == "album"]{
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
		<main className="flex flex-row flex-wrap">
			{albums.map(
				(album: {
					title: string;
					releaseDate: string;
					coverImage: SanityImageSource | null;
					slug: { current: string };
				}) => (
					<Link key={album.title} href={`/music/${album.slug.current}`} className="w-100">
						<h2>{album.title}</h2>
						<p>{album.releaseDate}</p>
						{album.coverImage && (
							<img src={urlFor(album.coverImage)?.url()} alt={album.title} />
						)}
					</Link>
				),
			)}
		</main>
	);
}
