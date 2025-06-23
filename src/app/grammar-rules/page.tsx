"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, CheckCircle, AlertCircle, Lightbulb } from "lucide-react"

export default function GrammarRulesPage() {
  const grammarRules = [
    {
      category: "Punctuation",
      icon: "📝",
      rules: [
        {
          title: "Comma Usage",
          rule: "Use commas to separate items in a series",
          correct: "I bought apples, oranges, and bananas.",
          incorrect: "I bought apples oranges and bananas.",
          explanation: "The Oxford comma (before 'and') is optional but recommended for clarity.",
        },
        {
          title: "Apostrophes",
          rule: "Use apostrophes for contractions and possessives",
          correct: "It's John's book.",
          incorrect: "Its Johns book.",
          explanation: "It's = it is, Its = possessive form of it",
        },
      ],
    },
    {
      category: "Subject-Verb Agreement",
      icon: "🤝",
      rules: [
        {
          title: "Singular and Plural",
          rule: "Singular subjects take singular verbs, plural subjects take plural verbs",
          correct: "The cat runs. The cats run.",
          incorrect: "The cat run. The cats runs.",
          explanation: "The verb must match the number of the subject.",
        },
        {
          title: "Collective Nouns",
          rule: "Collective nouns can be singular or plural depending on context",
          correct: "The team is winning. The team are arguing among themselves.",
          incorrect: "The team are winning when acting as one unit.",
          explanation: "Use singular when the group acts as one, plural when members act individually.",
        },
      ],
    },
    {
      category: "Commonly Confused Words",
      icon: "🤔",
      rules: [
        {
          title: "Your vs You're",
          rule: "Your = possessive, You're = you are",
          correct: "Your book is here. You're welcome.",
          incorrect: "You're book is here. Your welcome.",
          explanation: "If you can substitute 'you are', use you're.",
        },
        {
          title: "There, Their, They're",
          rule: "There = place, Their = possessive, They're = they are",
          correct: "There is their car. They're leaving.",
          incorrect: "Their is there car. There leaving.",
          explanation: "Three different words with different meanings and uses.",
        },
      ],
    },
  ]

  const quickTips = [
    {
      tip: "Read your writing aloud",
      description: "This helps catch errors and awkward phrasing",
      icon: "🗣️",
    },
    {
      tip: "Use active voice when possible",
      description: "Active voice is clearer and more engaging",
      icon: "⚡",
    },
    {
      tip: "Keep sentences concise",
      description: "Shorter sentences are easier to understand",
      icon: "✂️",
    },
    {
      tip: "Proofread multiple times",
      description: "Check for different types of errors in each pass",
      icon: "🔍",
    },
  ]

  const commonMistakes = [
    {
      mistake: "Could of, Should of, Would of",
      correction: "Could have, Should have, Would have",
      explanation: "The contraction sounds like 'of' but it's actually 'have'",
    },
    {
      mistake: "Alot",
      correction: "A lot",
      explanation: "'Alot' is not a word. Use 'a lot' (two words) or 'many'",
    },
    {
      mistake: "Loose vs Lose",
      correction: "Loose = not tight, Lose = to misplace",
      explanation: "Different spellings for different meanings",
    },
    {
      mistake: "Affect vs Effect",
      correction: "Affect = verb (to influence), Effect = noun (result)",
      explanation: "Remember: Affect is an Action, Effect is an End result",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="h-8 w-8 text-green-500" />
                <h1 className="text-4xl font-bold text-gray-800">Grammar Rules & Examples</h1>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Master the fundamentals of English grammar with clear rules, examples, and explanations. Whether you're
                a student, professional, or language learner, these comprehensive grammar guidelines will help you write
                with confidence and clarity.
              </p>
            </div>

            {/* Grammar Rules by Category */}
            {grammarRules.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="shadow-lg border border-gray-100">
                <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-xl">
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">{category.icon}</span>
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {category.rules.map((rule, ruleIndex) => (
                      <div key={ruleIndex} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">{rule.title}</h3>
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                          <p className="text-blue-800 font-medium">{rule.rule}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle className="h-5 w-5 text-green-600" />
                              <span className="font-semibold text-green-800">Correct</span>
                            </div>
                            <p className="text-green-700 italic">"{rule.correct}"</p>
                          </div>

                          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                            <div className="flex items-center gap-2 mb-2">
                              <AlertCircle className="h-5 w-5 text-red-600" />
                              <span className="font-semibold text-red-800">Incorrect</span>
                            </div>
                            <p className="text-red-700 italic">"{rule.incorrect}"</p>
                          </div>
                        </div>

                        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Lightbulb className="h-5 w-5 text-yellow-600" />
                            <span className="font-semibold text-yellow-800">Explanation</span>
                          </div>
                          <p className="text-yellow-700">{rule.explanation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Common Mistakes */}
            <Card className="shadow-lg border border-gray-100">
              <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-xl">
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Common Grammar Mistakes
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {commonMistakes.map((mistake, index) => (
                    <div key={index} className="bg-red-50 rounded-lg p-4 border border-red-200">
                      <div className="mb-3">
                        <Badge className="bg-red-500 text-white mb-2">Mistake</Badge>
                        <p className="text-red-800 font-medium line-through">{mistake.mistake}</p>
                      </div>
                      <div className="mb-3">
                        <Badge className="bg-green-500 text-white mb-2">Correction</Badge>
                        <p className="text-green-800 font-medium">{mistake.correction}</p>
                      </div>
                      <div>
                        <Badge className="bg-blue-500 text-white mb-2">Why</Badge>
                        <p className="text-blue-800 text-sm">{mistake.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Tips */}
            <Card className="shadow-lg border border-gray-100">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-xl">
                <CardTitle>Writing Tips</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {quickTips.map((tip, index) => (
                    <div key={index} className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{tip.icon}</span>
                        <h4 className="font-semibold text-blue-800">{tip.tip}</h4>
                      </div>
                      <p className="text-blue-700 text-sm">{tip.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Grammar Categories */}
            <Card className="shadow-lg border border-gray-100">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-xl">
                <CardTitle>Grammar Topics</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <Link
                    href="/grammar/parts-of-speech"
                    className="block text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 text-sm py-2 px-3 rounded-lg border-l-4 border-gray-200 hover:border-purple-400"
                  >
                    Parts of Speech
                  </Link>
                  <Link
                    href="/grammar/sentence-structure"
                    className="block text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 text-sm py-2 px-3 rounded-lg border-l-4 border-gray-200 hover:border-purple-400"
                  >
                    Sentence Structure
                  </Link>
                  <Link
                    href="/grammar/punctuation"
                    className="block text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 text-sm py-2 px-3 rounded-lg border-l-4 border-gray-200 hover:border-purple-400"
                  >
                    Punctuation Rules
                  </Link>
                  <Link
                    href="/grammar/verb-tenses"
                    className="block text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 text-sm py-2 px-3 rounded-lg border-l-4 border-gray-200 hover:border-purple-400"
                  >
                    Verb Tenses
                  </Link>
                  <Link
                    href="/misspellings"
                    className="block text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 text-sm py-2 px-3 rounded-lg border-l-4 border-gray-200 hover:border-purple-400"
                  >
                    Common Misspellings
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card className="shadow-lg border border-gray-100">
              <CardHeader className="bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-t-xl">
                <CardTitle>Additional Resources</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3 text-sm">
                  <div className="bg-teal-50 rounded-lg p-3">
                    <h4 className="font-semibold text-teal-800 mb-1">Style Guides</h4>
                    <p className="text-teal-700">AP, MLA, Chicago, and APA formatting</p>
                  </div>
                  <div className="bg-teal-50 rounded-lg p-3">
                    <h4 className="font-semibold text-teal-800 mb-1">Practice Exercises</h4>
                    <p className="text-teal-700">Interactive grammar quizzes and tests</p>
                  </div>
                  <div className="bg-teal-50 rounded-lg p-3">
                    <h4 className="font-semibold text-teal-800 mb-1">Writing Tools</h4>
                    <p className="text-teal-700">Grammar checkers and proofreading tips</p>
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
