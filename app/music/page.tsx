import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/app/sanity/client";

const QUERY = `*[_type == "album"]{
	title,
	releaseDate,
	coverImage
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
				}) => (
					<div key={album.title} className="w-100">
						<h2>{album.title}</h2>
						<p>{album.releaseDate}</p>
						{album.coverImage && (
							<img src={urlFor(album.coverImage)?.url()} alt={album.title} />
						)}
					</div>
				),
			)}
		</main>
	);
}
