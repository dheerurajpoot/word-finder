import axios from "axios";
export interface DatamuseWord {
	word: string;
	tags?: string[];
}

export interface WordResult {
	word: string;
	score: number;
	length: number;
	definition?: string;
}

export interface SearchParams {
	letters?: string;
	pattern?: string;
	length?: string;
	dictionary?: string;
	max?: number;
}

// Calculate Scrabble-like score for a word
function calculateScore(word: string): number {
	const letterScores: { [key: string]: number } = {
		a: 1,
		b: 3,
		c: 3,
		d: 2,
		e: 1,
		f: 4,
		g: 2,
		h: 4,
		i: 1,
		j: 8,
		k: 5,
		l: 1,
		m: 3,
		n: 1,
		o: 1,
		p: 3,
		q: 10,
		r: 1,
		s: 1,
		t: 1,
		u: 1,
		v: 4,
		w: 4,
		x: 8,
		y: 4,
		z: 10,
	};

	return word
		.toLowerCase()
		.split("")
		.reduce((score, letter) => {
			return score + (letterScores[letter] || 0);
		}, 0);
}

// Use Datamuse API for word finding
export async function searchWords(params: SearchParams): Promise<WordResult[]> {
	try {
		const { letters, pattern, length, dictionary, max } = params;

		const queryParams = new URLSearchParams();

		// Handle pattern with wildcards
		if (pattern) {
			// Convert pattern to Datamuse format
			const patternFormat = pattern.toLowerCase().replace(/[_?\-]/g, "*");
			queryParams.append("sp", patternFormat);
		}

		// Add other parameters
		if (letters) queryParams.append("sp", letters);
		if (length) queryParams.append("md", "l");
		if (dictionary) queryParams.append("md", "d");
		if (max) queryParams.append("max", max.toString());

		const apiUrl = `https://api.datamuse.com/words?${queryParams.toString()}`;
		const response = await axios.get(apiUrl);

		// Process initial results
		let results: WordResult[] = response.data.map((item: any) => ({
			word: item.word,
			score: calculateScore(item.word),
			length: item.word.length,
		}));

		// Apply additional filters
		if (length) {
			const targetLength = Number.parseInt(length);
			results = results.filter((word) => word.length === targetLength);
		}

		// Filter by available letters if specified
		if (letters) {
			results = results.filter((wordResult) => {
				const availableLetters = letters.toLowerCase().split("");
				const wordLetters = wordResult.word.toLowerCase().split("");

				// Check if word can be made from available letters
				const letterCount: { [key: string]: number } = {};
				availableLetters.forEach((letter) => {
					letterCount[letter] = (letterCount[letter] || 0) + 1;
				});

				for (const letter of wordLetters) {
					if (!letterCount[letter] || letterCount[letter] === 0) {
						return false;
					}
					letterCount[letter]--;
				}
				return true;
			});
		}

		// Sort by score (highest first) and limit results
		results.sort((a: WordResult, b: WordResult) => b.score - a.score);
		results = results.slice(0, 100);

		// If no results, try WordFind API as fallback
		if (results.length === 0) {
			const wordFindResults = await searchWordsWordFind(params);
			if (wordFindResults.length > 0) return wordFindResults;
		}

		return results;
	} catch (error) {
		console.error("Error fetching words:", error);
		// Fallback to mock data if API fails
		return getMockWords(params);
	}
}

// Fallback: Use WordFind API (HTML scraping)
async function searchWordsWordFind(
	params: SearchParams
): Promise<WordResult[]> {
	try {
		if (!params.pattern) return [];

		// Convert pattern to WordFind format
		const pattern = params.pattern.toLowerCase().replace(/[_?\-]/g, "?");

		const url = `http://itools.subhashbose.com/wordfind/pattern/?word=${encodeURIComponent(
			pattern
		)}`;

		const response = await axios.get(url);
		const html = response.data;

		// Parse HTML for results (words are in <a href="/wordfind/details/WORD">WORD</a>)
		const wordRegex =
			/<a href="\/wordfind\/details\/([a-z]+)">([a-z]+)<\/a>/g;
		const words: string[] = [];
		let match;
		while ((match = wordRegex.exec(html)) !== null) {
			words.push(match[1]);
		}

		const uniqueWords = Array.from(new Set(words));
		return uniqueWords
			.map((word) => ({
				word,
				score: calculateScore(word),
				length: word.length,
			}))
			.slice(0, 100);
	} catch (error) {
		console.error("WordFind fallback failed:", error);
		return [];
	}
}

// Fallback mock data
function getMockWords(params: SearchParams): WordResult[] {
	const mockWords = [
		"beaded",
		"beader",
		"beadle",
		"beagle",
		"beaked",
		"beaker",
		"beamed",
		"beamer",
		"beaned",
		"beanie",
		"beared",
		"bearer",
		"beaten",
		"beater",
		"beaver",
		"beacon",
		"beauty",
		"became",
		"beckon",
		"bedded",
		"better",
		"letter",
		"matter",
		"water",
		"table",
		"cable",
		"stable",
		"enable",
		"unable",
		"marble",
		"purple",
		"circle",
	];

	return mockWords
		.filter((word) => {
			if (
				params.pattern &&
				!word.startsWith(params.pattern.toLowerCase())
			)
				return false;
			if (params.length && word.length !== Number.parseInt(params.length))
				return false;
			return true;
		})
		.map((word) => ({
			word,
			score: calculateScore(word),
			length: word.length,
		}))
		.sort((a, b) => b.score - a.score)
		.slice(0, 50);
}

// Get word definition using Free Dictionary API
export async function getWordDefinition(word: string): Promise<string> {
	try {
		const response = await fetch(
			`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
		);
		if (!response.ok) {
			throw new Error("Definition not found");
		}

		const data = await response.json();
		if (data && data[0] && data[0].meanings && data[0].meanings[0]) {
			const definition = data[0].meanings[0].definitions[0].definition;
			return definition;
		}

		return "Definition not available";
	} catch (error) {
		console.error("Error fetching definition:", error);
		return "Definition not available";
	}
}

// Get rhyming words using Datamuse API
export async function getRhymingWords(word: string): Promise<string[]> {
	try {
		const response = await fetch(
			`https://api.datamuse.com/words?rel_rhy=${word}&max=20`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch rhyming words");
		}

		const data = await response.json();
		return data.map((item: { word: string }) => item.word);
	} catch (error) {
		console.error("Error fetching rhyming words:", error);
		return [];
	}
}

// Get similar sounding words using Datamuse API
export async function getSimilarSoundingWords(word: string): Promise<string[]> {
	try {
		const response = await fetch(
			`https://api.datamuse.com/words?sl=${word}&max=20`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch similar sounding words");
		}

		const data = await response.json();
		return data.map((item: { word: string }) => item.word);
	} catch (error) {
		console.error("Error fetching similar sounding words:", error);
		return [];
	}
}
