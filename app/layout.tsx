import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Header from "./common/header";

const libreFranklin = Libre_Franklin({
	variable: "--font-libre-franklin",
	subsets: ["latin"],
	weight: ["500"],
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
			className={`${libreFranklin.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col font-sans">
				<Header />
				{children}
			</body>
		</html>
	);
}
