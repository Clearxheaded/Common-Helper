import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { supabaseService } from "@/services/supabaseService"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function CountryPage() {
  const navigate = useNavigate()
  const [country, setCountry] = useState("")
  const [educationSystem, setEducationSystem] = useState("")
  const [error, setError] = useState<string | null>(null)

  const educationSystems = {
    "South Africa": ["matric", "a-levels"],
    "United Kingdom": ["a-levels"],
    "United States": [],
    "Canada": [],
    "Australia": [],
    "New Zealand": [],
    "India": [],
    "Nigeria": [],
    "Kenya": [],
    "Zimbabwe": [],
  }

  const handleContinue = async () => {
    if (country !== "South Africa" && country !== "United Kingdom") {
      setError("This country is not supported yet. Please select South Africa or United Kingdom.")
      return
    }

    try {
      await supabaseService.saveSelection(country, educationSystem)
      navigate('/documents', { 
        state: { country, educationSystem } 
      })
    } catch (err) {
      setError(err.message)
      console.error('Failed to save selection:', err)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-xl mx-auto space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Select Your Country</h2>
          <Select onValueChange={setCountry}>
            <SelectTrigger>
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(educationSystems).map((countryName) => (
                <SelectItem key={countryName} value={countryName}>
                  {countryName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {(country === "South Africa" || country === "United Kingdom") && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Select Education System</h2>
            <Select onValueChange={setEducationSystem}>
              <SelectTrigger>
                <SelectValue placeholder="Select education system" />
              </SelectTrigger>
              <SelectContent>
                {educationSystems[country].map((system) => (
                  <SelectItem key={system} value={system}>
                    {system === 'matric' ? 'Matric' : 'A-Levels'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <Button 
          className="w-full"
          size="lg"
          disabled={!country || (!educationSystem && (country === "South Africa" || country === "United Kingdom"))}
          onClick={handleContinue}
        >
          Continue
        </Button>
        {error && (
          <div className="mt-4 text-red-500">{error}</div>
        )}
      </div>
    </div>
  )
} 