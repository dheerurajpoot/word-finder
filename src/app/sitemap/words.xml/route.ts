import { baseUrl } from "@/lib/constant";
import { NextResponse } from "next/server";

// Generate all possible word lengths (3-15 letters)
function getWordLengths(): string[] {
	return Array.from({ length: 13 }, (_, i) => (i + 3).toString());
}

// Generate all letters A-Z
function getLetters(): string[] {
	return Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
}

// Generate common letter combinations for words-with-letters
function getLetterCombinations(): string[] {
	const commonCombinations = [
		// Common prefixes
		"un",
		"re",
		"in",
		"im",
		"il",
		"ir",
		"dis",
		"mis",
		"pre",
		"pro",
		"en",
		"em",
		// Common suffixes
		"ing",
		"ed",
		"er",
		"est",
		"ly",
		"ful",
		"less",
		"ness",
		"ment",
		"tion",
		"sion",
		// Common letter patterns
		"th",
		"ch",
		"sh",
		"ph",
		"wh",
		"qu",
		"ck",
		"ng",
		"st",
		"nd",
		"rd",
		"ld",
		// Scrabble-friendly combinations
		"ae",
		"ai",
		"ar",
		"as",
		"at",
		"ea",
		"ee",
		"ei",
		"er",
		"es",
		"et",
		"he",
		"hi",
		"in",
		"is",
		"it",
		"le",
		"me",
		"ne",
		"no",
		"of",
		"on",
		"or",
		"ou",
		"re",
		"se",
		"so",
		"te",
		"ti",
		"to",
		"up",
		"us",
		"we",
	];

	return commonCombinations;
}

export async function GET() {
	const now = new Date().toISOString();

	const wordPages: Array<{
		url: string;
		priority: string;
		changefreq: string;
	}> = [];

	// Add word length pages
	getWordLengths().forEach((length) => {
		wordPages.push({
			url: `/words-by-length/${length}`,
			priority: "0.7",
			changefreq: "weekly",
		});
	});

	// Add words ending in pages
	getLetters().forEach((letter) => {
		wordPages.push({
			url: `/words-ending-in/${letter}`,
			priority: "0.7",
			changefreq: "weekly",
		});
	});

	// Add words starting with pages
	getLetters().forEach((letter) => {
		wordPages.push({
			url: `/words-start-with/${letter}`,
			priority: "0.7",
			changefreq: "weekly",
		});
	});

	// Add words with letters pages
	getLetterCombinations().forEach((combo) => {
		wordPages.push({
			url: `/words-with-letters/${combo}`,
			priority: "0.7",
			changefreq: "weekly",
		});
	});

	// Add complex word length combinations (limit to most popular)
	const popularLengths = ["3", "4", "5", "6", "7", "8"];
	const popularLetters = ["A", "E", "I", "O", "U", "S", "T", "R", "N", "L"];

	popularLengths.forEach((length) => {
		popularLetters.forEach((letter) => {
			wordPages.push({
				url: `/words-by-length/${length}/starting-with/${letter}`,
				priority: "0.6",
				changefreq: "weekly",
			});
			wordPages.push({
				url: `/words-by-length/${length}/ending-in/${letter}`,
				priority: "0.6",
				changefreq: "weekly",
			});
			wordPages.push({
				url: `/words-by-length/${length}/with/${letter}`,
				priority: "0.6",
				changefreq: "weekly",
			});
		});
	});

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${wordPages
	.map(
		(page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
	)
	.join("\n")}
</urlset>`;

	return new NextResponse(sitemap, {
		headers: {
			"Content-Type": "application/xml",
			"Cache-Control": "public, max-age=3600, s-maxage=3600",
		},
	});
}
