"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Grid3X3, Search, RotateCcw, CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface WordleSuggestion {
  word: string
  score: number
  commonality: "high" | "medium" | "low"
}

export default function WordleHelperPage() {
  const [knownLetters, setKnownLetters] = useState(["", "", "", "", ""])
  const [wrongLetters, setWrongLetters] = useState("")
  const [wrongPositions, setWrongPositions] = useState(["", "", "", "", ""])
  const [suggestions, setSuggestions] = useState<WordleSuggestion[]>([])
  const [attempt, setAttempt] = useState(1)

  // Common 5-letter words for Wordle
  const wordleWords = [
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
    "CALIF",
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
    "CLIMB",
    "CLOCK",
    "CLOSE",
    "CLOUD",
    "COACH",
    "COAST",
    "COULD",
    "COUNT",
    "COURT",
    "COVER",
    "CRAFT",
    "CRASH",
    "CRAZY",
    "CREAM",
    "CRIME",
    "CROSS",
    "CROWD",
    "CROWN",
    "CRUDE",
    "CURVE",
    "CYCLE",
    "DAILY",
    "DANCE",
    "DATED",
    "DEALT",
    "DEATH",
    "DEBUT",
    "DELAY",
    "DEPTH",
    "DOING",
    "DOUBT",
    "DOZEN",
    "DRAFT",
    "DRAMA",
    "DRANK",
    "DRAWN",
    "DREAM",
    "DRESS",
    "DRILL",
    "DRINK",
    "DRIVE",
    "DROVE",
    "DYING",
    "EAGER",
    "EARLY",
    "EARTH",
    "EIGHT",
    "ELITE",
    "EMPTY",
    "ENEMY",
    "ENJOY",
    "ENTER",
    "ENTRY",
    "EQUAL",
    "ERROR",
    "EVENT",
    "EVERY",
    "EXACT",
    "EXIST",
    "EXTRA",
    "FAITH",
    "FALSE",
    "FAULT",
    "FIBER",
    "FIELD",
    "FIFTH",
    "FIFTY",
    "FIGHT",
    "FINAL",
    "FIRST",
    "FIXED",
    "FLASH",
    "FLEET",
    "FLOOR",
    "FLUID",
    "FOCUS",
    "FORCE",
    "FORTH",
    "FORTY",
    "FORUM",
    "FOUND",
    "FRAME",
    "FRANK",
    "FRAUD",
    "FRESH",
    "FRONT",
    "FRUIT",
    "FULLY",
    "FUNNY",
    "GIANT",
    "GIVEN",
    "GLASS",
    "GLOBE",
    "GOING",
    "GRACE",
    "GRADE",
    "GRAND",
    "GRANT",
    "GRASS",
    "GRAVE",
    "GREAT",
    "GREEN",
    "GROSS",
    "GROUP",
    "GROWN",
    "GUARD",
    "GUESS",
    "GUEST",
    "GUIDE",
    "HAPPY",
    "HARRY",
    "HEART",
    "HEAVY",
    "HENCE",
    "HENRY",
    "HORSE",
    "HOTEL",
    "HOUSE",
    "HUMAN",
    "IDEAL",
    "IMAGE",
    "INDEX",
    "INNER",
    "INPUT",
    "ISSUE",
    "JAPAN",
    "JIMMY",
    "JOINT",
    "JONES",
    "JUDGE",
    "KNOWN",
    "LABEL",
    "LARGE",
    "LASER",
    "LATER",
    "LAUGH",
    "LAYER",
    "LEARN",
    "LEASE",
    "LEAST",
    "LEAVE",
    "LEGAL",
    "LEVEL",
    "LEWIS",
    "LIGHT",
    "LIMIT",
    "LINKS",
    "LIVES",
    "LOCAL",
    "LOOSE",
    "LOWER",
    "LUCKY",
    "LUNCH",
    "LYING",
    "MAGIC",
    "MAJOR",
    "MAKER",
    "MARCH",
    "MARIA",
    "MATCH",
    "MAYBE",
    "MAYOR",
    "MEANT",
    "MEDIA",
    "METAL",
    "MIGHT",
    "MINOR",
    "MINUS",
    "MIXED",
    "MODEL",
    "MONEY",
    "MONTH",
    "MORAL",
    "MOTOR",
    "MOUNT",
    "MOUSE",
    "MOUTH",
    "MOVED",
    "MOVIE",
    "MUSIC",
    "NEEDS",
    "NEVER",
    "NEWLY",
    "NIGHT",
    "NOISE",
    "NORTH",
    "NOTED",
    "NOVEL",
    "NURSE",
    "OCCUR",
    "OCEAN",
    "OFFER",
    "OFTEN",
    "ORDER",
    "OTHER",
    "OUGHT",
    "PAINT",
    "PANEL",
    "PAPER",
    "PARTY",
    "PEACE",
    "PETER",
    "PHASE",
    "PHONE",
    "PHOTO",
    "PIANO",
    "PIECE",
    "PILOT",
    "PITCH",
    "PLACE",
    "PLAIN",
    "PLANE",
    "PLANT",
    "PLATE",
    "POINT",
    "POUND",
    "POWER",
    "PRESS",
    "PRICE",
    "PRIDE",
    "PRIME",
    "PRINT",
    "PRIOR",
    "PRIZE",
    "PROOF",
    "PROUD",
    "PROVE",
    "QUEEN",
    "QUICK",
    "QUIET",
    "QUITE",
    "RADIO",
    "RAISE",
    "RANGE",
    "RAPID",
    "RATIO",
    "REACH",
    "READY",
    "REALM",
    "REBEL",
    "REFER",
    "RELAX",
    "REPAY",
    "REPLY",
    "RIGHT",
    "RIGID",
    "RIVAL",
    "RIVER",
    "ROBIN",
    "ROGER",
    "ROMAN",
    "ROUGH",
    "ROUND",
    "ROUTE",
    "ROYAL",
    "RURAL",
    "SCALE",
    "SCENE",
    "SCOPE",
    "SCORE",
    "SENSE",
    "SERVE",
    "SETUP",
    "SEVEN",
    "SHALL",
    "SHAPE",
    "SHARE",
    "SHARP",
    "SHEET",
    "SHELF",
    "SHELL",
    "SHIFT",
    "SHINE",
    "SHIRT",
    "SHOCK",
    "SHOOT",
    "SHORT",
    "SHOWN",
    "SIGHT",
    "SILLY",
    "SINCE",
    "SIXTH",
    "SIXTY",
    "SIZED",
    "SKILL",
    "SLEEP",
    "SLIDE",
    "SMALL",
    "SMART",
    "SMILE",
    "SMITH",
    "SMOKE",
    "SOLID",
    "SOLVE",
    "SORRY",
    "SOUND",
    "SOUTH",
    "SPACE",
    "SPARE",
    "SPEAK",
    "SPEED",
    "SPEND",
    "SPENT",
    "SPLIT",
    "SPOKE",
    "SPORT",
    "STAFF",
    "STAGE",
    "STAKE",
    "STAND",
    "START",
    "STATE",
    "STEAM",
    "STEEL",
    "STEEP",
    "STEER",
    "STICK",
    "STILL",
    "STOCK",
    "STONE",
    "STOOD",
    "STORE",
    "STORM",
    "STORY",
    "STRIP",
    "STUCK",
    "STUDY",
    "STUFF",
    "STYLE",
    "SUGAR",
    "SUITE",
    "SUPER",
    "SWEET",
    "TABLE",
    "TAKEN",
    "TASTE",
    "TAXES",
    "TEACH",
    "TEAMS",
    "TEETH",
    "TERRY",
    "TEXAS",
    "THANK",
    "THEFT",
    "THEIR",
    "THEME",
    "THERE",
    "THESE",
    "THICK",
    "THING",
    "THINK",
    "THIRD",
    "THOSE",
    "THREE",
    "THREW",
    "THROW",
    "THUMB",
    "TIGHT",
    "TIRED",
    "TITLE",
    "TODAY",
    "TOPIC",
    "TOTAL",
    "TOUCH",
    "TOUGH",
    "TOWER",
    "TRACK",
    "TRADE",
    "TRAIN",
    "TREAT",
    "TREND",
    "TRIAL",
    "TRIBE",
    "TRICK",
    "TRIED",
    "TRIES",
    "TRUCK",
    "TRULY",
    "TRUNK",
    "TRUST",
    "TRUTH",
    "TWICE",
    "TWIST",
    "TYLER",
    "UNCLE",
    "UNDER",
    "UNDUE",
    "UNION",
    "UNITY",
    "UNTIL",
    "UPPER",
    "UPSET",
    "URBAN",
    "USAGE",
    "USUAL",
    "VALID",
    "VALUE",
    "VIDEO",
    "VIRUS",
    "VISIT",
    "VITAL",
    "VOCAL",
    "VOICE",
    "WASTE",
    "WATCH",
    "WATER",
    "WHEEL",
    "WHERE",
    "WHICH",
    "WHILE",
    "WHITE",
    "WHOLE",
    "WHOSE",
    "WOMAN",
    "WOMEN",
    "WORLD",
    "WORRY",
    "WORSE",
    "WORST",
    "WORTH",
    "WOULD",
    "WRITE",
    "WRONG",
    "WROTE",
    "YOUNG",
    "YOUTH",
  ]

  const getWordCommonality = (word: string): "high" | "medium" | "low" => {
    const commonWords = [
      "ABOUT",
      "AFTER",
      "AGAIN",
      "BEING",
      "COULD",
      "FIRST",
      "FOUND",
      "GREAT",
      "GROUP",
      "HOUSE",
      "LARGE",
      "LIGHT",
      "MIGHT",
      "NEVER",
      "OTHER",
      "PLACE",
      "RIGHT",
      "SMALL",
      "SOUND",
      "STILL",
      "THEIR",
      "THERE",
      "THESE",
      "THING",
      "THINK",
      "THREE",
      "WATER",
      "WHERE",
      "WHICH",
      "WHILE",
      "WORLD",
      "WOULD",
      "WRITE",
      "YOUNG",
    ]
    const mediumWords = [
      "ABOVE",
      "ADMIT",
      "ADULT",
      "AGENT",
      "AGREE",
      "ALIVE",
      "ALLOW",
      "ALONE",
      "ALONG",
      "ANGRY",
      "APART",
      "APPLY",
      "ARGUE",
      "ARRAY",
      "ASIDE",
      "AVOID",
      "AWAKE",
      "AWARE",
      "BASIC",
      "BEACH",
      "BEGIN",
      "BELOW",
      "BLACK",
      "BLANK",
      "BLIND",
      "BLOCK",
      "BLOOD",
      "BOARD",
      "BRAIN",
      "BRAND",
      "BRAVE",
      "BREAD",
      "BREAK",
      "BRING",
      "BROAD",
      "BROWN",
      "BUILD",
      "CARRY",
      "CATCH",
      "CAUSE",
      "CHAIN",
      "CHAIR",
      "CHARM",
      "CHART",
      "CHASE",
      "CHEAP",
      "CHECK",
      "CHEST",
      "CHIEF",
      "CHILD",
      "CHINA",
      "CIVIL",
      "CLAIM",
      "CLASS",
      "CLEAN",
      "CLEAR",
      "CLICK",
      "CLIMB",
      "CLOCK",
      "CLOSE",
      "CLOUD",
      "COACH",
      "COAST",
      "COUNT",
      "COURT",
      "COVER",
      "CRAFT",
      "CRASH",
      "CRAZY",
      "CREAM",
      "CRIME",
      "CROSS",
      "CROWD",
      "CROWN",
      "CURVE",
      "CYCLE",
      "DAILY",
      "DANCE",
      "DEATH",
      "DELAY",
      "DEPTH",
      "DOUBT",
      "DOZEN",
      "DRAFT",
      "DRAMA",
      "DREAM",
      "DRESS",
      "DRINK",
      "DRIVE",
      "EARLY",
      "EARTH",
      "EIGHT",
      "EMPTY",
      "ENEMY",
      "ENJOY",
      "ENTER",
      "ENTRY",
      "EQUAL",
      "ERROR",
      "EVENT",
      "EVERY",
      "EXACT",
      "EXIST",
      "EXTRA",
      "FAITH",
      "FALSE",
      "FAULT",
      "FIELD",
      "FIFTH",
      "FIFTY",
      "FIGHT",
      "FINAL",
      "FIXED",
      "FLASH",
      "FLOOR",
      "FOCUS",
      "FORCE",
      "FORTH",
      "FORTY",
      "FORUM",
      "FRAME",
      "FRANK",
      "FRESH",
      "FRONT",
      "FRUIT",
      "FULLY",
      "FUNNY",
      "GIVEN",
      "GLASS",
      "GLOBE",
      "GOING",
      "GRACE",
      "GRADE",
      "GRAND",
      "GRANT",
      "GRASS",
      "GRAVE",
      "GREEN",
      "GROSS",
      "GROWN",
      "GUARD",
      "GUESS",
      "GUEST",
      "GUIDE",
      "HAPPY",
      "HEART",
      "HEAVY",
      "HENCE",
      "HORSE",
      "HOTEL",
      "HUMAN",
      "IDEAL",
      "IMAGE",
      "INDEX",
      "INNER",
      "INPUT",
      "ISSUE",
      "JAPAN",
      "JOINT",
      "JUDGE",
      "KNOWN",
      "LABEL",
      "LASER",
      "LATER",
      "LAUGH",
      "LAYER",
      "LEARN",
      "LEASE",
      "LEAST",
      "LEAVE",
      "LEGAL",
      "LEVEL",
      "LEWIS",
      "LIMIT",
      "LINKS",
      "LIVES",
      "LOCAL",
      "LOOSE",
      "LOWER",
      "LUCKY",
      "LUNCH",
      "LYING",
      "MAGIC",
      "MAJOR",
      "MAKER",
      "MARCH",
      "MATCH",
      "MAYBE",
      "MAYOR",
      "MEANT",
      "MEDIA",
      "METAL",
      "MINOR",
      "MINUS",
      "MIXED",
      "MODEL",
      "MONEY",
      "MONTH",
      "MORAL",
      "MOTOR",
      "MOUNT",
      "MOUSE",
      "MOUTH",
      "MOVED",
      "MOVIE",
      "MUSIC",
      "NEEDS",
      "NEWLY",
      "NIGHT",
      "NOISE",
      "NORTH",
      "NOTED",
      "NOVEL",
      "NURSE",
      "OCCUR",
      "OCEAN",
      "OFFER",
      "OFTEN",
      "ORDER",
      "OUGHT",
      "PAINT",
      "PANEL",
      "PAPER",
      "PARTY",
      "PEACE",
      "PHASE",
      "PHONE",
      "PHOTO",
      "PIANO",
      "PIECE",
      "PILOT",
      "PITCH",
      "PLAIN",
      "PLANE",
      "PLANT",
      "PLATE",
      "POINT",
      "POUND",
      "POWER",
      "PRESS",
      "PRICE",
      "PRIDE",
      "PRIME",
      "PRINT",
      "PRIOR",
      "PRIZE",
      "PLATE",
      "POINT",
      "POUND",
      "POWER",
      "PRESS",
      "PRICE",
      "PRIDE",
      "PRIME",
      "PRINT",
      "PRIOR",
      "PRIZE",
      "PROOF",
      "PROUD",
      "PROVE",
      "QUEEN",
      "QUICK",
      "QUIET",
      "QUITE",
      "RADIO",
      "RAISE",
      "RANGE",
      "RAPID",
      "RATIO",
      "REACH",
      "READY",
      "REALM",
      "REBEL",
      "REFER",
      "RELAX",
      "REPAY",
      "REPLY",
      "RIGID",
      "RIVAL",
      "RIVER",
      "ROBIN",
      "ROGER",
      "ROMAN",
      "ROUGH",
      "ROUND",
      "ROUTE",
      "ROYAL",
      "RURAL",
      "SCALE",
      "SCENE",
      "SCOPE",
      "SCORE",
      "SENSE",
      "SERVE",
      "SETUP",
      "SEVEN",
      "SHALL",
      "SHAPE",
      "SHARE",
      "SHARP",
      "SHEET",
      "SHELF",
      "SHELL",
      "SHIFT",
      "SHINE",
      "SHIRT",
      "SHOCK",
      "SHOOT",
      "SHORT",
      "SHOWN",
      "SIGHT",
      "SILLY",
      "SINCE",
      "SIXTH",
      "SIXTY",
      "SIZED",
      "SKILL",
      "SLEEP",
      "SLIDE",
      "SMART",
      "SMILE",
      "SMITH",
      "SMOKE",
      "SOLID",
      "SOLVE",
      "SORRY",
      "SOUTH",
      "SPACE",
      "SPARE",
      "SPEAK",
      "SPEED",
      "SPEND",
      "SPENT",
      "SPLIT",
      "SPOKE",
      "SPORT",
      "STAFF",
      "STAGE",
      "STAKE",
      "STAND",
      "START",
      "STATE",
      "STEAM",
      "STEEL",
      "STEEP",
      "STEER",
      "STICK",
      "STOCK",
      "STONE",
      "STOOD",
      "STORE",
      "STORM",
      "STORY",
      "STRIP",
      "STUCK",
      "STUDY",
      "STUFF",
      "STYLE",
      "SUGAR",
      "SUITE",
      "SUPER",
      "SWEET",
      "TABLE",
      "TAKEN",
      "TASTE",
      "TAXES",
      "TEACH",
      "TEAMS",
      "TEETH",
      "TERRY",
      "TEXAS",
      "THANK",
      "THEFT",
      "THEME",
      "THICK",
      "TIRED",
      "TITLE",
      "TODAY",
      "TOPIC",
      "TOTAL",
      "TOUCH",
      "TOUGH",
      "TOWER",
      "TRACK",
      "TRADE",
      "TRAIN",
      "TREAT",
      "TREND",
      "TRIAL",
      "TRIBE",
      "TRICK",
      "TRIED",
      "TRIES",
      "TRUCK",
      "TRULY",
      "TRUNK",
      "TRUST",
      "TRUTH",
      "TWICE",
      "TWIST",
      "TYLER",
      "UNCLE",
      "UNDER",
      "UNDUE",
      "UNION",
      "UNITY",
      "UNTIL",
      "UPPER",
      "UPSET",
      "URBAN",
      "USAGE",
      "USUAL",
      "VALID",
      "VALUE",
      "VIDEO",
      "VIRUS",
      "VISIT",
      "VITAL",
      "VOCAL",
      "VOICE",
      "WASTE",
      "WATCH",
      "WHEEL",
      "WHOSE",
      "WOMAN",
      "WOMEN",
      "WORRY",
      "WORSE",
      "WORST",
      "WORTH",
      "WROTE",
    ]

    if (commonWords.includes(word)) return "high"
    if (mediumWords.includes(word)) return "medium"
    return "low"
  }

  const calculateWordScore = (word: string): number => {
    // Simple scoring based on letter frequency and commonality
    const letterScores: { [key: string]: number } = {
      E: 1,
      A: 1,
      R: 1,
      I: 1,
      O: 1,
      T: 1,
      N: 1,
      S: 1,
      L: 2,
      C: 2,
      U: 2,
      D: 2,
      P: 2,
      M: 2,
      H: 2,
      G: 2,
      B: 2,
      F: 2,
      Y: 2,
      W: 2,
      K: 2,
      V: 2,
      X: 3,
      Z: 3,
      J: 3,
      Q: 3,
    }

    let score = 0
    for (const letter of word) {
      score += letterScores[letter] || 1
    }

    // Bonus for common words
    const commonality = getWordCommonality(word)
    if (commonality === "high") score += 5
    else if (commonality === "medium") score += 2

    return score
  }

  const findSuggestions = () => {
    const filteredWords = wordleWords.filter((word) => {
      // Check known letters (green)
      for (let i = 0; i < 5; i++) {
        if (knownLetters[i] && word[i] !== knownLetters[i].toUpperCase()) {
          return false
        }
      }

      // Check wrong letters (gray)
      for (const letter of wrongLetters.toUpperCase()) {
        if (word.includes(letter)) {
          return false
        }
      }

      // Check wrong positions (yellow)
      for (let i = 0; i < 5; i++) {
        if (wrongPositions[i]) {
          const letter = wrongPositions[i].toUpperCase()
          if (word[i] === letter || !word.includes(letter)) {
            return false
          }
        }
      }

      return true
    })

    const suggestions: WordleSuggestion[] = filteredWords.map((word) => ({
      word,
      score: calculateWordScore(word),
      commonality: getWordCommonality(word),
    }))

    // Sort by score (higher is better)
    suggestions.sort((a, b) => b.score - a.score)
    setSuggestions(suggestions.slice(0, 20))
  }

  const resetAll = () => {
    setKnownLetters(["", "", "", "", ""])
    setWrongLetters("")
    setWrongPositions(["", "", "", "", ""])
    setSuggestions([])
    setAttempt(1)
  }

  const getCommonalityColor = (commonality: "high" | "medium" | "low") => {
    switch (commonality) {
      case "high":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-red-100 text-red-800"
    }
  }

  const getCommonalityIcon = (commonality: "high" | "medium" | "low") => {
    switch (commonality) {
      case "high":
        return <CheckCircle className="h-4 w-4" />
      case "medium":
        return <AlertCircle className="h-4 w-4" />
      case "low":
        return <XCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                <Grid3X3 className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Wordle Helper</h1>
            <p className="text-xl text-gray-600 mb-2">Get the best word suggestions for your Wordle puzzle</p>
            <p className="text-gray-500">Enter what you know and get smart recommendations</p>
          </div>

          {/* Input Section */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Attempt #{attempt}</span>
                <Button onClick={() => setAttempt(attempt + 1)} variant="outline" size="sm">
                  Next Attempt
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              {/* Known Letters (Green) */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <CheckCircle className="inline h-4 w-4 text-green-600 mr-1" />
                  Known Letters (Green - Correct Position)
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {knownLetters.map((letter, index) => (
                    <Input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={letter}
                      onChange={(e) => {
                        const newKnown = [...knownLetters]
                        newKnown[index] = e.target.value.toUpperCase()
                        setKnownLetters(newKnown)
                      }}
                      className="h-12 text-center text-lg font-bold bg-green-50 border-green-300"
                      placeholder={`${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Wrong Positions (Yellow) */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <AlertCircle className="inline h-4 w-4 text-yellow-600 mr-1" />
                  Wrong Position Letters (Yellow - In Word, Wrong Spot)
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {wrongPositions.map((letter, index) => (
                    <Input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={letter}
                      onChange={(e) => {
                        const newWrong = [...wrongPositions]
                        newWrong[index] = e.target.value.toUpperCase()
                        setWrongPositions(newWrong)
                      }}
                      className="h-12 text-center text-lg font-bold bg-yellow-50 border-yellow-300"
                      placeholder={`${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Wrong Letters (Gray) */}
              <div className="mb-6">
                <label htmlFor="wrongLetters" className="block text-sm font-medium text-gray-700 mb-3">
                  <XCircle className="inline h-4 w-4 text-red-600 mr-1" />
                  Wrong Letters (Gray - Not in Word)
                </label>
                <Input
                  id="wrongLetters"
                  type="text"
                  value={wrongLetters}
                  onChange={(e) => setWrongLetters(e.target.value.toUpperCase())}
                  className="h-12 text-lg bg-red-50 border-red-300"
                  placeholder="Enter letters not in the word (e.g., QWRTY)"
                />
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={findSuggestions}
                  className="flex-1 h-12 bg-green-500 hover:bg-green-600 text-white font-semibold"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Find Suggestions
                </Button>
                <Button onClick={resetAll} variant="outline" className="h-12 px-6">
                  <RotateCcw className="h-5 w-5 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <Card className="mb-8 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <CardTitle className="flex items-center justify-between">
                  <span>Word Suggestions</span>
                  <Badge variant="secondary" className="bg-white text-green-600">
                    {suggestions.length} options
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-green-300 hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-xl text-gray-800 group-hover:text-green-600 transition-colors font-mono">
                          {suggestion.word}
                        </span>
                        <div className="text-sm text-gray-500">#{index + 1}</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge className={getCommonalityColor(suggestion.commonality)} variant="secondary">
                          <span className="flex items-center gap-1">
                            {getCommonalityIcon(suggestion.commonality)}
                            {suggestion.commonality}
                          </span>
                        </Badge>
                        <div className="text-sm text-gray-500">{suggestion.score} pts</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tips and Strategy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Grid3X3 className="h-5 w-5 text-green-600" />
                  Wordle Strategy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Best Starting Words</h4>
                    <div className="flex flex-wrap gap-2">
                      {["ADIEU", "AUDIO", "AROSE", "RAISE", "SLATE"].map((word) => (
                        <Badge key={word} variant="outline" className="font-mono">
                          {word}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Letter Frequency</h4>
                    <p className="text-sm text-gray-600">
                      Most common: E, A, R, I, O, T, N, S<br />
                      Least common: Q, X, Z, J
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  How to Use
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-xs mt-0.5">
                      1
                    </div>
                    <div className="text-sm">
                      <strong>Green:</strong> Enter letters in correct positions
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 font-bold text-xs mt-0.5">
                      2
                    </div>
                    <div className="text-sm">
                      <strong>Yellow:</strong> Enter letters in wrong positions
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-xs mt-0.5">
                      3
                    </div>
                    <div className="text-sm">
                      <strong>Gray:</strong> Enter letters not in the word
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs mt-0.5">
                      4
                    </div>
                    <div className="text-sm">Get ranked suggestions based on probability</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
