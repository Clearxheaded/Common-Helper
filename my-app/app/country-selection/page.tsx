"use client"

import { useRouter } from "next/navigation"
import { NavBar } from "@/components/nav-bar"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export default function CountrySelectionPage() {
  const router = useRouter()
  const [selectedSystem, setSelectedSystem] = useState("")

  const handleContinue = () => {
    router.push(`/document-upload?system=${selectedSystem}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar currentStep={1} />
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Select Your Country & Education System</h1>
            <p className="mt-2 text-gray-600">Help us understand your academic background</p>
          </div>
          <div className="space-y-6 rounded-lg bg-white p-6 shadow-lg">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="za">South Africa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Education System</label>
                <Select onValueChange={setSelectedSystem}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select education system" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a-levels">A-Levels</SelectItem>
                    <SelectItem value="matric">Matric</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="w-full" onClick={handleContinue} disabled={!selectedSystem}>
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

