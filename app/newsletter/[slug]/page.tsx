import { PortableText } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/app/sanity/client";
import Link from "next/link";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
	title,
	publishedAt,
	body[]{
		...,
		asset->{
			url
		}
	}
}`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
	projectId && dataset ? createImageUrlBuilder({ projectId, dataset }).image(source) : null;

const options = { next: { revalidate: 0 } };

type PostImageBlock = SanityImageSource & {
	alt?: string;
	asset?: { url?: string };
};

type PostDocument = {
	title: string;
	publishedAt: string;
	body?: Array<{ _type: string; [key: string]: unknown }>;
};

const components = {
	types: {
		image: ({ value }: { value: PostImageBlock }) => {
			const imageUrl =
				value.asset?.url ?? urlFor(value)?.width(1200).fit("max").auto("format").url();

			if (!imageUrl) return null;

			return (
				<figure className="my-8">
					<img
						src={imageUrl}
						alt={value.alt ?? ""}
						loading="lazy"
						className="w-full rounded-xl"
					/>
				</figure>
			);
		},
	},
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
	const post = await client.fetch<PostDocument>(POST_QUERY, await params, options);

	return (
		<main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
			<Link href="/newsletter" className="hover:underline">
				← Back to posts
			</Link>
			<h1 className="text-4xl font-bold mb-8">{post.title}</h1>
			<div className="prose">
				<p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
				{Array.isArray(post.body) && (
					<PortableText value={post.body} components={components} />
				)}
			</div>
		</main>
	);
}
