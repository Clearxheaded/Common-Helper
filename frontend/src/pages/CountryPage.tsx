import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
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

  const educationSystems = {
    "South Africa": ["Matric", "A levels"],
    "United Kingdom": ["A levels"],
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
              <SelectItem value="South Africa">South Africa</SelectItem>
              <SelectItem value="United Kingdom">United Kingdom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {country && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Select Education System</h2>
            <Select onValueChange={setEducationSystem}>
              <SelectTrigger>
                <SelectValue placeholder="Select education system" />
              </SelectTrigger>
              <SelectContent>
                {educationSystems[country].map((system) => (
                  <SelectItem key={system} value={system}>
                    {system}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <Button 
          className="w-full"
          size="lg"
          disabled={!country || !educationSystem}
          onClick={() => navigate('/documents', { 
            state: { country, educationSystem } 
          })}
        >
          Continue
        </Button>
      </div>
    </div>
  )
} 