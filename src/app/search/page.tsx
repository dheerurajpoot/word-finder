"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";

interface Word {
	word: string;
	score: number;
	length: number;
}

const ToolCard = ({
	href,
	title,
	description,
}: {
	href: string;
	title: string;
	description: string;
}) => (
	<Link href={href} passHref>
		<Card className='h-full cursor-pointer transition-all duration-200 hover:border-green-500 hover:shadow-lg'>
			<CardHeader>
				<CardTitle className='text-xl'>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<p className='text-gray-600'>{description}</p>
			</CardContent>
		</Card>
	</Link>
);

function SearchContent() {
	const searchParams = useSearchParams();
	const [letters, setLetters] = useState("");
	const [starts, setStarts] = useState("");
	const [ends, setEnds] = useState("");
	const [contains, setContains] = useState("");
	const [length, setLength] = useState("");
	const [dictionary, setDictionary] = useState("all");
	const [sortBy, setSortBy] = useState("points");
	const [groupByLength, setGroupByLength] = useState(false);
	const [words, setWords] = useState<Word[]>([]);
	const [loading, setLoading] = useState(false);
	const [showMore, setShowMore] = useState(false);
	const [include, setInclude] = useState("");
	const [exclude, setExclude] = useState("");

	const fetchWords = async ({
		letters,
		starts = "",
		ends = "",
		contains = "",
		length,
		dictionary = "all",
	}: {
		letters: string;
		starts?: string;
		ends?: string;
		contains?: string;
		length: string;
		dictionary?: string;
	}) => {
		const lengthNum = parseInt(length, 10);
		if (!length || isNaN(lengthNum)) return [];

		// Build 'sp' pattern
		const middleLength = lengthNum - starts.length - ends.length;
		if (middleLength < 0) return [];

		const pattern = `${starts}${"?".repeat(middleLength)}${ends}`;

		const apiUrl = `https://api.datamuse.com/words?sp=${pattern}&topics=${
			letters || ""
		}&max=100`;

		const res = await axios.get(apiUrl);
		const data = await res.data;

		const rawWords: string[] = data.map(
			(item: { word: string }) => item.word
		);

		// Filter words
		const filtered = rawWords.filter((word: string) => {
			// Exact length
			if (word.length !== lengthNum) return false;

			// Must contain substring
			if (contains && !word.includes(contains.toLowerCase()))
				return false;

			// Must include all letters
			if (letters) {
				const lower = word.toLowerCase();
				for (let l of letters.toLowerCase()) {
					if (!lower.includes(l)) return false;
				}
			}

			// Optional dictionary filter
			if (dictionary === "common") {
				if (word.length > 12 || word.length < 3) return false;
			}

			return true;
		});

		return filtered.slice(0, 100);
	};

	const calculateScore = (word: string): number => {
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
			.reduce((score, letter) => score + (letterScores[letter] || 0), 0);
	};

	const handleSearch = useCallback(
		async (options?: {
			letters: string;
			starts: string;
			ends: string;
			contains: string;
			length: string;
			dictionary: string;
		}) => {
			setLoading(true);

			const params = options || {
				letters,
				starts,
				ends,
				contains,
				length,
				dictionary,
			};

			try {
				const stringResults = await fetchWords(params);

				const wordResults: Word[] = stringResults.map((word) => ({
					word,
					score: calculateScore(word),
					length: word.length,
				}));

				const sortedResults = wordResults.sort((a: Word, b: Word) => {
					if (sortBy === "points") return b.score - a.score;
					if (sortBy === "a-z") return a.word.localeCompare(b.word);
					if (sortBy === "z-a") return b.word.localeCompare(a.word);
					return 0;
				});
				setWords(sortedResults);
			} catch (error) {
				console.log(error);
				setWords([]);
			} finally {
				setLoading(false);
			}
		},
		[letters, starts, ends, contains, length, dictionary, sortBy]
	);

	useEffect(() => {
		// Initialize form with URL parameters
		const lettersParam = searchParams.get("letters") || "";
		const startsParam = searchParams.get("starts") || "";
		const endsParam = searchParams.get("ends") || "";
		const containsParam = searchParams.get("contains") || "";
		const lengthParam = searchParams.get("length") || "";
		const dictionaryParam = searchParams.get("dictionary") || "all";

		setLetters(lettersParam);
		setStarts(startsParam);
		setEnds(endsParam);
		setContains(containsParam);
		setLength(lengthParam);
		setDictionary(dictionaryParam);

		// Perform initial search if any field is provided
		if (lettersParam || startsParam || endsParam || containsParam) {
			handleSearch({
				letters: lettersParam,
				starts: startsParam,
				ends: endsParam,
				contains: containsParam,
				length: lengthParam,
				dictionary: dictionaryParam,
			});
		}
	}, [searchParams, handleSearch]);

	// Add this effect to re-sort when sortBy changes
	useEffect(() => {
		if (words.length > 0) {
			const sortedWords = [...words].sort((a: Word, b: Word) => {
				if (sortBy === "points") return b.score - a.score;
				if (sortBy === "a-z") return a.word.localeCompare(b.word);
				if (sortBy === "z-a") return b.word.localeCompare(a.word);
				return 0;
			});
			setWords(sortedWords);
		}
	}, [sortBy]);

	const clearFilter = (filter: string) => {
		switch (filter) {
			case "letters":
				setLetters("");
				break;
			case "starts":
				setStarts("");
				break;
			case "ends":
				setEnds("");
				break;
			case "contains":
				setContains("");
				break;
			case "length":
				setLength("");
				break;
		}
	};

	const groupedWords = groupByLength
		? words.reduce((acc, word) => {
				const len = word.length;
				if (!acc[len]) acc[len] = [];
				acc[len].push(word);
				return acc;
		  }, {} as Record<number, Word[]>)
		: { all: words };

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Breadcrumb */}
			<div className='bg-white border-b'>
				<div className='container mx-auto px-4 py-3'>
					<nav className='text-sm text-gray-600'>
						WordTips / Unscramble / Results
					</nav>
				</div>
			</div>

			<div className='container mx-auto px-4 py-8'>
				<div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
					{/* Main Content */}
					<div className='lg:col-span-3'>
						{words.length === 0 && !loading ? (
							<div className='text-center py-12'>
								<h2 className='text-2xl font-bold mb-4'>
									No Words Found
								</h2>
								<p className='text-gray-600 mb-8'>
									Sorry, there are no exact matches, but
									adjusting the in your search can help you
									get more results. The following words add
									extra letters that you might find on your
									game board.
								</p>
								<p className='font-semibold mb-8'>
									Showing words adding 3 wildcards
								</p>
							</div>
						) : null}

						{loading ? (
							<div className='text-center py-12'>
								<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto'></div>
								<p className='mt-4 text-gray-600'>
									Searching for words...
								</p>
							</div>
						) : null}

						{Object.entries(groupedWords).map(
							([lengthKey, wordsInGroup]) => (
								<div key={lengthKey} className='mb-8'>
									{groupByLength && lengthKey !== "all" && (
										<div className='bg-green-400 text-white px-4 py-2 rounded-t-lg'>
											<h3 className='font-semibold'>
												{lengthKey} Letter Words
											</h3>
										</div>
									)}

									<Card
										className={
											groupByLength && lengthKey !== "all"
												? "rounded-t-none"
												: ""
										}>
										<CardContent className='p-6'>
											<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3'>
												{(showMore
													? wordsInGroup
													: wordsInGroup.slice(0, 20)
												).map((word, index) => (
													<Badge
														key={index}
														variant='secondary'
														className='justify-center py-2 px-3 text-sm hover:bg-gray-200 cursor-pointer'>
														{word.word}
														<sub className='ml-1 text-xs'>
															{word.score}
														</sub>
													</Badge>
												))}
											</div>

											{wordsInGroup.length > 20 &&
												!showMore && (
													<div className='text-center mt-6'>
														<Button
															onClick={() =>
																setShowMore(
																	true
																)
															}
															className='bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8'>
															MORE
														</Button>
													</div>
												)}
										</CardContent>
									</Card>
								</div>
							)
						)}

						{/* Professional Description and Related Sections */}
						<div className='mt-16 space-y-16'>
							<Card className='border-none bg-white shadow-none'>
								<CardHeader className='text-center'>
									<CardTitle className='text-3xl font-bold text-gray-800'>
										Your Go-To Word Finder for Any Game
									</CardTitle>
								</CardHeader>
								<CardContent className='mx-auto max-w-4xl space-y-4 text-center text-lg text-gray-600'>
									<p>
										Unlock your full potential in word games
										with our versatile Word Finder. Whether
										you're playing Scrabble, Words with
										Friends, solving a crossword, or
										tackling any other word puzzle, our tool
										is designed to give you the winning
										edge.
									</p>
									<p>
										Simply enter the letters you have, and
										let our advanced search engine present
										you with a comprehensive list of
										possible words. Use the powerful
										filtering options to refine your results
										by starting or ending letters, letters
										contained within, and desired word
										length. Our goal is to make you a more
										confident and successful word game
										player.
									</p>
								</CardContent>
							</Card>

							<div>
								<h2 className='mb-8 text-center text-3xl font-bold text-gray-800'>
									Explore Our Other Tools
								</h2>
								<div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
									<ToolCard
										href='/anagram-solver'
										title='Anagram Solver'
										description='Unscramble letters to find hidden words.'
									/>
									<ToolCard
										href='/crossword-solver'
										title='Crossword Solver'
										description='Find answers to tricky crossword clues.'
									/>
									<ToolCard
										href='/wordle-helper'
										title='Wordle Helper'
										description='Get help with your daily Wordle puzzle.'
									/>
									<ToolCard
										href='/rhyme-finder'
										title='Rhyme Finder'
										description='Discover words that rhyme for your poems or songs.'
									/>
									<ToolCard
										href='/word-unscrambler'
										title='Word Unscrambler'
										description='A simple tool for unscrambling words.'
									/>
									<ToolCard
										href='/scrabble-calculator'
										title='Scrabble Calculator'
										description='Calculate the score of your Scrabble words.'
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Sidebar */}
					<div className='lg:col-span-1 space-y-6'>
						{/* Search Panel */}
						<Card>
							<CardContent className='p-4'>
								<div className='relative mb-4'>
									<Input
										type='text'
										placeholder='BEA???'
										value={letters}
										onChange={(e) =>
											setLetters(
												e.target.value.toUpperCase()
											)
										}
										className='pr-8'
									/>
									{letters && (
										<Button
											variant='ghost'
											size='sm'
											className='absolute right-1 top-1 h-6 w-6 p-0'
											onClick={() =>
												clearFilter("letters")
											}>
											<X className='h-3 w-3' />
										</Button>
									)}
								</div>

								<div className='grid grid-cols-2 gap-2 mb-4'>
									<div className='relative'>
										<Input
											type='text'
											placeholder='Starts'
											value={starts}
											onChange={(e) =>
												setStarts(e.target.value)
											}
											className='text-sm'
										/>
										{starts && (
											<Button
												variant='ghost'
												size='sm'
												className='absolute right-1 top-1 h-6 w-6 p-0'
												onClick={() =>
													clearFilter("starts")
												}>
												<X className='h-3 w-3' />
											</Button>
										)}
									</div>
									<div className='relative'>
										<Input
											type='text'
											placeholder='Ends'
											value={ends}
											onChange={(e) =>
												setEnds(e.target.value)
											}
											className='text-sm'
										/>
										{ends && (
											<Button
												variant='ghost'
												size='sm'
												className='absolute right-1 top-1 h-6 w-6 p-0'
												onClick={() =>
													clearFilter("ends")
												}>
												<X className='h-3 w-3' />
											</Button>
										)}
									</div>
								</div>

								<div className='grid grid-cols-2 gap-2 mb-4'>
									<div className='relative'>
										<Input
											type='text'
											placeholder='Contains'
											value={contains}
											onChange={(e) =>
												setContains(e.target.value)
											}
											className='text-sm'
										/>
										{contains && (
											<Button
												variant='ghost'
												size='sm'
												className='absolute right-1 top-1 h-6 w-6 p-0'
												onClick={() =>
													clearFilter("contains")
												}>
												<X className='h-3 w-3' />
											</Button>
										)}
									</div>
									<div className='relative'>
										<Input
											type='number'
											placeholder='Length'
											value={length}
											onChange={(e) =>
												setLength(e.target.value)
											}
											className='text-sm'
										/>
										{length && (
											<Button
												variant='ghost'
												size='sm'
												className='absolute right-1 top-1 h-6 w-6 p-0'
												onClick={() =>
													clearFilter("length")
												}>
												<X className='h-3 w-3' />
											</Button>
										)}
									</div>
								</div>

								<div className='grid grid-cols-2 gap-2 mb-4'>
									<div className='relative'>
										<Input
											type='text'
											placeholder='Include (letters)'
											value={include}
											onChange={(e) =>
												setInclude(e.target.value)
											}
											className='text-sm'
										/>
										{include && (
											<Button
												variant='ghost'
												size='sm'
												className='absolute right-1 top-1 h-6 w-6 p-0'
												onClick={() => setInclude("")}>
												<X className='h-3 w-3' />
											</Button>
										)}
									</div>
									<div className='relative'>
										<Input
											type='text'
											placeholder='Exclude (letters)'
											value={exclude}
											onChange={(e) =>
												setExclude(e.target.value)
											}
											className='text-sm'
										/>
										{exclude && (
											<Button
												variant='ghost'
												size='sm'
												className='absolute right-1 top-1 h-6 w-6 p-0'
												onClick={() => setExclude("")}>
												<X className='h-3 w-3' />
											</Button>
										)}
									</div>
								</div>

								<Button
									onClick={() => handleSearch()}
									className='w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold'
									disabled={loading}>
									{loading ? "SEARCHING..." : "SEARCH"}
								</Button>
							</CardContent>
						</Card>

						{/* Sort Results */}
						<Card>
							<CardHeader>
								<CardTitle className='text-lg'>
									Sort Results
								</CardTitle>
							</CardHeader>
							<CardContent>
								<RadioGroup
									value={sortBy}
									onValueChange={setSortBy}>
									<div className='flex items-center space-x-2'>
										<RadioGroupItem
											value='points'
											id='points'
										/>
										<Label htmlFor='points'>Points</Label>
									</div>
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='a-z' id='a-z' />
										<Label htmlFor='a-z'>A-Z</Label>
									</div>
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='z-a' id='z-a' />
										<Label htmlFor='z-a'>Z-A</Label>
									</div>
								</RadioGroup>

								<div className='mt-4'>
									<div className='flex items-center space-x-2'>
										<Checkbox
											id='group-length'
											checked={groupByLength}
											onCheckedChange={(checked) =>
												setGroupByLength(
													checked === true
												)
											}
										/>
										<Label htmlFor='group-length'>
											Group by Length
										</Label>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Dictionary */}
						<Card>
							<CardHeader>
								<CardTitle className='text-lg'>
									Dictionary
								</CardTitle>
							</CardHeader>
							<CardContent>
								<RadioGroup
									value={dictionary}
									onValueChange={setDictionary}>
									<div className='flex items-center space-x-2'>
										<RadioGroupItem
											value='words-with-friends'
											id='wwf'
										/>
										<Label htmlFor='wwf'>
											Words With Friends
										</Label>
									</div>
									<div className='flex items-center space-x-2'>
										<RadioGroupItem
											value='scrabble-us'
											id='scrabble-us'
										/>
										<Label htmlFor='scrabble-us'>
											Scrabble US
										</Label>
									</div>
									<div className='flex items-center space-x-2'>
										<RadioGroupItem
											value='scrabble-uk'
											id='scrabble-uk'
										/>
										<Label htmlFor='scrabble-uk'>
											Scrabble UK
										</Label>
									</div>
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='all' id='all' />
										<Label htmlFor='all'>
											All Dictionaries
										</Label>
									</div>
								</RadioGroup>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function SearchPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<SearchContent />
		</Suspense>
	);
}
