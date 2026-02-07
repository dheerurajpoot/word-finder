"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function WordsWithLettersPage({
	params,
}: {
	params: Promise<{ letters: string }>;
}) {
	const { letters } = React.use(params);
	const router = useRouter();

	useEffect(() => {
		// Redirect to the words-by-length structure with a default length of 5
		// Users can then filter by length if needed
		router.replace(
			`/words-by-length/5-letter-words?contains=${letters.toUpperCase()}`
		);
	}, [letters, router]);

	return (
		<div className='min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center'>
			<div className='text-center'>
				<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4'></div>
				<p className='text-gray-600'>
					Redirecting to words containing &quot;
					{letters.toUpperCase()}&quot;...
				</p>
			</div>
			<div className='bg-white border border-gray-300 rounded-xl p-8 mb-4 shadow flex flex-col gap-2'>
				<h1 className='text-4xl font-bold mb-2'>Words with {letters.toUpperCase()}</h1>
				<p className='mb-2'><span className='font-bold'>Words with {letters.toUpperCase()}</span> are commonly used for word games like Scrabble and Words with Friends. This list will help you to find the top scoring words to beat the opponent. You can also find a list of all <Link href={`/words-start-with/${letters.toUpperCase()}`} className='text-blue-600 hover:underline'>words that start with {letters.toUpperCase()}</Link> and <Link href={`/words-ending-in/${letters.toUpperCase()}`} className='text-blue-600 hover:underline'>words that end with {letters.toUpperCase()}</Link>. Try our <Link href={`/words-by-length/5/with/${letters.toUpperCase()}`} className='text-blue-600 hover:underline'>five letter words with {letters.toUpperCase()} page</Link> if you&apos;re playing Wordle-like games or use the <Link href="/wordle-helper" className='text-blue-600 hover:underline'>New York Times Wordle Solver</Link> to quickly find the NYT Wordle daily answer.</p>
			</div>
		</div>
	);
}
