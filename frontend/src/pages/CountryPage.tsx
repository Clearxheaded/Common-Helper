import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { supabaseService } from "@/services/supabaseService"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Globe, GraduationCap, ChevronRight, AlertCircle } from "lucide-react"

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
      const formattedSystem = educationSystem.toLowerCase().replace(' ', '-')
      await supabaseService.saveSelection(country, formattedSystem)
      navigate('/documents', { 
        state: { 
          country, 
          educationSystem: formattedSystem
        } 
      })
    } catch (err) {
      setError(err.message)
      console.error('Failed to save selection:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-xl mx-auto space-y-10">
          {/* Header Section */}
          <div className="text-center space-y-6">
            <div className="inline-block p-2 bg-primary/10 rounded-full mb-4">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-4xl font-bold tracking-tight">
              Select Your Location
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
              Choose your country and education system to get started with your grade conversion
            </p>
          </div>

          {/* Selection Cards */}
          <Card className="p-8 space-y-8 border-2 transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
            {/* Country Selection */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Select Your Country</h3>
              </div>
              <Select onValueChange={setCountry}>
                <SelectTrigger className="w-full h-12 text-left font-medium border-2 transition-colors hover:border-primary/50">
                  <SelectValue placeholder="Choose a country" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {Object.keys(educationSystems).map((countryName) => (
                    <SelectItem 
                      key={countryName} 
                      value={countryName}
                      className={`py-3 ${
                        countryName !== "South Africa" && countryName !== "United Kingdom"
                          ? "text-muted-foreground"
                          : ""
                      }`}
                    >
                      {countryName}
                      {countryName !== "South Africa" && countryName !== "United Kingdom" && (
                        <span className="ml-2 text-xs text-muted-foreground">(Coming soon)</span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Education System Selection */}
            {(country === "South Africa" || country === "United Kingdom") && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Select Education System</h3>
                </div>
                <Select onValueChange={setEducationSystem}>
                  <SelectTrigger className="w-full h-12 text-left font-medium border-2 transition-colors hover:border-primary/50">
                    <SelectValue placeholder="Choose your education system" />
                  </SelectTrigger>
                  <SelectContent>
                    {educationSystems[country].map((system) => (
                      <SelectItem 
                        key={system} 
                        value={system}
                        className="py-3"
                      >
                        {system === 'matric' ? 'Matric' : 'A-Levels'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Continue Button */}
            <Button 
              className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 py-6 text-lg font-medium rounded-xl mt-8"
              disabled={!country || (!educationSystem && (country === "South Africa" || country === "United Kingdom"))}
              onClick={handleContinue}
            >
              <span className="flex items-center gap-2">
                Continue
                <ChevronRight className="h-5 w-5" />
              </span>
            </Button>
          </Card>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-950/50 border border-red-100 dark:border-red-900/50 rounded-lg animate-slideIn">
              <p className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm justify-center">
                <AlertCircle className="h-4 w-4" />
                {error}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 