"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface Word {
	word: string;
	score: number;
	length: number;
}

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

	useEffect(() => {
		// Initialize form with URL parameters
		setLetters(searchParams.get("letters") || "");
		setStarts(searchParams.get("starts") || "");
		setEnds(searchParams.get("ends") || "");
		setContains(searchParams.get("contains") || "");
		setLength(searchParams.get("length") || "");
		setDictionary(searchParams.get("dictionary") || "all");

		// Perform initial search if any field is provided
		if (
			searchParams.get("letters") ||
			searchParams.get("starts") ||
			searchParams.get("ends") ||
			searchParams.get("contains")
		) {
			handleSearch();
		}
	}, [searchParams]);

	const handleSearch = async () => {
		setLoading(true);
		try {
			const params = new URLSearchParams({
				letters,
				starts,
				ends,
				contains,
				length,
				dictionary,
			});
			const response = await fetch(
				`/api/wordsearch?${params.toString()}`
			);
			const results = await response.json();
			// Apply sorting
			const sortedResults = results.sort((a: Word, b: Word) => {
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
	};

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

	// const generateMockWords = (
	// 	letters: string,
	// 	starts: string,
	// 	ends: string,
	// 	contains: string,
	// 	length: string
	// ): Word[] => {
	// 	// Mock word generation based on search criteria
	// 	const baseWords = [
	// 		"beaded",
	// 		"beader",
	// 		"beadle",
	// 		"beagle",
	// 		"beaked",
	// 		"beaker",
	// 		"beamed",
	// 		"beamer",
	// 		"beaned",
	// 		"beanie",
	// 		"beared",
	// 		"bearer",
	// 		"beares",
	// 		"beaten",
	// 		"beater",
	// 		"beaver",
	// 		"beachy",
	// 		"beacon",
	// 		"beanos",
	// 		"beards",
	// 		"beauty",
	// 		"became",
	// 		"beckon",
	// 		"bedded",
	// 	];

	// 	return baseWords
	// 		.filter((word) => {
	// 			if (starts && !word.startsWith(starts.toLowerCase()))
	// 				return false;
	// 			if (ends && !word.endsWith(ends.toLowerCase())) return false;
	// 			if (contains && !word.includes(contains.toLowerCase()))
	// 				return false;
	// 			if (length && word.length !== Number.parseInt(length))
	// 				return false;
	// 			return true;
	// 		})
	// 		.map((word) => ({
	// 			word,
	// 			score: Math.floor(Math.random() * 20) + 5,
	// 			length: word.length,
	// 		}))
	// 		.sort((a: Word, b: Word) => {
	// 			if (sortBy === "points") return b.score - a.score;
	// 			if (sortBy === "a-z") return a.word.localeCompare(b.word);
	// 			if (sortBy === "z-a") return b.word.localeCompare(a.word);
	// 			return 0;
	// 		});
	// };

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

	// const displayWords = showMore ? words : words.slice(0, 20);

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

								<Button
									onClick={handleSearch}
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
