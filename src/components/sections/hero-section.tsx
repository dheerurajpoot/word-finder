"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

function Tooltip({ message }: { message: string }) {
	return (
		<span className='absolute z-10 left-1/2 -translate-x-1/2 bottom-full mb-2 w-max max-w-xs rounded bg-black text-white text-xs px-3 py-2 shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity pointer-events-none'>
			{message}
		</span>
	);
}

export function HeroSection() {
	const [letters, setLetters] = useState("");
	const [starts, setStarts] = useState("");
	const [ends, setEnds] = useState("");
	const [contains, setContains] = useState("");
	const [length, setLength] = useState("");
	const [dictionary, setDictionary] = useState("all");
	const router = useRouter();

	const handleSearch = () => {
		const params = new URLSearchParams();
		if (letters) params.set("letters", letters);
		if (starts) params.set("starts", starts);
		if (ends) params.set("ends", ends);
		if (contains) params.set("contains", contains);
		if (length) params.set("length", length);
		if (dictionary !== "all") params.set("dictionary", dictionary);

		router.push(`/search?${params.toString()}`);
	};

	return (
		<section className='bg-gradient-to-b from-green-400 to-green-500'>
			<div className='container mx-auto px-4 py-16'>
				<div className='text-center text-white mb-12'>
					<h1 className='text-5xl md:text-6xl font-bold mb-4'>
						Word Finder
					</h1>
					<p className='text-xl opacity-90'>
						Enter up to 3 wildcards (? or space)
					</p>
					<p className='text-lg opacity-80 mt-2'>
						Find the perfect words for Scrabble, Words with Friends,
						and more!
					</p>
				</div>

				<div className='max-w-2xl mx-auto'>
					<div className='relative mb-6'>
						<Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
						<Input
							type='text'
							placeholder='YOUR LETTERS'
							value={letters}
							onChange={(e) =>
								setLetters(e.target.value.toUpperCase())
							}
							className='pl-12 pr-10 h-14 text-lg text-center bg-white/95 border-0 rounded-full shadow-lg'
							aria-label='Enter your letters'
						/>
					</div>

					<Card className='bg-white/95 shadow-xl'>
						<CardContent className='p-6'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
								<div className='relative'>
									<Input
										type='text'
										placeholder='Starts'
										value={starts}
										onChange={(e) =>
											setStarts(e.target.value)
										}
										className='h-12 rounded-full border-gray-300 pr-10'
										aria-label='Starts with'
									/>
									<span className='absolute z-10 right-3 top-1/2 -translate-y-1/2 group cursor-pointer'>
										<Info className='w-4 h-4 text-gray-400' />
										<Tooltip message='Find words that start with these letters (AB → Able).' />
									</span>
								</div>
								<div className='relative'>
									<Input
										type='text'
										placeholder='Ends'
										value={ends}
										onChange={(e) =>
											setEnds(e.target.value)
										}
										className='h-12 rounded-full border-gray-300 pr-10'
										aria-label='Ends with'
									/>
									<span className='absolute z-10 right-3 top-1/2 -translate-y-1/2 group cursor-pointer'>
										<Info className='w-4 h-4 text-gray-400' />
										<Tooltip message='Find words that end with these letters (ING → Amazing).' />
									</span>
								</div>
								<div className='relative'>
									<Input
										type='text'
										placeholder='Contains'
										value={contains}
										onChange={(e) =>
											setContains(e.target.value)
										}
										className='h-12 rounded-full border-gray-300 pr-10'
										aria-label='Contains letters'
									/>
									<span className='absolute z-10 right-3 top-1/2 -translate-y-1/2 group cursor-pointer'>
										<Info className='w-4 h-4 text-gray-400' />
										<Tooltip message='Find words that contain these letters in order (ST → List).' />
									</span>
								</div>
								<div className='relative'>
									<Input
										type='number'
										placeholder='Length'
										value={length}
										onChange={(e) =>
											setLength(e.target.value)
										}
										className='h-12 rounded-full border-gray-300 pr-10'
										aria-label='Word length'
									/>
									<span className='absolute z-10 right-3 top-1/2 -translate-y-1/2 group cursor-pointer'>
										<Info className='w-4 h-4 text-gray-400' />
										<Tooltip message='Specify the exact word length.' />
									</span>
								</div>
							</div>

							<div className='mb-6 relative'>
								<Select
									value={dictionary}
									onValueChange={setDictionary}>
									<SelectTrigger
										className='h-12 rounded-full border-gray-300 pr-10'
										aria-label='Select dictionary'>
										<SelectValue placeholder='All Dictionaries' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='all'>
											All Dictionaries
										</SelectItem>
										<SelectItem value='scrabble-us'>
											Scrabble US
										</SelectItem>
										<SelectItem value='scrabble-uk'>
											Scrabble UK
										</SelectItem>
										<SelectItem value='words-with-friends'>
											Words With Friends
										</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<Button
								onClick={handleSearch}
								className='w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-full text-lg'
								aria-label='Search for words'>
								SEARCH
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
