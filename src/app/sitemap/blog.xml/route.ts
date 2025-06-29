import { NextResponse } from "next/server";
import { blogPosts } from "@/lib/data";
import { baseUrl } from "@/lib/constant";

export async function GET() {
	const now = new Date().toISOString();

	const blogPages: Array<{
		url: string;
		priority: string;
		changefreq: string;
		lastmod?: string;
	}> = [
		{ url: "/blog", priority: "0.8", changefreq: "daily" },
		...blogPosts.map((post) => ({
			url: `/blog/${post.slug}`,
			priority: "0.8",
			changefreq: "monthly",
			lastmod: new Date(post.date).toISOString(),
		})),
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${blogPages
	.map(
		(page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod || now}</lastmod>
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
