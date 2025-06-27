"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
	return (
		<div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white px-4'>
			<div className='bg-white rounded-xl shadow-lg p-10 border border-gray-100 flex flex-col items-center'>
				<AlertTriangle className='h-16 w-16 text-yellow-500 mb-4' />
				<h1 className='text-4xl font-bold text-gray-800 mb-2'>
					404 - Page Not Found
				</h1>
				<p className='text-lg text-gray-600 mb-6 text-center max-w-md'>
					Sorry, the page you are looking for does not exist or has
					been moved.
				</p>
				<Link href='/'>
					<Button className='bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full text-lg font-semibold shadow'>
						Go to Homepage
					</Button>
				</Link>
			</div>
		</div>
	);
}
