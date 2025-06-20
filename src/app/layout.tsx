import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Word Finder - Free Word Finder & Scrabble Helper Tools | Find Words for Word Games",
	description:
		"Find words for Scrabble, Words with Friends, crosswords and other word games. Free word finder, anagram solver, word unscrambler and rhyme finder tools. Boost your word game scores!",
	keywords:
		"word finder, scrabble helper, words with friends cheat, anagram solver, word unscrambler, crossword solver, rhyme finder, word games, scrabble words, word tools",
	authors: [{ name: "WordFinder Team" }],
	creator: "WordFinder",
	publisher: "WordFinder",
	robots: "index, follow",
	alternates: {
		canonical: "https://wordfinder.com",
	},
	verification: {
		google: "your-google-verification-code",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<head suppressHydrationWarning>
				<link rel='icon' href='/favicon.ico' />
				<link rel='apple-touch-icon' href='/apple-touch-icon.png' />
				{/* <link rel='manifest' href='/manifest.json' /> */}
				<meta name='theme-color' content='#10b981' />
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "WebApplication",
							name: "WordFinder",
							description:
								"Free word finder and helper tools for Scrabble, Words with Friends, and other word games",
							url: "https://wordfinder.com",
							applicationCategory: "GameApplication",
							operatingSystem: "Web Browser",
							offers: {
								"@type": "Offer",
								price: "0",
								priceCurrency: "USD",
							},
							author: {
								"@type": "Organization",
								name: "WordFinder",
							},
						}),
					}}
				/>
			</head>
			<body className={inter.className} suppressHydrationWarning>
				<Header />
				<main className='min-h-screen'>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
