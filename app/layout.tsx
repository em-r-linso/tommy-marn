import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import Header from "./common/header";
import Footer from "./common/footer";

const libreFranklin = Libre_Franklin({
	variable: "--font-libre-franklin",
	subsets: ["latin"],
	weight: ["500"],
});

export const metadata: Metadata = {
	title: "Tommy Marn",
	description:
		"Official Tommy Marn website with music, merch, newsletter, and tour information.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${libreFranklin.variable} h-full antialiased`}
		>
			<Analytics />
			<body className="min-h-full flex flex-col font-sans text-base">
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
