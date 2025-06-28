"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WordsStartWithLetterPage({
	params,
}: {
	params: Promise<{ letter: string }>;
}) {
	const { letter } = React.use(params);
	const router = useRouter();

	useEffect(() => {
		// Redirect to the words-by-length structure with a default length of 5
		// Users can then filter by length if needed
		router.replace(
			`/words-by-length/5-letter-words?starts=${letter.toUpperCase()}`
		);
	}, [letter, router]);

	return (
		<div className='min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center'>
			<div className='text-center'>
				<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4'></div>
				<p className='text-gray-600'>
					Redirecting to words starting with &quot;
					{letter.toUpperCase()}
					&quot;...
				</p>
			</div>
		</div>
	);
}
