"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Shuffle } from "lucide-react";
import { WordDetailsDialog } from "@/components/word-details-dialog";

export default function WordsWithLettersPage() {
	const exampleWords = [
		{ word: "EXAMPLE", letters: "AELMEPX", score: 18, length: 7 },
		{ word: "LETTERS", letters: "EELRSTT", score: 7, length: 7 },
		{ word: "CONTAIN", letters: "ACINONT", score: 9, length: 7 },
		{ word: "INCLUDE", letters: "CDEILNU", score: 10, length: 7 },
		{ word: "PATTERN", letters: "AENPRTT", score: 9, length: 7 },
		{ word: "QUALITY", letters: "AILQTUY", score: 19, length: 7 },
		{ word: "QUICKLY", letters: "CIKLQUY", score: 25, length: 7 },
		{ word: "AMAZING", letters: "AAGIMZN", score: 19, length: 7 },
	];

	const commonLetterCombinations = [
		{
			combo: "QU",
			description: "Q is almost always followed by U",
			examples: ["QUEEN", "QUICK", "QUIET"],
		},
		{
			combo: "TH",
			description: "Very common English digraph",
			examples: ["THINK", "THROW", "THROUGH"],
		},
		{
			combo: "CH",
			description: "Common consonant combination",
			examples: ["CHAIR", "CHANGE", "CHOICE"],
		},
		{
			combo: "SH",
			description: "Frequent sound combination",
			examples: ["SHARE", "SHOULD", "SHOWER"],
		},
		{
			combo: "ING",
			description: "Common verb ending",
			examples: ["RUNNING", "PLAYING", "WORKING"],
		},
		{
			combo: "TION",
			description: "Popular noun suffix",
			examples: ["NATION", "ACTION", "CREATION"],
		},
	];

	const letterFrequency = [
		{ letter: "E", frequency: 12.7, color: "bg-red-500" },
		{ letter: "T", frequency: 9.1, color: "bg-orange-500" },
		{ letter: "A", frequency: 8.2, color: "bg-yellow-500" },
		{ letter: "O", frequency: 7.5, color: "bg-green-500" },
		{ letter: "I", frequency: 7.0, color: "bg-blue-500" },
		{ letter: "N", frequency: 6.7, color: "bg-indigo-500" },
		{ letter: "S", frequency: 6.3, color: "bg-purple-500" },
		{ letter: "H", frequency: 6.1, color: "bg-pink-500" },
	];

	return (
		<div className='min-h-screen bg-gradient-to-b from-blue-50 to-white'>
			<div className='container mx-auto px-4 py-8'>
				<div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
					{/* Main Content */}
					<div className='lg:col-span-3 space-y-8'>
						{/* Header */}
						<div className='bg-white rounded-xl shadow-lg p-8 border border-gray-100'>
							<div className='flex items-center gap-3 mb-6'>
								<Shuffle className='h-8 w-8 text-blue-500' />
								<h1 className='text-4xl font-bold text-gray-800'>
									Words With Letters
								</h1>
							</div>
							<p className='text-lg text-gray-700 leading-relaxed mb-6'>
								Find words that contain specific letters or
								letter combinations. Perfect for Scrabble, Words
								with Friends, crossword puzzles, and word games.
								Specify required letters, exclude unwanted
								letters, and filter by word length to find
								exactly what you need.
							</p>
						</div>

						{/* Search Results */}
						<Card className='shadow-lg border border-gray-100'>
							<CardHeader className='bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-xl'>
								<CardTitle>
									Example Words
									<span className='text-blue-200 text-sm ml-2'>
										({exampleWords.length} words found)
									</span>
								</CardTitle>
							</CardHeader>
							<CardContent className='p-6'>
								<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
									{exampleWords.map((word, index) => (
										<WordDetailsDialog
											key={index}
											word={word.word}>
											<div className='bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer'>
												<div className='flex justify-between items-center mb-2'>
													<span className='font-bold text-gray-800'>
														{word.word}
													</span>
													<Badge className='bg-blue-500 text-white'>
														{word.score} pts
													</Badge>
												</div>
												<div className='text-xs text-gray-500 mb-2'>
													{word.length} letters
												</div>
												<div className='flex flex-wrap gap-1'>
													{word.letters
														.split("")
														.map(
															(
																letter,
																letterIndex
															) => (
																<span
																	key={
																		letterIndex
																	}
																	className={`text-xs px-1 py-0.5 rounded bg-green-100 text-green-800`}>
																	{letter}
																</span>
															)
														)}
												</div>
											</div>
										</WordDetailsDialog>
									))}
								</div>
								{exampleWords.length === 0 && (
									<div className='text-center py-8 text-gray-500'>
										<Search className='h-12 w-12 mx-auto mb-4 text-gray-300' />
										<p>
											No words found matching your
											criteria.
										</p>
										<p className='text-sm'>
											Try adjusting your letter
											requirements or filters.
										</p>
									</div>
								)}
							</CardContent>
						</Card>

						{/* Common Letter Combinations */}
						<Card className='shadow-lg border border-gray-100'>
							<CardHeader className='bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-xl'>
								<CardTitle>
									Common Letter Combinations
								</CardTitle>
							</CardHeader>
							<CardContent className='p-6'>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
									{commonLetterCombinations.map(
										(combo, index) => (
											<div
												key={index}
												className='bg-green-50 rounded-lg p-4 border border-green-200'>
												<div className='flex items-center gap-2 mb-2'>
													<Badge className='bg-green-500 text-white font-bold'>
														{combo.combo}
													</Badge>
													<span className='text-sm text-green-700'>
														{combo.description}
													</span>
												</div>
												<div className='flex flex-wrap gap-2'>
													{combo.examples.map(
														(word, wordIndex) => (
															<WordDetailsDialog
																key={wordIndex}
																word={word}>
																<Badge
																	variant='outline'
																	className='cursor-pointer hover:bg-green-100 hover:border-green-400 transition-colors'>
																	{word}
																</Badge>
															</WordDetailsDialog>
														)
													)}
												</div>
											</div>
										)
									)}
								</div>
							</CardContent>
						</Card>

						{/* Letter Frequency */}
						<Card className='shadow-lg border border-gray-100'>
							<CardHeader className='bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-xl'>
								<CardTitle>
									Letter Frequency in English
								</CardTitle>
							</CardHeader>
							<CardContent className='p-6'>
								<div className='space-y-4'>
									{letterFrequency.map((item, index) => (
										<div
											key={index}
											className='flex items-center gap-4'>
											<div className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold'>
												{item.letter}
											</div>
											<div className='flex-1'>
												<div className='flex justify-between mb-1'>
													<span className='text-sm font-medium'>
														{item.letter}
													</span>
													<span className='text-sm text-gray-600'>
														{item.frequency}%
													</span>
												</div>
												<div className='w-full bg-gray-200 rounded-full h-2'>
													<div
														className={`h-2 rounded-full ${item.color}`}
														style={{
															width: `${
																(item.frequency /
																	12.7) *
																100
															}%`,
														}}></div>
												</div>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Sidebar */}
					<div className='lg:col-span-1 space-y-6'>
						{/* Quick Tips */}
						<Card className='shadow-lg border border-gray-100'>
							<CardHeader className='bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-t-xl'>
								<CardTitle>Search Tips</CardTitle>
							</CardHeader>
							<CardContent className='p-4'>
								<div className='space-y-3 text-sm'>
									<div className='bg-blue-50 rounded-lg p-3'>
										<h4 className='font-semibold text-blue-800 mb-1'>
											Required Letters
										</h4>
										<p className='text-blue-700'>
											Enter letters that MUST be in the
											word
										</p>
									</div>
									<div className='bg-blue-50 rounded-lg p-3'>
										<h4 className='font-semibold text-blue-800 mb-1'>
											Excluded Letters
										</h4>
										<p className='text-blue-700'>
											Enter letters that CANNOT be in the
											word
										</p>
									</div>
									<div className='bg-blue-50 rounded-lg p-3'>
										<h4 className='font-semibold text-blue-800 mb-1'>
											Combine Filters
										</h4>
										<p className='text-blue-700'>
											Use both filters together for
											precise results
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Word Game Strategy */}
						<Card className='shadow-lg border border-gray-100'>
							<CardHeader className='bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-xl'>
								<CardTitle>Game Strategy</CardTitle>
							</CardHeader>
							<CardContent className='p-4'>
								<div className='space-y-3 text-sm'>
									<div className='bg-orange-50 rounded-lg p-3'>
										<h4 className='font-semibold text-orange-800 mb-1'>
											High-Value Letters
										</h4>
										<p className='text-orange-700'>
											Focus on Q, X, Z, J for maximum
											points
										</p>
									</div>
									<div className='bg-orange-50 rounded-lg p-3'>
										<h4 className='font-semibold text-orange-800 mb-1'>
											Vowel Balance
										</h4>
										<p className='text-orange-700'>
											Maintain good vowel-consonant ratio
										</p>
									</div>
									<div className='bg-orange-50 rounded-lg p-3'>
										<h4 className='font-semibold text-orange-800 mb-1'>
											Common Patterns
										</h4>
										<p className='text-orange-700'>
											Learn frequent letter combinations
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Related Tools */}
						<Card className='shadow-lg border border-gray-100'>
							<CardHeader className='bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-t-xl'>
								<CardTitle>Related Tools</CardTitle>
							</CardHeader>
							<CardContent className='p-4'>
								<div className='space-y-2'>
									<Link
										href='/anagram-solver'
										className='block text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-all duration-200 text-sm py-2 px-3 rounded-lg border-l-4 border-gray-200 hover:border-teal-400'>
										Anagram Solver
									</Link>
									<Link
										href='/word-unscrambler'
										className='block text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-all duration-200 text-sm py-2 px-3 rounded-lg border-l-4 border-gray-200 hover:border-teal-400'>
										Word Unscrambler
									</Link>
									<Link
										href='/scrabble-calculator'
										className='block text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-all duration-200 text-sm py-2 px-3 rounded-lg border-l-4 border-gray-200 hover:border-teal-400'>
										Scrabble Calculator
									</Link>
									<Link
										href='/crossword-solver'
										className='block text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-all duration-200 text-sm py-2 px-3 rounded-lg border-l-4 border-gray-200 hover:border-teal-400'>
										Crossword Solver
									</Link>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
