import { defineField, defineType } from "sanity";

export const tourDateType = defineType({
	name: "tourDate",
	title: "Tour Date",
	type: "document",
	fields: [
		defineField({
			name: "date",
			type: "datetime",
			initialValue: () => new Date().toISOString(),
			description: 'Optional. When omitted, page displays "TBD".',
		}),
		defineField({
			name: "city",
			type: "string",
			description: 'Optional. When omitted, page displays "TBD".',
		}),
		defineField({
			name: "venue",
			type: "string",
			description: 'Optional. When omitted, page displays "TBD".',
		}),
		defineField({
			name: "ticketLink",
			type: "url",
		}),
		defineField({
			name: "isSoldOut",
			type: "boolean",
			description: 'If set, page displays "sold out" instead of ticket link.',
		}),
		defineField({
			name: "promoText",
			type: "string",
		}),
	],
});
