import { createClient } from "next-sanity";

export const client = createClient({
	projectId: "ye87psy7",
	dataset: "production",
	apiVersion: "2024-01-01",
	useCdn: false,
});
