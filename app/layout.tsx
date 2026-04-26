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
	weight: ["400", "600"],
});

export const metadata: Metadata = {
	title: "Tommy Marn",
	description: "Official Tommy Marn website with music, merch, newsletter, and tour information.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${libreFranklin.variable} font-semibold h-full w-full flex antialiased`}
		>
			<Analytics />
			<body className="min-h-full w-full flex flex-col font-sans text-base items-center">
				<div className="max-w-250 w-full p-10 flex flex-col items-center gap-10">
					<Header />
					{children}
					<Footer />
				</div>
			</body>
		</html>
	);
}
