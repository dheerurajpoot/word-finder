"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { WordSearchFilter } from "@/components/WordSearchFilter";
import { Badge } from "@/components/ui/badge";
import { WordDetailsDialog } from "@/components/word-details-dialog";
import axios from "axios";

export default function WordsByLengthEndingWithPage({
	params,
}: {
	params: { length: string; letter: string };
}) {
	const { length, letter } = params;
	const [words, setWords] = useState<string[]>([]);
	const [filteredWords, setFilteredWords] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);

	const getNumberFromLength = (lengthParam: string): number => {
		const match = lengthParam.match(/(\d+)/);
		return match ? Number.parseInt(match[1]) : 2;
	};
	const wordLength = getNumberFromLength(length);

	useEffect(() => {
		const fetchWords = async () => {
			setLoading(true);
			if (!wordLength || !letter) {
				setWords([]);
				setFilteredWords([]);
				setLoading(false);
				return;
			}
			const pattern = `${"?".repeat(wordLength - 1)}${letter}`;
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
	}, [wordLength, letter]);

	const handleSearch = (params: Record<string, string>) => {
		let filtered = words;
		if (params.letters) {
			filtered = filtered.filter((word) =>
				params.letters.split("").every((char) => word.includes(char))
			);
		}
		if (params.starts) {
			filtered = filtered.filter((word) =>
				word.startsWith(params.starts)
			);
		}
		if (params.ends) {
			filtered = filtered.filter((word) => word.endsWith(params.ends));
		}
		if (params.contains) {
			filtered = filtered.filter((word) =>
				word.includes(params.contains)
			);
		}
		setFilteredWords(filtered);
	};

	return (
		<div className='min-h-screen bg-gradient-to-b from-gray-50 to-white py-8'>
			<div className='container mx-auto px-4'>
				<WordSearchFilter
					defaultValues={{
						ends: letter.toUpperCase(),
						length: length,
					}}
					showLength={true}
					showDictionary={false}
					onSearch={handleSearch}
				/>

				<div className='bg-white rounded-xl shadow-lg p-8 border border-gray-100 mt-8'>
					<h1 className='text-2xl font-bold mb-4'>
						Words with {length} letters ending in "
						{letter.toUpperCase()}"
					</h1>
					{loading ? (
						<p className='text-gray-500'>Loading...</p>
					) : filteredWords.length === 0 ? (
						<p className='text-gray-500'>No words found.</p>
					) : (
						<div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3'>
							{filteredWords.map((word, idx) => (
								<WordDetailsDialog key={idx} word={word}>
									<Badge
										variant='secondary'
										className='justify-center py-2 px-3 text-sm hover:bg-green-100 hover:text-green-700 cursor-pointer font-mono transition-colors duration-200 border border-gray-200'>
										{word}
									</Badge>
								</WordDetailsDialog>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
