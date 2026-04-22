import TarotPromo from "./homepage/tarot-promo";
import Portraits from "./homepage/portraits";
import NewAlbumPromo from "./homepage/new-album-promo";
import { client } from "@/app/sanity/client";

const PROMO_ALBUM_SLUG = "the-queen-of-time";

const ALBUM_QUERY = `*[_type == "album" && slug.current == $slug][0]{
	title,
	coverImage,
	slug { current }
}`;

export default async function Page() {
	const album = await client.fetch(ALBUM_QUERY, { slug: PROMO_ALBUM_SLUG });

	return (
		<main className="flex flex-col items-center gap-4">
			<TarotPromo />
			<NewAlbumPromo album={album} />
			<Portraits />
		</main>
	);
}
