import { Button } from "@/components/ui/button"
import { useLocation, useNavigate } from "react-router-dom"

export function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const isMainPage = !location.pathname.includes('launch')
  
  const steps = [
    { path: '/country', label: 'Select Country' },
    { path: '/documents', label: 'Upload Documents' },
    { path: '/results', label: 'View Results' }
  ]

  return (
    <header className="w-full border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold">Common Helper</h2>
          {isMainPage && (
            <nav className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <Button 
                  key={step.path}
                  variant={location.pathname === step.path ? "default" : "ghost"}
                  onClick={() => navigate(step.path)}
                >
                  {index + 1}. {step.label}
                </Button>
              ))}
            </nav>
          )}
        </div>
      </div>
    </header>
  )
} 