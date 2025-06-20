"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export function DescriptionSection() {
	return (
		<section className='bg-white py-16'>
			<div className='container mx-auto px-4'>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					<div className='lg:col-span-2'>
						<Card className='h-full'>
							<CardContent className='p-8'>
								<h2 className='text-3xl font-bold mb-6'>
									What is Word Finder?
								</h2>
								<p className='text-lg leading-relaxed mb-6'>
									<Link
										href='/word-finder'
										className='text-blue-600 hover:underline font-semibold'>
										Word Finder
									</Link>{" "}
									is the perfect help when your vocabulary
									fails you. It's a unique word search tool,
									which finds all possible words made up of
									the letters you input. People use Word
									Finder for various reasons, but the primary
									one is to win games such as{" "}
									<Link
										href='/scrabble'
										className='text-blue-600 hover:underline'>
										Scrabble
									</Link>{" "}
									and{" "}
									<Link
										href='/words-with-friends'
										className='text-blue-600 hover:underline'>
										Words With Friends
									</Link>
									.
								</p>

								<h3 className='text-2xl font-bold mb-4'>
									How Does Word Finder Work?
								</h3>
								<p className='text-gray-700 leading-relaxed mb-4'>
									Our advanced algorithm searches through
									comprehensive dictionaries to find all
									possible word combinations from your input
									letters. Whether you're stuck in a word game
									or looking to expand your vocabulary, our
									tool provides instant results with scoring
									information.
								</p>

								<h3 className='text-2xl font-bold mb-4'>
									Perfect for Word Game Enthusiasts
								</h3>
								<p className='text-gray-700 leading-relaxed'>
									Are you someone who loves finding and
									discovering new words? Are you a board game
									enthusiast? If you are, then this Word
									Finder is a tool you can't afford not to
									have. Whether you are into playing Scrabble,
									Words with Friends or any other word game,
									Word Finder will prove to be useful. It will
									help you both with word discovery, and as a
									reference tool, you and your playmates can
									use as a way to settle disputes about the
									validity of any particular word.
								</p>
							</CardContent>
						</Card>
					</div>

					<div className='lg:col-span-1'>
						<Card className='bg-green-100'>
							<CardContent className='p-6'>
								<h3 className='text-xl font-bold text-green-800 mb-4'>
									Popular Word Tools
								</h3>
								<div className='space-y-3'>
									<Link
										href='/words-with-friends-cheat'
										className='block text-gray-700 hover:text-green-700 transition-colors'>
										Words With Friends Cheat
									</Link>
									<Link
										href='/wordle'
										className='block text-gray-700 hover:text-green-700 transition-colors'>
										Wordle Helper
									</Link>
									<Link
										href='/word-finder'
										className='block text-gray-700 hover:text-green-700 transition-colors'>
										Word Finder
									</Link>
									<Link
										href='/crossword-popular-clues'
										className='block text-gray-700 hover:text-green-700 transition-colors'>
										Crossword Popular Clues
									</Link>
									<Link
										href='/crossword-top-picks'
										className='block text-gray-700 hover:text-green-700 transition-colors'>
										Crossword Top Picks
									</Link>
									<Link
										href='/anagram-solver'
										className='block text-gray-700 hover:text-green-700 transition-colors'>
										Anagram Solver
									</Link>
									<Link
										href='/word-descrambler'
										className='block text-gray-700 hover:text-green-700 transition-colors'>
										Word Descrambler
									</Link>
									<Link
										href='/word-unscrambler'
										className='block text-gray-700 hover:text-green-700 transition-colors'>
										Word Unscrambler
									</Link>
									<Link
										href='/rhyme-finder'
										className='block text-gray-700 hover:text-green-700 transition-colors'>
										Rhyme Finder
									</Link>
									<Link
										href='/scrabble-calculator'
										className='block text-gray-700 hover:text-green-700 transition-colors'>
										Scrabble Calculator
									</Link>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
