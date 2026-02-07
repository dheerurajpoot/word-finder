import { NextResponse } from "next/server";
import { baseUrl } from "@/lib/constant";
import { supabase } from "@/lib/supabase";

/**
 * Fetch all spelling entries from Supabase with pagination support
 * Supabase returns max 1000 rows per request, so we need to paginate
 */
async function fetchAllSpellingEntries() {
	const allEntries: Array<{ slug: string; updated_at: string | null }> = [];
	const pageSize = 1000; // Supabase max rows per request
	let page = 0;
	let hasMore = true;

	while (hasMore) {
		const from = page * pageSize;
		const to = from + pageSize - 1;

		const { data, error } = await supabase
			.from("spelling_entries")
			.select("slug, updated_at")
			.eq("is_published", true)
			.order("updated_at", { ascending: false })
			.range(from, to);

		if (error) {
			console.error(`Error fetching spelling entries (page ${page}):`, error);
			break;
		}

		if (data && data.length > 0) {
			allEntries.push(...data);
			// If we got fewer rows than pageSize, we've reached the end
			hasMore = data.length === pageSize;
			page++;
		} else {
			hasMore = false;
		}
	}

	return allEntries;
}

export async function GET() {
	try {
		const spellingEntries = await fetchAllSpellingEntries();

		// Generate URLs from database entries
		const urls =
			spellingEntries.length > 0
				? spellingEntries
						.map((entry) => {
							// Format the updated_at date for lastmod
							const lastmod = entry.updated_at
								? new Date(entry.updated_at).toISOString()
								: new Date().toISOString();

							return `  <url>
    <loc>${baseUrl}spelling/${entry.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
						})
						.join("\n")
				: "";

		const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

		return new NextResponse(xml, {
			headers: {
				"Content-Type": "application/xml; charset=utf-8",
				"Cache-Control": "public, max-age=3600, s-maxage=3600",
			},
		});
	} catch (error) {
		console.error("Error generating spelling sitemap:", error);
		// Return empty sitemap on error (Google-friendly format)
		const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;
		return new NextResponse(xml, {
			headers: {
				"Content-Type": "application/xml; charset=utf-8",
				"Cache-Control": "public, max-age=300, s-maxage=300", // Shorter cache on error
			},
		});
	}
}
