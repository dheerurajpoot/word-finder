import { baseUrl } from "@/lib/constant";
import { NextResponse } from "next/server";

export async function GET() {
	const now = new Date().toISOString();

	const tools = [
		{ url: "/anagram-solver", priority: "0.8", changefreq: "weekly" },
		{ url: "/word-unscrambler", priority: "0.8", changefreq: "weekly" },
		{ url: "/crossword-solver", priority: "0.8", changefreq: "weekly" },
		{ url: "/rhyme-finder", priority: "0.8", changefreq: "weekly" },
		{ url: "/word-generator", priority: "0.8", changefreq: "weekly" },
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${tools
	.map(
		(tool) => `  <url>
    <loc>${baseUrl}${tool.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${tool.changefreq}</changefreq>
    <priority>${tool.priority}</priority>
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
