"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Trophy, BookOpen, Target } from "lucide-react";
import Link from "next/link";
import { WordDetailsDialog } from "@/components/word-details-dialog";
import React from "react";
import axios from "axios";

export default function WordsByLengthPage({
	params,
}: {
	params: Promise<{ length: string }>;
}) {
	const { length } = React.use(params);
	const [words, setWords] = useState<string[]>([]);
	const [filteredWords, setFilteredWords] = useState<string[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [showMore, setShowMore] = useState(false);
	const [sortBy, setSortBy] = useState("points");
	const [selectedDictionary, setSelectedDictionary] = useState("all");
	const [loading, setLoading] = useState(false);

	// Extract number from URL parameter
	const getNumberFromLength = (lengthParam: string): number => {
		const match = lengthParam.match(/(\d+)/);
		return match ? Number.parseInt(match[1]) : 2;
	};

	const wordLength = getNumberFromLength(length);
	const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

	useEffect(() => {
		const fetchWords = async () => {
			setLoading(true);
			const pattern = "?".repeat(wordLength);
			const apiUrl = `https://api.datamuse.com/words?sp=${pattern}&max=100`;
			try {
				const res = await axios.get(apiUrl);
				const data = res.data;
				const realWords = data
					.map((item: { word: string }) => item.word)
					.filter((w: string) => w.length === wordLength);
				setWords(realWords);
				setFilteredWords(realWords);
			} catch (e) {
				setWords([]);
				setFilteredWords([]);
			} finally {
				setLoading(false);
			}
		};
		fetchWords();
	}, [wordLength]);

	useEffect(() => {
		let filtered = words;
		if (searchTerm) {
			filtered = words.filter((word) =>
				word.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}
		if (sortBy === "points") {
			filtered = [...filtered].sort(
				(a, b) => calculateScore(b) - calculateScore(a)
			);
		} else if (sortBy === "a-z") {
			filtered = [...filtered].sort();
		} else if (sortBy === "z-a") {
			filtered = [...filtered].sort().reverse();
		}
		setFilteredWords(filtered);
	}, [searchTerm, words, sortBy]);

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
			?.toLowerCase()
			.split("")
			.reduce((score, letter) => score + (letterScores[letter] || 0), 0);
	};

	const displayWords = showMore ? filteredWords : filteredWords.slice(0, 50);

	const sidebarSections = {
		wordFinder: [
			"Word Finder",
			"Anagram Solver",
			"Word Descrambler",
			"Word Unscrambler",
			"Crossword Solver",
			"Word Generator",
			"Rhyme Finder",
			"Scrabble Score Calculator Finder",
		],
		wordsByLength: [
			"2 Letter Words",
			"3 Letter Words",
			"4 Letter Words",
			"5 Letter Words",
			"6 Letter Words",
			"7 Letter Words",
			"8 Letter Words",
		],
	};

	return (
		<div className='min-h-screen bg-gradient-to-b from-gray-50 to-white'>
			<div className='container mx-auto px-4 py-8'>
				<div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
					{/* Main Content */}
					<div className='lg:col-span-3 space-y-8'>
						{/* Header */}
						<div className='bg-white rounded-xl shadow-lg p-8 border border-gray-100'>
							<h1 className='text-4xl font-bold text-gray-800 mb-4'>
								{wordLength} Letter Words
							</h1>
							<p className='text-gray-700 leading-relaxed mb-4'>
								Find all {wordLength}-letter words for Scrabble,
								Words with Friends, and more. Results are always
								up-to-date!
							</p>
						</div>
						{/* Words Grid */}
						<div className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100'>
							<div className='bg-gradient-to-r from-green-400 to-green-500 text-white px-6 py-4'>
								<h2 className='text-2xl font-bold'>
									{wordLength} Letter Words
								</h2>
							</div>
							<div className='p-6'>
								{loading ? (
									<p className='text-gray-500'>Loading...</p>
								) : (
									<>
										<div className='grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3 mb-6'>
											{displayWords.map((word, index) => (
												<WordDetailsDialog
													key={index}
													word={word}>
													<Badge
														variant='secondary'
														className='justify-center py-2 px-3 text-sm hover:bg-green-100 hover:text-green-700 cursor-pointer font-mono transition-colors duration-200 border border-gray-200'>
														{word}
													</Badge>
												</WordDetailsDialog>
											))}
										</div>
										{filteredWords.length > 50 &&
											!showMore && (
												<div className='text-center'>
													<Button
														onClick={() =>
															setShowMore(true)
														}
														className='bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold px-8 py-3 rounded-lg'>
														MORE
													</Button>
												</div>
											)}
									</>
								)}
							</div>
						</div>
						{/* Highest Scoring Word */}
						<div className='bg-white rounded-xl shadow-lg p-8 border border-gray-100'>
							<h2 className='text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2'>
								<Trophy className='h-6 w-6 text-yellow-500' />
								What is the highest scoring word in Words With
								Friends that has {wordLength} letters?
							</h2>
							<p className='text-gray-700 mb-4'>
								The highest scoring word in Words With Friends
								that has {wordLength} letters is{" "}
								<strong className='text-blue-600'>
									{words[0]}
								</strong>{" "}
								with a total of{" "}
								<strong>
									{calculateScore(words[0])} points
								</strong>
								.
							</p>

							<div className='flex gap-4 mb-4'>
								{words[0]?.split("").map((letter, index) => (
									<div
										key={index}
										className='w-12 h-12 bg-yellow-100 border-2 border-yellow-400 rounded flex items-center justify-center font-bold text-lg'>
										{letter}
									</div>
								))}
							</div>
						</div>

						{/* Starting With */}
						<div className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100'>
							<div className='bg-gradient-to-r from-green-400 to-green-500 text-white px-6 py-4'>
								<h2 className='text-xl font-bold'>
									{wordLength} Letter Words starting with
								</h2>
							</div>
							<div className='p-6'>
								<div className='grid grid-cols-6 md:grid-cols-8 lg:grid-cols-13 gap-2'>
									{alphabet.map((letter) => (
										<Link
											key={letter}
											href={`/words-by-length/${wordLength}/starting-with/${letter}`}
											className='w-10 h-10 bg-gray-100 hover:bg-green-100 border border-gray-300 rounded flex items-center justify-center font-medium text-gray-700 hover:text-green-700 transition-colors duration-200'>
											{letter}
										</Link>
									))}
								</div>
							</div>
						</div>

						{/* Ending In */}
						<div className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100'>
							<div className='bg-gradient-to-r from-green-400 to-green-500 text-white px-6 py-4'>
								<h2 className='text-xl font-bold'>
									{wordLength} Letter Words ending in
								</h2>
							</div>
							<div className='p-6'>
								<div className='grid grid-cols-6 md:grid-cols-8 lg:grid-cols-13 gap-2'>
									{alphabet.map((letter) => (
										<Link
											key={letter}
											href={`/words-by-length/${wordLength}/ending-in/${letter}`}
											className='w-10 h-10 bg-gray-100 hover:bg-green-100 border border-gray-300 rounded flex items-center justify-center font-medium text-gray-700 hover:text-green-700 transition-colors duration-200'>
											{letter}
										</Link>
									))}
								</div>
							</div>
						</div>
						{/* Words With */}
						<div className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100'>
							<div className='bg-gradient-to-r from-green-400 to-green-500 text-white px-6 py-4'>
								<h2 className='text-xl font-bold'>
									{wordLength} Letter Words with
								</h2>
							</div>
							<div className='p-6'>
								<div className='grid grid-cols-6 md:grid-cols-8 lg:grid-cols-13 gap-2'>
									{alphabet.map((letter) => (
										<Link
											key={letter}
											href={`/words-by-length/${wordLength}/with/${letter}`}
											className='w-10 h-10 bg-gray-100 hover:bg-green-100 border border-gray-300 rounded flex items-center justify-center font-medium text-gray-700 hover:text-green-700 transition-colors duration-200'>
											{letter}
										</Link>
									))}
								</div>
							</div>
						</div>

						<div className='bg-white rounded-xl shadow-lg p-8 border border-gray-100'>
							<h2 className='text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2'>
								<Target className='h-6 w-6 text-blue-500' />
								Most Common {wordLength} Letter Words
							</h2>
							<p className='text-gray-700 mb-4'>
								The most common {wordLength}-letter words are{" "}
								{words.slice(0, 5).map((word, index) => (
									<span key={word}>
										<strong className='text-blue-600'>
											{word}
										</strong>
										{index < words.length - 1 && ", "}
									</span>
								))}
								.
							</p>
						</div>
						{/* FAQ Section */}
						<div className='bg-white rounded-xl shadow-lg p-8 border border-gray-100'>
							<h2 className='text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2'>
								<BookOpen className='h-6 w-6 text-purple-500' />
								{wordLength} Letter Words FAQ
							</h2>

							<div className='space-y-4'>
								<div>
									<h3 className='font-bold text-gray-800 mb-2'>
										How many {wordLength} letter words are
										there?
									</h3>
									<p className='text-gray-700'>
										There are approximately {words.length}+
										common {wordLength}-letter words in the
										English language that are accepted in
										word games like Scrabble and Words with
										Friends.
									</p>
								</div>

								<div>
									<h3 className='font-bold text-gray-800 mb-2'>
										What are the best {wordLength}-letter
										words for Scrabble?
									</h3>
									<p className='text-gray-700'>
										The best {wordLength}-letter words for
										Scrabble are those with high-value
										letters like Q, X, Z, and J. Words like{" "}
										{words[0]} can score{" "}
										{calculateScore(words[0])} points or
										more.
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Sidebar */}
					<div className='lg:col-span-1 space-y-6'>
						{/* Search Form */}
						<div className='bg-white rounded-xl shadow-lg p-6 border border-gray-100'>
							<div className='space-y-4'>
								<Input
									placeholder='YOUR LETTERS'
									value={searchTerm}
									onChange={(e) =>
										setSearchTerm(e.target.value)
									}
									className='w-full'
								/>
								<div className='grid grid-cols-2 gap-2'>
									<Input
										placeholder='Starts'
										className='text-sm'
									/>
									<Input
										placeholder='Ends'
										className='text-sm'
									/>
								</div>
								<div className='grid grid-cols-2 gap-2'>
									<Input
										placeholder='Contains'
										className='text-sm'
									/>
									<Select
										defaultValue={wordLength.toString()}>
										<SelectTrigger className='text-sm'>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='2'>2</SelectItem>
											<SelectItem value='3'>3</SelectItem>
											<SelectItem value='4'>4</SelectItem>
											<SelectItem value='5'>5</SelectItem>
											<SelectItem value='6'>6</SelectItem>
											<SelectItem value='7'>7</SelectItem>
											<SelectItem value='8'>8</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<Button className='w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold'>
									SEARCH
								</Button>
							</div>
						</div>

						{/* Sort Results */}
						<div className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100'>
							<div className='bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-3'>
								<h3 className='font-bold'>Sort Results</h3>
							</div>
							<div className='p-4 space-y-2'>
								<label className='flex items-center gap-2 cursor-pointer'>
									<input
										type='radio'
										name='sort'
										value='points'
										checked={sortBy === "points"}
										onChange={(e) =>
											setSortBy(e.target.value)
										}
										className='text-green-500'
									/>
									<span className='text-sm'>Points</span>
								</label>
								<label className='flex items-center gap-2 cursor-pointer'>
									<input
										type='radio'
										name='sort'
										value='a-z'
										checked={sortBy === "a-z"}
										onChange={(e) =>
											setSortBy(e.target.value)
										}
										className='text-green-500'
									/>
									<span className='text-sm'>A-Z</span>
								</label>
								<label className='flex items-center gap-2 cursor-pointer'>
									<input
										type='radio'
										name='sort'
										value='z-a'
										checked={sortBy === "z-a"}
										onChange={(e) =>
											setSortBy(e.target.value)
										}
										className='text-green-500'
									/>
									<span className='text-sm'>Z-A</span>
								</label>
							</div>
						</div>

						{/* Dictionary */}
						<div className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100'>
							<div className='bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-3'>
								<h3 className='font-bold'>Dictionary</h3>
							</div>
							<div className='p-4 space-y-2'>
								<label className='flex items-center gap-2 cursor-pointer'>
									<input
										type='radio'
										name='dictionary'
										value='words-with-friends'
										checked={
											selectedDictionary ===
											"words-with-friends"
										}
										onChange={(e) =>
											setSelectedDictionary(
												e.target.value
											)
										}
										className='text-green-500'
									/>
									<span className='text-sm'>
										Words With Friends
									</span>
								</label>
								<label className='flex items-center gap-2 cursor-pointer'>
									<input
										type='radio'
										name='dictionary'
										value='scrabble-us'
										checked={
											selectedDictionary === "scrabble-us"
										}
										onChange={(e) =>
											setSelectedDictionary(
												e.target.value
											)
										}
										className='text-green-500'
									/>
									<span className='text-sm'>Scrabble US</span>
								</label>
								<label className='flex items-center gap-2 cursor-pointer'>
									<input
										type='radio'
										name='dictionary'
										value='scrabble-uk'
										checked={
											selectedDictionary === "scrabble-uk"
										}
										onChange={(e) =>
											setSelectedDictionary(
												e.target.value
											)
										}
										className='text-green-500'
									/>
									<span className='text-sm'>Scrabble UK</span>
								</label>
								<label className='flex items-center gap-2 cursor-pointer'>
									<input
										type='radio'
										name='dictionary'
										value='all'
										checked={selectedDictionary === "all"}
										onChange={(e) =>
											setSelectedDictionary(
												e.target.value
											)
										}
										className='text-green-500'
									/>
									<span className='text-sm'>
										All Dictionaries
									</span>
								</label>
							</div>
						</div>

						{/* Word Finder Tools */}
						<div className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100'>
							<div className='bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-3'>
								<h3 className='font-bold'>Word Finder</h3>
							</div>
							<div className='p-4 space-y-1'>
								{sidebarSections.wordFinder.map(
									(tool, index) => (
										<Link
											key={index}
											href={`/${tool
												.toLowerCase()
												.replace(/\s+/g, "-")}`}
											className='block text-sm text-gray-700 hover:text-green-600 hover:bg-green-50 py-1 px-2 rounded transition-colors duration-200'>
											{tool}
										</Link>
									)
								)}
							</div>
						</div>

						{/* Grammar */}
						<div className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100'>
							<div className='bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-3'>
								<h3 className='font-bold'>Grammar</h3>
							</div>
							<div className='p-4 space-y-1'>
								<Link
									href='/grammar-rules'
									className='block text-sm text-gray-700 hover:text-green-600 hover:bg-green-50 py-1 px-2 rounded transition-colors duration-200'>
									Grammar Rules And Examples
								</Link>
								<Link
									href='/scrabble-dictionary'
									className='block text-sm text-gray-700 hover:text-green-600 hover:bg-green-50 py-1 px-2 rounded transition-colors duration-200'>
									Scrabble Dictionary
								</Link>
							</div>
						</div>

						{/* Words by Length */}
						<div className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100'>
							<div className='bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-3'>
								<h3 className='font-bold'>Words by Length</h3>
							</div>
							<div className='p-4 space-y-1'>
								{sidebarSections.wordsByLength.map(
									(category, index) => (
										<Link
											key={index}
											href={`/words-by-length/${
												index + 2
											}-letter-words`}
											className='block text-sm text-gray-700 hover:text-green-600 hover:bg-green-50 py-1 px-2 rounded transition-colors duration-200'>
											{category}
										</Link>
									)
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
