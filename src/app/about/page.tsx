import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
	return (
		<div className='min-h-screen bg-gray-50 py-12'>
			<div className='container mx-auto px-4'>
				<div className='max-w-4xl mx-auto'>
					<h1 className='text-4xl font-bold text-center mb-8'>
						About WordFinder
					</h1>

					<Card className='mb-8'>
						<CardHeader>
							<CardTitle>Our Mission</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-lg leading-relaxed'>
								WordFinder is dedicated to helping word game
								enthusiasts improve their gameplay and expand
								their vocabulary. Our comprehensive suite of
								tools is designed to assist players of Scrabble,
								Words with Friends, and other popular word
								games.
							</p>
						</CardContent>
					</Card>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
						<Card>
							<CardHeader>
								<CardTitle>What We Offer</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className='space-y-2'>
									<li>• Advanced Word Finder tools</li>
									<li>• Anagram solvers</li>
									<li>• Word unscramblers</li>
									<li>• Crossword helpers</li>
									<li>• Grammar resources</li>
									<li>• Extensive word lists</li>
								</ul>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Why Choose Us</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className='space-y-2'>
									<li>• Fast and accurate results</li>
									<li>• Multiple dictionary support</li>
									<li>• User-friendly interface</li>
									<li>• Mobile-responsive design</li>
									<li>• Completely free to use</li>
									<li>• No registration required</li>
								</ul>
							</CardContent>
						</Card>
					</div>

					<Card>
						<CardHeader>
							<CardTitle>Our Story</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='leading-relaxed mb-4'>
								Founded by passionate word game players,
								WordFinder was created out of a desire to
								provide the best possible tools for fellow
								enthusiasts. We understand the frustration of
								having letters but not being able to find the
								perfect word, and we&apos;ve made it our mission
								to solve that problem.
							</p>
							<p className='leading-relaxed'>
								Our team continuously works to improve our
								algorithms and expand our database to ensure you
								have access to the most comprehensive
								word-finding tools available online.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
