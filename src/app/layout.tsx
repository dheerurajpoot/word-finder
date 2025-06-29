import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { baseUrl } from "@/lib/constant";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	metadataBase: new URL(`${baseUrl}`),
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
		canonical: `${baseUrl}`,
	},
	openGraph: {
		title: "Word Finder - Free Word Finder & Scrabble Helper Tools",
		description:
			"Find words for Scrabble, Words with Friends, crosswords and other word games. Free word finder, anagram solver, word unscrambler and rhyme finder tools.",
		url: `${baseUrl}`,
		siteName: "WordFinder",
		images: [
			{
				url: `${baseUrl}/banner.png`,
				width: 1200,
				height: 630,
				alt: "WordFinder",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Word Finder - Free Word Finder & Scrabble Helper Tools",
		description:
			"Find words for Scrabble, Words with Friends, and other word games.",
		// siteId: "Your Twitter Site ID",
		creator: "@YourTwitterHandle",
		// creatorId: "Your Twitter Creator ID",
		images: [`${baseUrl}/banner.png`],
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
				{/* Google Search Console Verification */}
				<meta
					name='google-site-verification'
					content='YOUR_GOOGLE_SEARCH_CONSOLE_ID'
				/>

				{/* Google AdSense */}
				<Script
					async
					src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=YOUR_GOOGLE_ADSENSE_CLIENT_ID'
					crossOrigin='anonymous'
					strategy='afterInteractive'
				/>

				{/* Google Analytics */}
				<Script
					src='https://www.googletagmanager.com/gtag/js?id=YOUR_GOOGLE_ANALYTICS_ID'
					strategy='afterInteractive'
				/>
				<Script id='google-analytics' strategy='afterInteractive'>
					{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'YOUR_GOOGLE_ANALYTICS_ID');
          `}
				</Script>
				<link rel='icon' href='/favicon.ico' />
				<link rel='apple-touch-icon' href='/apple-touch-icon.png' />
				<meta name='theme-color' content='#10b981' />
				<link rel='manifest' href='/manifest.json' />
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "WebSite",
							name: "WordFinder",
							url: `${baseUrl}`,
							potentialAction: {
								"@type": "SearchAction",
								target: `${baseUrl}/search?q={search_term_string}`,
								"query-input":
									"required name=search_term_string",
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
