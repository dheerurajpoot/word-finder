import axios from "axios";
export interface WordResult {
	word: string;
	score: number;
	length: number;
	definition?: string;
}

export interface SearchParams {
	letters: string;
	starts?: string;
	ends?: string;
	contains?: string;
	length?: string;
	dictionary?: string;
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
		let apiUrl = "https://api.datamuse.com/words?";
		const queryParams: string[] = [];

		// Build query based on search parameters
		let pattern = "";
		if (params.starts) pattern += params.starts.toLowerCase();
		if (params.contains)
			pattern += "*" + params.contains.toLowerCase() + "*";
		if (params.letters)
			pattern += params.letters.toLowerCase().replace(/[^a-z]/g, "?");
		if (params.ends) pattern += params.ends.toLowerCase();
		if (!pattern) pattern = "*";
		queryParams.push(`sp=${pattern}`);

		// Add word frequency for better results
		queryParams.push("md=f"); // Include frequency data

		if (queryParams.length === 0) {
			queryParams.push("sp=*"); // Default to all words if no params
			queryParams.push("max=50");
		}

		apiUrl += queryParams.join("&");

		const response = await axios.get(apiUrl);
		console.log("response: ", response.data);
		if (response.status !== 200) {
			throw new Error("Failed to fetch words");
		}

		const data = response.data;

		let results: WordResult[] = data.map((item: { word: string }) => ({
			word: item.word,
			score: calculateScore(item.word),
			length: item.word.length,
		}));

		// Apply additional filters
		if (params.length) {
			const targetLength = Number.parseInt(params.length);
			results = results.filter((word) => word.length === targetLength);
		}

		// Filter by available letters if specified
		if (params.letters) {
			results = results.filter((wordResult) => {
				const availableLetters = params.letters.toLowerCase().split("");
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
		results.sort((a, b) => b.score - a.score);
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
		let pattern = "";
		if (params.starts) pattern += params.starts.toLowerCase();
		if (params.contains)
			pattern += "*" + params.contains.toLowerCase() + "*";
		if (params.letters)
			pattern += params.letters.toLowerCase().replace(/[^a-z]/g, "?");
		if (params.ends) pattern += params.ends.toLowerCase();
		if (!pattern) pattern = "*";

		let url = `http://itools.subhashbose.com/wordfind/pattern/?word=${encodeURIComponent(
			pattern
		)}`;
		if (params.length) {
			url += `&wordlength=${params.length}`;
		}

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
			if (params.starts && !word.startsWith(params.starts.toLowerCase()))
				return false;
			if (params.ends && !word.endsWith(params.ends.toLowerCase()))
				return false;
			if (
				params.contains &&
				!word.includes(params.contains.toLowerCase())
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
