import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export function LaunchPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center space-y-8">
          <h1 className="text-4xl font-bold">EduTranslate</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Bridging the gap for international students seeking education in American schools
          </p>
          <Button size="lg" onClick={() => navigate('/country')}>
            Get Started
          </Button>
        </div>

        <div className="mt-24 max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-semibold text-center">About Us</h2>
          <p className="text-lg text-muted-foreground">
            We understand the challenges international students face when applying to American schools.
            Our mission is to simplify the process by providing accurate translations of academic
            credentials and fair comparisons with the US education system.
          </p>
          <div className="flex justify-center">
            <Button size="lg" onClick={() => navigate('/country')}>
              Start Your Journey
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 