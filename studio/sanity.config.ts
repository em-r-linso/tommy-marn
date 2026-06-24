import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
	name: "default",
	title: "tommymarn.com",

	projectId: "ye87psy7",
	dataset: "production",

	plugins: [
		structureTool({
			structure: (S) =>
				S.list()
					.title("Content")
					.items([
						S.documentTypeListItem("post").title("Posts"),
						S.documentTypeListItem("album").title("Albums"),
						S.documentTypeListItem("tourDate").title("Tour Dates"),
					]),
		}),
		visionTool(),
	],

	schema: {
		types: schemaTypes,
	},
});
