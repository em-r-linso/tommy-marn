import { defineField, defineType } from "sanity";

export const postType = defineType({
	name: "post",
	title: "Post",
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
			name: "publishedAt",
			type: "datetime",
			initialValue: () => new Date().toISOString(),
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "body",
			type: "array",
			of: [
				{ type: "block" },
				{
					type: "image",
					options: { hotspot: true },
					fields: [
						defineField({
							name: "alt",
							type: "string",
							title: "Alt text",
						}),
					],
				},
			],
		}),
	],
});
