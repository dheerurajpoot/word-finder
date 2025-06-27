"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Trophy, BookOpen, Target } from "lucide-react";
import Link from "next/link";
import { WordDetailsDialog } from "@/components/word-details-dialog";
import React from "react";

export default function WordsByLengthPage({
	params,
}: {
	params: Promise<{ length: string }>;
}) {
	const { length } = React.use(params);
	const [words, setWords] = useState<string[]>([]);
	const [filteredWords, setFilteredWords] = useState<string[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [showMore, setShowMore] = useState(false);
	const [sortBy, setSortBy] = useState("points");
	const [selectedDictionary, setSelectedDictionary] = useState("all");

	// Extract number from URL parameter
	const getNumberFromLength = (lengthParam: string): number => {
		const match = lengthParam.match(/(\d+)/);
		return match ? Number.parseInt(match[1]) : 2;
	};

	const wordLength = getNumberFromLength(length);

	const lengthData = {
		2: {
			title: "2 Letter Words",
			description:
				"Two-letter words. Settle down, breathe in and relax. We need your QI settled for this amazing new world of two lettered words! Words containing two letters can be so exciting and can get you raving around like a mighty ox! Make sure you check out our guide to Words with two letters; Two letter words, to get the upper hand on your Scrabble and Words with Friends opponents! Check out these useful lists too:",
			words: [
				"JA",
				"JO",
				"QI",
				"ZA",
				"XU",
				"AX",
				"EX",
				"OX",
				"XI",
				"MM",
				"BY",
				"HM",
				"MY",
				"VU",
				"FU",
				"KA",
				"KI",
				"MU",
				"OK",
				"UM",
				"UP",
				"AB",
				"AM",
				"AW",
				"BA",
				"BE",
				"BI",
				"BO",
				"EF",
				"EM",
				"EW",
				"FA",
				"FE",
				"FI",
				"IF",
				"MA",
				"ME",
				"MI",
				"MO",
				"OF",
				"OM",
				"OP",
				"OW",
				"PA",
				"PE",
				"PI",
				"PO",
				"UH",
				"WE",
				"WO",
				"AG",
				"AH",
				"AY",
				"EH",
				"GI",
				"GO",
				"HA",
				"HE",
				"HI",
				"HO",
				"NU",
				"OH",
				"OY",
				"SH",
				"UN",
				"YA",
				"YE",
				"YI",
				"YO",
				"AD",
				"AI",
				"AN",
				"DA",
				"DE",
				"DO",
				"ED",
				"EL",
				"EN",
				"ID",
				"IN",
				"LA",
				"LI",
				"LO",
				"NA",
				"NE",
				"NO",
				"OD",
				"ON",
				"OU",
				"US",
				"UT",
				"AA",
				"AE",
				"AI",
				"AR",
				"AS",
				"AT",
				"EE",
				"EO",
			],
			highestScoringWord: {
				word: "JA",
				points: 11,
				definition: "Interjection: yes",
				abbreviation: "Jamaica (international vehicle registration)",
			},
			commonWords: ["TO", "IN", "OF"],
			strategy:
				"Two letter words can also turn a four-point word of all one-point letters into a 20-point play or more when you can hook three or four tiles at once. Even if you have the misfortune of having a fistful of vowels that don't include the O, the E, or both, you can still play these tiles by making either QI or ZA.",
		},
		3: {
			title: "3 Letter Words",
			description:
				"Three-letter words are the foundation of word games. These short but powerful combinations can help you score big points and clear your rack efficiently. Master these essential 3-letter words to dominate in Scrabble and Words with Friends!",
			words: [
				"THE",
				"AND",
				"FOR",
				"ARE",
				"BUT",
				"NOT",
				"YOU",
				"ALL",
				"CAN",
				"HER",
				"WAS",
				"ONE",
				"OUR",
				"HAD",
				"DAY",
				"GET",
				"HAS",
				"HIM",
				"HIS",
				"HOW",
				"ITS",
				"MAY",
				"NEW",
				"NOW",
				"OLD",
				"SEE",
				"TWO",
				"WHO",
				"BOY",
				"DID",
				"END",
				"FEW",
				"GOT",
				"LET",
				"MAN",
				"PUT",
				"SAY",
				"SHE",
				"TOO",
				"USE",
				"WAY",
				"WIN",
				"YES",
				"YET",
				"BAD",
				"BAG",
				"BED",
				"BIG",
				"BOX",
				"BUS",
				"CAR",
				"CAT",
				"CUP",
				"CUT",
				"DOG",
				"EAR",
				"EGG",
				"EYE",
				"FAR",
				"FUN",
				"GOD",
				"GUN",
				"HAT",
				"HIT",
				"HOT",
				"JOB",
				"LAW",
				"LEG",
				"LOT",
				"LOW",
				"MAP",
				"MOM",
				"NET",
				"OIL",
				"PEN",
				"PET",
				"PIG",
				"POT",
				"RED",
				"RUN",
				"SAD",
				"SEA",
				"SIT",
				"SIX",
				"SUN",
				"TAX",
				"TEA",
				"TEN",
				"TOP",
				"TRY",
				"VAN",
				"WAR",
				"WET",
				"ZOO",
				"ACE",
				"AGE",
				"AID",
				"AIM",
				"AIR",
				"ART",
			],
			highestScoringWord: {
				word: "ZAX",
				points: 19,
				definition: "A tool for cutting roof slates",
				abbreviation: "Roofing tool",
			},
			commonWords: ["THE", "AND", "FOR"],
			strategy:
				"Three-letter words are incredibly versatile for parallel plays and hooks. Look for opportunities to play words like QUA, ZEA, and other high-value combinations.",
		},
		4: {
			title: "4 Letter Words",
			description:
				"Four-letter words offer the perfect balance of scoring potential and rack management. These words are essential for creating multiple word combinations and maximizing your points per turn.",
			words: [
				"THAT",
				"WITH",
				"HAVE",
				"THIS",
				"WILL",
				"YOUR",
				"FROM",
				"THEY",
				"KNOW",
				"WANT",
				"BEEN",
				"GOOD",
				"MUCH",
				"SOME",
				"TIME",
				"VERY",
				"WHEN",
				"COME",
				"HERE",
				"JUST",
				"LIKE",
				"LONG",
				"MAKE",
				"MANY",
				"OVER",
				"SUCH",
				"TAKE",
				"THAN",
				"THEM",
				"WELL",
				"WERE",
				"WHAT",
				"YEAR",
				"WORK",
				"BACK",
				"CALL",
				"CAME",
				"EACH",
				"EVEN",
				"FIND",
				"GIVE",
				"HAND",
				"HIGH",
				"KEEP",
				"LAST",
				"LEFT",
				"LIFE",
				"LIVE",
				"LOOK",
				"MADE",
				"MOST",
				"MOVE",
				"MUST",
				"NAME",
				"NEED",
				"NEXT",
				"ONLY",
				"OPEN",
				"PART",
				"PLAY",
				"SAID",
				"SAME",
				"SEEM",
				"SHOW",
				"SIDE",
				"TELL",
				"TURN",
				"USED",
				"WAYS",
				"WEEK",
				"WENT",
				"WORD",
				"ABLE",
				"AREA",
				"AWAY",
				"BEST",
				"BOTH",
				"CASE",
				"DOES",
				"DOWN",
				"FACT",
				"FEEL",
				"FORM",
				"FULL",
				"GAME",
				"HELP",
				"HOME",
				"IDEA",
				"INTO",
				"KIND",
				"LAND",
				"LATE",
				"LINE",
				"MEAN",
				"MORE",
				"MOVE",
				"NEWS",
				"ONLY",
				"OVER",
				"PART",
			],
			highestScoringWord: {
				word: "QUIZ",
				points: 22,
				definition: "A test of knowledge",
				abbreviation: "Knowledge test",
			},
			commonWords: ["THAT", "WITH", "HAVE"],
			strategy:
				"Four-letter words are excellent for using premium squares effectively. Words ending in -ING, -ED, or -ER can often be extended for bonus points.",
		},
		5: {
			title: "5 Letter Words",
			description:
				"Five-letter words are the sweet spot for word games, offering excellent scoring opportunities while maintaining good rack balance. These words are perfect for Wordle practice too!",
			words: [
				"ABOUT",
				"ABOVE",
				"ABUSE",
				"ACTOR",
				"ACUTE",
				"ADMIT",
				"ADOPT",
				"ADULT",
				"AFTER",
				"AGAIN",
				"AGENT",
				"AGREE",
				"AHEAD",
				"ALARM",
				"ALBUM",
				"ALERT",
				"ALIEN",
				"ALIGN",
				"ALIKE",
				"ALIVE",
				"ALLOW",
				"ALONE",
				"ALONG",
				"ALTER",
				"ANGEL",
				"ANGER",
				"ANGLE",
				"ANGRY",
				"APART",
				"APPLE",
				"APPLY",
				"ARENA",
				"ARGUE",
				"ARISE",
				"ARRAY",
				"ASIDE",
				"ASSET",
				"AVOID",
				"AWAKE",
				"AWARD",
				"AWARE",
				"BADLY",
				"BAKER",
				"BASES",
				"BASIC",
				"BEACH",
				"BEGAN",
				"BEGIN",
				"BEING",
				"BELOW",
				"BENCH",
				"BILLY",
				"BIRTH",
				"BLACK",
				"BLAME",
				"BLANK",
				"BLIND",
				"BLOCK",
				"BLOOD",
				"BOARD",
				"BOOST",
				"BOOTH",
				"BOUND",
				"BRAIN",
				"BRAND",
				"BRAVE",
				"BREAD",
				"BREAK",
				"BREED",
				"BRIEF",
				"BRING",
				"BROAD",
				"BROKE",
				"BROWN",
				"BUILD",
				"BUILT",
				"BUYER",
				"CABLE",
				"CARRY",
				"CATCH",
				"CAUSE",
				"CHAIN",
				"CHAIR",
				"CHAOS",
				"CHARM",
				"CHART",
				"CHASE",
				"CHEAP",
				"CHECK",
				"CHEST",
				"CHIEF",
				"CHILD",
				"CHINA",
				"CHOSE",
				"CIVIL",
				"CLAIM",
				"CLASS",
				"CLEAN",
				"CLEAR",
				"CLICK",
			],
			highestScoringWord: {
				word: "JAZZY",
				points: 34,
				definition: "Having the characteristics of jazz music",
				abbreviation: "Jazz-like",
			},
			commonWords: ["ABOUT", "ABOVE", "AFTER"],
			strategy:
				"Five-letter words are perfect for bingo plays when you have seven tiles. Look for common prefixes and suffixes to maximize your scoring potential.",
		},
		6: {
			title: "6 Letter Words",
			description:
				"Six-letter words provide excellent opportunities for high-scoring plays and effective rack management. These words often use common letter combinations and patterns.",
			words: [
				"ACCEPT",
				"ACCESS",
				"ACROSS",
				"ACTION",
				"ACTIVE",
				"ACTUAL",
				"ADVICE",
				"AFFECT",
				"AFFORD",
				"AFRAID",
				"AGENCY",
				"AGENDA",
				"ALMOST",
				"ALWAYS",
				"AMOUNT",
				"ANIMAL",
				"ANNUAL",
				"ANSWER",
				"ANYONE",
				"ANYWAY",
				"APPEAR",
				"AROUND",
				"ARRIVE",
				"ARTIST",
				"ASSUME",
				"ATTACK",
				"AUGUST",
				"AUTHOR",
				"AVENUE",
				"BACKED",
				"BARELY",
				"BATTLE",
				"BEAUTY",
				"BECAME",
				"BECOME",
				"BEFORE",
				"BEHALF",
				"BEHAVE",
				"BEHIND",
				"BELIEF",
				"BELONG",
				"BESIDE",
				"BETTER",
				"BEYOND",
				"BISHOP",
				"BORDER",
				"BOTTLE",
				"BOTTOM",
				"BOUGHT",
				"BRANCH",
				"BREATH",
				"BRIDGE",
				"BRIGHT",
				"BROKEN",
				"BUDGET",
				"BURDEN",
				"BUREAU",
				"BUTTON",
				"CAMERA",
				"CANCER",
				"CANNOT",
				"CANVAS",
				"CAREER",
				"CASTLE",
				"CASUAL",
				"CAUGHT",
				"CAUSED",
				"CENTER",
				"CENTRE",
				"CHANCE",
				"CHANGE",
				"CHARGE",
				"CHOICE",
				"CHOOSE",
				"CHOSEN",
				"CHURCH",
				"CIRCLE",
				"CLIENT",
				"CLOSED",
				"CLOSER",
				"COFFEE",
				"COLUMN",
				"COMBAT",
				"COMING",
				"COMMIT",
				"COMMON",
				"COMPLY",
				"COPPER",
				"CORNER",
				"COSTLY",
				"COUNTY",
				"COUPLE",
				"COURSE",
				"COVERS",
				"CREATE",
				"CREDIT",
				"CRISIS",
				"CUSTOM",
				"DAMAGE",
				"DANGER",
			],
			highestScoringWord: {
				word: "ZYGOTE",
				points: 19,
				definition: "A fertilized egg cell",
				abbreviation: "Fertilized cell",
			},
			commonWords: ["ACCEPT", "ACCESS", "ACROSS"],
			strategy:
				"Six-letter words are great for using all seven tiles with one letter already on the board. Focus on words with common endings like -ING, -TION, or -ABLE.",
		},
		7: {
			title: "7 Letter Words",
			description:
				"Seven-letter words are the holy grail of word games - they give you the coveted 50-point bingo bonus! Master these words to dramatically improve your scoring.",
			words: [
				"ABILITY",
				"ABSENCE",
				"ACADEMY",
				"ACCOUNT",
				"ACCUSED",
				"ACHIEVE",
				"ACQUIRE",
				"ADDRESS",
				"ADVANCE",
				"ADVISER",
				"AGAINST",
				"AIRPORT",
				"ALREADY",
				"ANOTHER",
				"ANXIETY",
				"ANXIOUS",
				"ANYBODY",
				"ANYMORE",
				"APPLIED",
				"APPROVE",
				"ARRANGE",
				"ARTICLE",
				"ASSAULT",
				"ATTEMPT",
				"ATTRACT",
				"AUCTION",
				"AVERAGE",
				"BALANCE",
				"BANKING",
				"BATTERY",
				"BEDROOM",
				"BENEFIT",
				"BETWEEN",
				"BICYCLE",
				"BIOLOGY",
				"BROTHER",
				"BROUGHT",
				"BUILDER",
				"BURNING",
				"BUSINESS",
				"CABINET",
				"CALCIUM",
				"CALIBER",
				"CALLING",
				"CAPABLE",
				"CAPITAL",
				"CAPTAIN",
				"CAPTURE",
				"CAREFUL",
				"CARRIER",
				"CATALOG",
				"CEILING",
				"CENTRAL",
				"CENTURY",
				"CERTAIN",
				"CHAMBER",
				"CHANNEL",
				"CHAPTER",
				"CHARITY",
				"CHICKEN",
				"CIRCUIT",
				"CITIZEN",
				"CLASSIC",
				"CLIMATE",
				"CLOSING",
				"CLOTHES",
				"COATING",
				"COLLEGE",
				"COMBINE",
				"COMFORT",
				"COMMAND",
				"COMMENT",
				"COMPANY",
				"COMPARE",
				"COMPETE",
				"COMPLEX",
				"CONCEPT",
				"CONCERN",
				"CONDUCT",
				"CONFIRM",
				"CONNECT",
				"CONSIST",
				"CONTACT",
				"CONTAIN",
				"CONTENT",
				"CONTEST",
				"CONTEXT",
				"CONTROL",
				"CONVERT",
				"COOKING",
				"CORRECT",
				"COUNCIL",
				"COUNTER",
				"COUNTRY",
				"COURAGE",
				"COVERED",
				"CRYSTAL",
				"CULTURE",
				"CURRENT",
				"CUTTING",
			],
			highestScoringWord: {
				word: "ZYMURGY",
				points: 26,
				definition: "The study of fermentation",
				abbreviation: "Fermentation study",
			},
			commonWords: ["ABILITY", "ABSENCE", "ACADEMY"],
			strategy:
				"Seven-letter words give you a 50-point bonus! Study common letter patterns and practice anagramming to spot these valuable plays quickly.",
		},
		8: {
			title: "8 Letter Words",
			description:
				"Eight-letter words represent the ultimate challenge in word games. These powerful combinations can create massive scoring opportunities when played strategically.",
			words: [
				"ABSOLUTE",
				"ABSTRACT",
				"ACADEMIC",
				"ACCEPTED",
				"ACCIDENT",
				"ACCURATE",
				"ACHIEVED",
				"ACQUIRED",
				"ACTIVITY",
				"ACTUALLY",
				"ADDITION",
				"ADEQUATE",
				"ADJACENT",
				"ADVANCED",
				"ADVISORY",
				"ADVOCATE",
				"AFFECTED",
				"AIRCRAFT",
				"ALLIANCE",
				"ALTHOUGH",
				"ANALYSIS",
				"ANNOUNCE",
				"ANNUALLY",
				"ANSWERED",
				"ANYWHERE",
				"APPARENT",
				"APPROACH",
				"APPROVAL",
				"ARGUMENT",
				"ARRANGED",
				"ASSEMBLY",
				"ASSIGNED",
				"ASSUMING",
				"ATTACHED",
				"ATTORNEY",
				"AUDIENCE",
				"AUTHORITY",
				"AVAILABLE",
				"BACHELOR",
				"BACKGROUND",
				"BALANCED",
				"BASEBALL",
				"BATHROOM",
				"BEAUTIFUL",
				"BECOMING",
				"BEHAVIOR",
				"BELIEVED",
				"BIRTHDAY",
				"BOUNDARY",
				"BREAKFAST",
				"BUILDING",
				"BUSINESS",
				"CALENDAR",
				"CAMPAIGN",
				"CAPACITY",
				"CATEGORY",
				"CHAIRMAN",
				"CHAMPION",
				"CHEMICAL",
				"CHILDREN",
				"CHOCOLATE",
				"CHRISTMAS",
				"CIGARETTE",
				"CIRCULAR",
				"CIVILIAN",
				"CLASSIFY",
				"CLEARING",
				"CLIMBING",
				"CLOTHING",
				"COACHING",
				"COLONIAL",
				"COLORFUL",
				"COMBINED",
				"COMMERCE",
				"COMMONLY",
				"COMMUNITY",
				"COMPLETE",
				"COMPUTER",
				"CONCLUDE",
				"CONCRETE",
				"CONFUSED",
				"CONGRESS",
				"CONSIDER",
				"CONSTANT",
				"CONSUMER",
				"CONTINUE",
				"CONTRACT",
				"CONTRARY",
				"CONTRAST",
				"CONVINCE",
				"CORRIDOR",
				"COVERAGE",
				"CREATIVE",
				"CRIMINAL",
				"CRITICAL",
				"CROSSING",
				"CULTURAL",
				"CUSTOMER",
				"DATABASE",
				"DAUGHTER",
			],
			highestScoringWord: {
				word: "ZYZZYVAS",
				points: 44,
				definition: "Plural of zyzzyva, a type of weevil",
				abbreviation: "Tropical weevils",
			},
			commonWords: ["ABSOLUTE", "ABSTRACT", "ACADEMIC"],
			strategy:
				"Eight-letter words are rare but incredibly valuable. They often require using existing letters on the board and can create multiple new words simultaneously.",
		},
	};

	const currentData =
		lengthData[wordLength as keyof typeof lengthData] || lengthData[2];

	useEffect(() => {
		setWords(currentData.words);
		setFilteredWords(currentData.words);
	}, [wordLength]);

	useEffect(() => {
		let filtered = words;
		if (searchTerm) {
			filtered = words.filter((word) =>
				word.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		// Sort words
		if (sortBy === "points") {
			filtered.sort((a, b) => calculateScore(b) - calculateScore(a));
		} else if (sortBy === "a-z") {
			filtered.sort();
		} else if (sortBy === "z-a") {
			filtered.sort().reverse();
		}

		setFilteredWords(filtered);
	}, [searchTerm, words, sortBy]);

	const calculateScore = (word: string): number => {
		const letterScores: { [key: string]: number } = {
			a: 1,
			b: 3,
			c: 3,
			d: 2,
			e: 1,
			f: 4,
			g: 2,
			h: 4,
			i: 1,
			j: 8,
			k: 5,
			l: 1,
			m: 3,
			n: 1,
			o: 1,
			p: 3,
			q: 10,
			r: 1,
			s: 1,
			t: 1,
			u: 1,
			v: 4,
			w: 4,
			x: 8,
			y: 4,
			z: 10,
		};
		return word
			.toLowerCase()
			.split("")
			.reduce((score, letter) => score + (letterScores[letter] || 0), 0);
	};

	const displayWords = showMore ? filteredWords : filteredWords.slice(0, 50);
	const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

	const sidebarSections = {
		wordFinder: [
			"Word Finder",
			"Anagram Solver",
			"Word Descrambler",
			"Word Unscrambler",
			"Crossword Solver",
			"Word Generator",
			"Rhyme Finder",
			"Scrabble Score Calculator Finder",
		],
		wordsByLength: [
			"2 Letter Words",
			"3 Letter Words",
			"4 Letter Words",
			"5 Letter Words",
			"6 Letter Words",
			"7 Letter Words",
			"8 Letter Words",
		],
	};

	return (
		<div className='min-h-screen bg-gradient-to-b from-gray-50 to-white'>
			<div className='container mx-auto px-4 py-8'>
				<div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
					{/* Main Content */}
					<div className='lg:col-span-3 space-y-8'>
						{/* Header */}
						<div className='bg-white rounded-xl shadow-lg p-8 border border-gray-100'>
							<h1 className='text-4xl font-bold text-gray-800 mb-4'>
								{currentData.title}
							</h1>
							<p className='text-gray-700 leading-relaxed mb-4'>
								{currentData.description}
							</p>
							<div className='flex gap-2 text-sm'>
								<Link
									href='/5-letter-words'
									className='text-blue-600 hover:underline'>
									Five letter words
								</Link>
								<span className='text-gray-400'>and</span>
								<Link
									href='/4-letter-words'
									className='text-blue-600 hover:underline'>
									four letter words
								</Link>
							</div>
						</div>
						{/* Words Grid */}
						<div className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100'>
							<div className='bg-gradient-to-r from-green-400 to-green-500 text-white px-6 py-4'>
								<h2 className='text-2xl font-bold'>
									{currentData.title}
								</h2>
							</div>
							<div className='p-6'>
								<div className='grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3 mb-6'>
									{displayWords.map((word, index) => (
										<WordDetailsDialog
											key={index}
											word={word}>
											<Badge
												variant='secondary'
												className='justify-center py-2 px-3 text-sm hover:bg-green-100 hover:text-green-700 cursor-pointer font-mono transition-colors duration-200 border border-gray-200'>
												{word}
											</Badge>
										</WordDetailsDialog>
									))}
								</div>

								{filteredWords.length > 50 && !showMore && (
									<div className='text-center'>
										<Button
											onClick={() => setShowMore(true)}
											className='bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold px-8 py-3 rounded-lg'>
											MORE
										</Button>
									</div>
								)}
							</div>
						</div>
						{/* Highest Scoring Word */}
						<div className='bg-white rounded-xl shadow-lg p-8 border border-gray-100'>
							<h2 className='text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2'>
								<Trophy className='h-6 w-6 text-yellow-500' />
								What is the highest scoring word in Words With
								Friends that has {wordLength} letters?
							</h2>
							<p className='text-gray-700 mb-4'>
								The highest scoring word in Words With Friends
								that has {wordLength} letters is{" "}
								<strong className='text-blue-600'>
									{currentData.highestScoringWord.word}
								</strong>{" "}
								with a total of{" "}
								<strong>
									{currentData.highestScoringWord.points}{" "}
									points
								</strong>
								.
							</p>

							<div className='flex gap-4 mb-4'>
								{currentData.highestScoringWord.word
									.split("")
									.map((letter, index) => (
										<div
											key={index}
											className='w-12 h-12 bg-yellow-100 border-2 border-yellow-400 rounded flex items-center justify-center font-bold text-lg'>
											{letter}
										</div>
									))}
							</div>

							<div className='space-y-2'>
								<div>
									<strong>Interjection:</strong>
									<ul className='ml-4 mt-1'>
										<li>
											{
												currentData.highestScoringWord
													.definition
											}
										</li>
									</ul>
								</div>
								<div>
									<strong>Abbreviation:</strong>
									<ul className='ml-4 mt-1'>
										<li>
											{
												currentData.highestScoringWord
													.abbreviation
											}
										</li>
									</ul>
								</div>
							</div>
						</div>

						{/* Starting With */}
						<div className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100'>
							<div className='bg-gradient-to-r from-green-400 to-green-500 text-white px-6 py-4'>
								<h2 className='text-xl font-bold'>
									{currentData.title} starting with
								</h2>
							</div>
							<div className='p-6'>
								<div className='grid grid-cols-6 md:grid-cols-8 lg:grid-cols-13 gap-2'>
									{alphabet.map((letter) => (
										<Link
											key={letter}
											href={`/${wordLength}-letter-words-starting-with-${letter}`}
											className='w-10 h-10 bg-gray-100 hover:bg-green-100 border border-gray-300 rounded flex items-center justify-center font-medium text-gray-700 hover:text-green-700 transition-colors duration-200'>
											{letter}
										</Link>
									))}
								</div>
							</div>
						</div>

						{/* Ending In */}
						<div className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100'>
							<div className='bg-gradient-to-r from-green-400 to-green-500 text-white px-6 py-4'>
								<h2 className='text-xl font-bold'>
									{currentData.title} ending in
								</h2>
							</div>
							<div className='p-6'>
								<div className='grid grid-cols-6 md:grid-cols-8 lg:grid-cols-13 gap-2'>
									{alphabet.map((letter) => (
										<Link
											key={letter}
											href={`/${wordLength}-letter-words-ending-in-${letter}`}
											className='w-10 h-10 bg-gray-100 hover:bg-green-100 border border-gray-300 rounded flex items-center justify-center font-medium text-gray-700 hover:text-green-700 transition-colors duration-200'>
											{letter}
										</Link>
									))}
								</div>
							</div>
						</div>
						{/* Words With */}
						<div className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100'>
							<div className='bg-gradient-to-r from-green-400 to-green-500 text-white px-6 py-4'>
								<h2 className='text-xl font-bold'>
									{currentData.title} with
								</h2>
							</div>
							<div className='p-6'>
								<div className='grid grid-cols-6 md:grid-cols-8 lg:grid-cols-13 gap-2'>
									{alphabet.map((letter) => (
										<Link
											key={letter}
											href={`/${wordLength}-letter-words-with-${letter}`}
											className='w-10 h-10 bg-gray-100 hover:bg-green-100 border border-gray-300 rounded flex items-center justify-center font-medium text-gray-700 hover:text-green-700 transition-colors duration-200'>
											{letter}
										</Link>
									))}
								</div>
							</div>
						</div>

						<div className='bg-white rounded-xl shadow-lg p-8 border border-gray-100'>
							<h2 className='text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2'>
								<Target className='h-6 w-6 text-blue-500' />
								Most Common {currentData.title}
							</h2>
							<p className='text-gray-700 mb-4'>
								The most common {wordLength}-letter words are{" "}
								{currentData.commonWords.map((word, index) => (
									<span key={word}>
										<strong className='text-blue-600'>
											{word}
										</strong>
										{index <
											currentData.commonWords.length -
												1 && ", "}
									</span>
								))}
								.
							</p>

							<h3 className='text-xl font-bold text-gray-800 mb-3'>
								More {currentData.title} Strategy
							</h3>
							<p className='text-gray-700 leading-relaxed'>
								{currentData.strategy}
							</p>
						</div>
						{/* FAQ Section */}
						<div className='bg-white rounded-xl shadow-lg p-8 border border-gray-100'>
							<h2 className='text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2'>
								<BookOpen className='h-6 w-6 text-purple-500' />
								{currentData.title} FAQ
							</h2>

							<div className='space-y-4'>
								<div>
									<h3 className='font-bold text-gray-800 mb-2'>
										How many {wordLength} letter words are
										there?
									</h3>
									<p className='text-gray-700'>
										There are approximately{" "}
										{currentData.words.length}+ common{" "}
										{wordLength}-letter words in the English
										language that are accepted in word games
										like Scrabble and Words with Friends.
									</p>
								</div>

								<div>
									<h3 className='font-bold text-gray-800 mb-2'>
										What are the best {wordLength}-letter
										words for Scrabble?
									</h3>
									<p className='text-gray-700'>
										The best {wordLength}-letter words for
										Scrabble are those with high-value
										letters like Q, X, Z, and J. Words like{" "}
										{currentData.highestScoringWord.word}{" "}
										can score{" "}
										{currentData.highestScoringWord.points}{" "}
										points or more.
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Sidebar */}
					<div className='lg:col-span-1 space-y-6'>
						{/* Search Form */}
						<div className='bg-white rounded-xl shadow-lg p-6 border border-gray-100'>
							<div className='space-y-4'>
								<Input
									placeholder='YOUR LETTERS'
									value={searchTerm}
									onChange={(e) =>
										setSearchTerm(e.target.value)
									}
									className='w-full'
								/>
								<div className='grid grid-cols-2 gap-2'>
									<Input
										placeholder='Starts'
										className='text-sm'
									/>
									<Input
										placeholder='Ends'
										className='text-sm'
									/>
								</div>
								<div className='grid grid-cols-2 gap-2'>
									<Input
										placeholder='Contains'
										className='text-sm'
									/>
									<Select
										defaultValue={wordLength.toString()}>
										<SelectTrigger className='text-sm'>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='2'>2</SelectItem>
											<SelectItem value='3'>3</SelectItem>
											<SelectItem value='4'>4</SelectItem>
											<SelectItem value='5'>5</SelectItem>
											<SelectItem value='6'>6</SelectItem>
											<SelectItem value='7'>7</SelectItem>
											<SelectItem value='8'>8</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<Button className='w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold'>
									SEARCH
								</Button>
							</div>
						</div>

						{/* Sort Results */}
						<div className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100'>
							<div className='bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-3'>
								<h3 className='font-bold'>Sort Results</h3>
							</div>
							<div className='p-4 space-y-2'>
								<label className='flex items-center gap-2 cursor-pointer'>
									<input
										type='radio'
										name='sort'
										value='points'
										checked={sortBy === "points"}
										onChange={(e) =>
											setSortBy(e.target.value)
										}
										className='text-green-500'
									/>
									<span className='text-sm'>Points</span>
								</label>
								<label className='flex items-center gap-2 cursor-pointer'>
									<input
										type='radio'
										name='sort'
										value='a-z'
										checked={sortBy === "a-z"}
										onChange={(e) =>
											setSortBy(e.target.value)
										}
										className='text-green-500'
									/>
									<span className='text-sm'>A-Z</span>
								</label>
								<label className='flex items-center gap-2 cursor-pointer'>
									<input
										type='radio'
										name='sort'
										value='z-a'
										checked={sortBy === "z-a"}
										onChange={(e) =>
											setSortBy(e.target.value)
										}
										className='text-green-500'
									/>
									<span className='text-sm'>Z-A</span>
								</label>
							</div>
						</div>

						{/* Dictionary */}
						<div className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100'>
							<div className='bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-3'>
								<h3 className='font-bold'>Dictionary</h3>
							</div>
							<div className='p-4 space-y-2'>
								<label className='flex items-center gap-2 cursor-pointer'>
									<input
										type='radio'
										name='dictionary'
										value='words-with-friends'
										checked={
											selectedDictionary ===
											"words-with-friends"
										}
										onChange={(e) =>
											setSelectedDictionary(
												e.target.value
											)
										}
										className='text-green-500'
									/>
									<span className='text-sm'>
										Words With Friends
									</span>
								</label>
								<label className='flex items-center gap-2 cursor-pointer'>
									<input
										type='radio'
										name='dictionary'
										value='scrabble-us'
										checked={
											selectedDictionary === "scrabble-us"
										}
										onChange={(e) =>
											setSelectedDictionary(
												e.target.value
											)
										}
										className='text-green-500'
									/>
									<span className='text-sm'>Scrabble US</span>
								</label>
								<label className='flex items-center gap-2 cursor-pointer'>
									<input
										type='radio'
										name='dictionary'
										value='scrabble-uk'
										checked={
											selectedDictionary === "scrabble-uk"
										}
										onChange={(e) =>
											setSelectedDictionary(
												e.target.value
											)
										}
										className='text-green-500'
									/>
									<span className='text-sm'>Scrabble UK</span>
								</label>
								<label className='flex items-center gap-2 cursor-pointer'>
									<input
										type='radio'
										name='dictionary'
										value='all'
										checked={selectedDictionary === "all"}
										onChange={(e) =>
											setSelectedDictionary(
												e.target.value
											)
										}
										className='text-green-500'
									/>
									<span className='text-sm'>
										All Dictionaries
									</span>
								</label>
							</div>
						</div>

						{/* Word Finder Tools */}
						<div className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100'>
							<div className='bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-3'>
								<h3 className='font-bold'>Word Finder</h3>
							</div>
							<div className='p-4 space-y-1'>
								{sidebarSections.wordFinder.map(
									(tool, index) => (
										<Link
											key={index}
											href={`/${tool
												.toLowerCase()
												.replace(/\s+/g, "-")}`}
											className='block text-sm text-gray-700 hover:text-green-600 hover:bg-green-50 py-1 px-2 rounded transition-colors duration-200'>
											{tool}
										</Link>
									)
								)}
							</div>
						</div>

						{/* Grammar */}
						<div className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100'>
							<div className='bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-3'>
								<h3 className='font-bold'>Grammar</h3>
							</div>
							<div className='p-4 space-y-1'>
								<Link
									href='/grammar-rules'
									className='block text-sm text-gray-700 hover:text-green-600 hover:bg-green-50 py-1 px-2 rounded transition-colors duration-200'>
									Grammar Rules And Examples
								</Link>
								<Link
									href='/scrabble-dictionary'
									className='block text-sm text-gray-700 hover:text-green-600 hover:bg-green-50 py-1 px-2 rounded transition-colors duration-200'>
									Scrabble Dictionary
								</Link>
							</div>
						</div>

						{/* Words by Length */}
						<div className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100'>
							<div className='bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-3'>
								<h3 className='font-bold'>Words by Length</h3>
							</div>
							<div className='p-4 space-y-1'>
								{sidebarSections.wordsByLength.map(
									(category, index) => (
										<Link
											key={index}
											href={`/words-by-length/${
												index + 2
											}-letter-words`}
											className='block text-sm text-gray-700 hover:text-green-600 hover:bg-green-50 py-1 px-2 rounded transition-colors duration-200'>
											{category}
										</Link>
									)
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
