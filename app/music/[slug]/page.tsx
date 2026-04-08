import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/app/sanity/client";

const QUERY = `*[_type == "album" && slug.current == $slug][0]{
	title,
	releaseDate,
	coverImage,
	trackList[] {
		_key,
		trackName,
		audioFile {
			asset-> {
				url
			}
		}
	}
}`;

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) => {
	if (!projectId || !dataset) {
		return null;
	}
	return createImageUrlBuilder({ projectId, dataset }).image(source);
};

const options = { next: { revalidate: 0 } };

type AlbumDocument = {
	title: string;
	releaseDate: string;
	coverImage: SanityImageSource;
	trackList: Array<{
		_key: string;
		trackName: string;
		audioFile: {
			asset: {
				url: string;
			};
		};
	}>;
};

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
	const album = await client.fetch<AlbumDocument>(QUERY, await params, options);
	console.log("Fetched album:", album);
	return (
		<main className="flex flex-row flex-wrap">
			<div key={album.title} className="w-100">
				<h2>{album.title}</h2>
				<p>{album.releaseDate}</p>
				{album.coverImage && (
					<img src={urlFor(album.coverImage)?.url()} alt={album.title} />
				)}
				{album.trackList.map((track) => (
					<div key={track._key} className="my-4">
						<p>{track.trackName}</p>
						<audio controls>
							<source src={track.audioFile.asset.url} type="audio/mpeg" />
						</audio>
					</div>
				))}
			</div>
		</main>
	);
}
