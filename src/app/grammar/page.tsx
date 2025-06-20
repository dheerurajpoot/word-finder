import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function GrammarPage() {
  const grammarTopics = [
    {
      title: "Parts of Speech",
      description: "Learn about nouns, verbs, adjectives, adverbs, and more",
      topics: ["Nouns", "Verbs", "Adjectives", "Adverbs", "Prepositions"],
    },
    {
      title: "Sentence Structure",
      description: "Understanding how to build proper sentences",
      topics: ["Subject and Predicate", "Clauses", "Phrases", "Complex Sentences"],
    },
    {
      title: "Punctuation",
      description: "Master the art of proper punctuation",
      topics: ["Commas", "Semicolons", "Apostrophes", "Quotation Marks"],
    },
    {
      title: "Common Mistakes",
      description: "Avoid these frequent grammar errors",
      topics: ["Your vs You're", "There vs Their", "Its vs It's", "Affect vs Effect"],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Grammar Guide</h1>
          <p className="text-xl text-center text-gray-600 mb-12">
            Improve your writing with our comprehensive grammar resources
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {grammarTopics.map((topic, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-green-700">{topic.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{topic.description}</p>
                  <div className="space-y-2">
                    {topic.topics.map((subtopic, subIndex) => (
                      <Link
                        key={subIndex}
                        href={`/grammar/${subtopic.toLowerCase().replace(/\s+/g, "-")}`}
                        className="block text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        • {subtopic}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Quick Grammar Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Writing Tips</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Keep sentences concise and clear</li>
                    <li>• Use active voice when possible</li>
                    <li>• Vary your sentence structure</li>
                    <li>• Proofread your work carefully</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Common Rules</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Subject and verb must agree</li>
                    <li>• Use parallel structure in lists</li>
                    <li>• Place modifiers near what they modify</li>
                    <li>• End sentences with proper punctuation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
