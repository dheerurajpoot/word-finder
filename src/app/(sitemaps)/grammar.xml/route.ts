import { baseUrl } from "@/lib/constant";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
	const now = new Date().toISOString();

	// Get grammar directories paths
	const grammarDir = path.join(process.cwd(), "src/app/grammar");
	const grammarRulesDir = path.join(process.cwd(), "src/app/grammar-rules");

	// Read all directories in grammar folder
	let grammarFolders: string[] = [];
	try {
		const items = fs.readdirSync(grammarDir, { withFileTypes: true });
		grammarFolders = items
			.filter((item) => item.isDirectory())
			.map((item) => item.name);
	} catch (error) {
		console.error("Error reading grammar directory:", error);
		grammarFolders = [];
	}

	// Read all directories in grammar-rules folder
	let grammarRulesFolders: string[] = [];
	try {
		const items = fs.readdirSync(grammarRulesDir, { withFileTypes: true });
		grammarRulesFolders = items
			.filter((item) => item.isDirectory())
			.map((item) => `grammar-rules/${item.name}`);
	} catch (error) {
		console.error("Error reading grammar-rules directory:", error);
		grammarRulesFolders = [];
	}

	// Add main grammar pages
	const mainGrammarPages = ["grammar", "grammar-rules"];
	const allGrammarPages = [
		...mainGrammarPages,
		...grammarFolders,
		...grammarRulesFolders,
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allGrammarPages
	.map(
		(page) => `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
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
