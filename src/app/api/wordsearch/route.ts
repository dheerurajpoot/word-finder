import { NextRequest, NextResponse } from "next/server";
import { searchWords } from "@/lib/api";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const params = {
		letters: searchParams.get("letters") || "",
		starts: searchParams.get("starts") || "",
		ends: searchParams.get("ends") || "",
		contains: searchParams.get("contains") || "",
		length: searchParams.get("length") || "",
		dictionary: searchParams.get("dictionary") || "",
	};
	const words = await searchWords(params);
	return NextResponse.json(words);
}
