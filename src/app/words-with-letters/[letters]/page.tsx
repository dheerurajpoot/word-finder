"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

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
		</div>
	);
}
