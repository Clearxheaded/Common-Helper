import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gradient-to-b from-blue-50 via-blue-50/50 to-white">
        <div className="container mx-auto flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Breaking Down Educational Barriers
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-gray-600">
            Helping international students translate their academic achievements for American universities
          </p>
          <Link href="/sign-in">
            <Button size="lg" className="bg-blue-600 text-lg hover:bg-blue-700">
              Get Started
            </Button>
          </Link>
        </div>
      </div>

      {/* About Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">About Us</h2>
          <p className="mb-8 text-lg text-gray-600">
            We understand the challenges international students face when applying to American schools. Our mission is
            to simplify the process by providing accurate translations of academic records and helping students
            understand how their achievements align with American educational standards.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-xl font-semibold">Document Translation</h3>
              <p className="text-gray-600">Accurate conversion of international academic records</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-xl font-semibold">GPA Calculation</h3>
              <p className="text-gray-600">Fair and standardized GPA conversion system</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-xl font-semibold">Course Analysis</h3>
              <p className="text-gray-600">Detailed comparison with AP course equivalents</p>
            </div>
          </div>
          <Link href="/sign-in" className="mt-12 inline-block">
            <Button size="lg" className="text-lg">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

