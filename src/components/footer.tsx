import Link from "next/link";
import {
	Facebook,
	Twitter,
	Instagram,
	Youtube,
	Mail,
	Phone,
} from "lucide-react";

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className='bg-gray-900 text-white'>
			{/* Main Footer Content */}
			<div className='container mx-auto px-4 py-12'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
					{/* Company Info */}
					<div className='space-y-4'>
						<div className='flex items-center space-x-2'>
							<div className='text-2xl font-bold text-green-400'>
								W
							</div>
							<span className='text-xl font-semibold'>
								FindWordFinder
							</span>
						</div>
						<p className='text-gray-300 text-sm leading-relaxed'>
							Your ultimate destination for word games, puzzles,
							and vocabulary enhancement. Find the perfect words
							for Scrabble, Words with Friends, and more.
						</p>
						<div className='flex space-x-4'>
							<Link
								href='#'
								className='text-gray-400 hover:text-green-400 transition-colors'>
								<Facebook className='h-5 w-5' />
							</Link>
							<Link
								href='#'
								className='text-gray-400 hover:text-green-400 transition-colors'>
								<Twitter className='h-5 w-5' />
							</Link>
							<Link
								href='#'
								className='text-gray-400 hover:text-green-400 transition-colors'>
								<Instagram className='h-5 w-5' />
							</Link>
							<Link
								href='#'
								className='text-gray-400 hover:text-green-400 transition-colors'>
								<Youtube className='h-5 w-5' />
							</Link>
						</div>
					</div>

					{/* Word Tools */}
					<div className='space-y-4'>
						<h3 className='text-lg font-semibold text-green-400'>
							Word Tools
						</h3>
						<ul className='space-y-2'>
							<li>
								<Link
									href='/'
									className='text-gray-300 hover:text-white transition-colors text-sm'>
									Word Finder
								</Link>
							</li>
							<li>
								<Link
									href='/anagram-solver'
									className='text-gray-300 hover:text-white transition-colors text-sm'>
									Anagram Solver
								</Link>
							</li>
							<li>
								<Link
									href='/word-unscrambler'
									className='text-gray-300 hover:text-white transition-colors text-sm'>
									Word Unscrambler
								</Link>
							</li>
							<li>
								<Link
									href='/crossword-solver'
									className='text-gray-300 hover:text-white transition-colors text-sm'>
									Crossword Solver
								</Link>
							</li>
							<li>
								<Link
									href='/rhyme-finder'
									className='text-gray-300 hover:text-white transition-colors text-sm'>
									Rhyme Finder
								</Link>
							</li>
							<li>
								<Link
									href='/scrabble-calculator'
									className='text-gray-300 hover:text-white transition-colors text-sm'>
									Scrabble Calculator
								</Link>
							</li>
						</ul>
					</div>

					{/* Resources */}
					<div className='space-y-4'>
						<h3 className='text-lg font-semibold text-green-400'>
							Resources
						</h3>
						<ul className='space-y-2'>
							<li>
								<Link
									href='/word-lists'
									className='text-gray-300 hover:text-white transition-colors text-sm'>
									Word Lists
								</Link>
							</li>
							<li>
								<Link
									href='/grammar'
									className='text-gray-300 hover:text-white transition-colors text-sm'>
									Grammar Guide
								</Link>
							</li>
							<li>
								<Link
									href='/blog'
									className='text-gray-300 hover:text-white transition-colors text-sm'>
									Word Game Tips
								</Link>
							</li>
							<li>
								<Link
									href='/scrabble-words'
									className='text-gray-300 hover:text-white transition-colors text-sm'>
									Scrabble Words
								</Link>
							</li>
							<li>
								<Link
									href='/wordle-helper'
									className='text-gray-300 hover:text-white transition-colors text-sm'>
									Wordle Helper
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact & Support */}
					<div className='space-y-4'>
						<h3 className='text-lg font-semibold text-green-400'>
							Support
						</h3>
						<ul className='space-y-2'>
							<li>
								<Link
									href='/about'
									className='text-gray-300 hover:text-white transition-colors text-sm'>
									About Us
								</Link>
							</li>
							<li>
								<Link
									href='/contact'
									className='text-gray-300 hover:text-white transition-colors text-sm'>
									Contact
								</Link>
							</li>
							<li>
								<Link
									href='/privacy'
									className='text-gray-300 hover:text-white transition-colors text-sm'>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									href='/terms'
									className='text-gray-300 hover:text-white transition-colors text-sm'>
									Terms of Service
								</Link>
							</li>
						</ul>

						<div className='space-y-2 pt-4'>
							<div className='flex items-center gap-2 text-gray-300 text-sm'>
								<Mail className='h-4 w-4' />
								<span>support@FindWordFinder.com</span>
							</div>
							<div className='flex items-center gap-2 text-gray-300 text-sm'>
								<Phone className='h-4 w-4' />
								<span>+1 (555) 123-4567</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Bar */}
			<div className='border-t border-gray-800'>
				<div className='container mx-auto px-4 py-6'>
					<div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
						<div className='text-gray-400 text-sm'>
							© {currentYear} FindWordFinder. All rights reserved.
						</div>
						<div className='flex items-center space-x-6 text-sm'>
							<Link
								href='/sitemap'
								className='text-gray-400 hover:text-white transition-colors'>
								Sitemap
							</Link>
							<Link
								href='/cookies'
								className='text-gray-400 hover:text-white transition-colors'>
								Cookie Policy
							</Link>
							<div className='text-gray-400'>
								Made with ❤️ by
								<Link href='https://www.dheeru.org'>
									&nbsp; Dheeru Rajpoot
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
