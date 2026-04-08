import { defineField, defineType } from "sanity";

export const albumType = defineType({
	name: "album",
	title: "Album",
	type: "document",
	fields: [
		defineField({
			name: "title",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "slug",
			type: "slug",
			options: { source: "title" },
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "releaseDate",
			type: "datetime",
			initialValue: () => new Date().toISOString(),
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "coverImage",
			type: "image",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "trackList",
			type: "array",
			of: [
				{
					type: "object",
					fields: [
						defineField({
							name: "trackName",
							type: "string",
							validation: (rule) => rule.required(),
						}),
						defineField({
							name: "audioFile",
							type: "file",
							options: { accept: "audio/*" },
							validation: (rule) => rule.required(),
						}),
					],
				},
			],
		}),
	],
});
