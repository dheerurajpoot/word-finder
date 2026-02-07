import { baseUrl } from "@/lib/constant";
import { NextResponse } from "next/server";

export async function GET() {
	const now = new Date().toISOString();

	const dictionaryPages = [
		{ url: "scrabble-dictionary", priority: "0.8", changefreq: "weekly" },
		{
			url: "words-with-friends-dictionary",
			priority: "0.8",
			changefreq: "weekly",
		},
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${dictionaryPages
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
			"Content-Type": "application/xml; charset=utf-8",
			"Cache-Control": "public, max-age=3600, s-maxage=3600",
		},
	});
}
