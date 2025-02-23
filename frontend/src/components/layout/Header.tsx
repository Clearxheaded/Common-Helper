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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {/* Logo and title */}
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 hover:bg-transparent" 
            onClick={() => navigate('/')}
          >
            {/* You can add your logo here */}
            <span className="text-2xl font-bold">
              Common Helper
            </span>
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          {isMainPage ? (
            <nav className="hidden md:flex items-center space-x-4">
              <div className="flex items-center">
                {steps.map((step, index) => (
                  <div key={step.path} className="flex items-center">
                    <Button 
                      variant="ghost"
                      onClick={() => navigate(step.path)}
                      className={`relative px-6 py-2 rounded-full transition-all ${
                        location.pathname === step.path 
                          ? "bg-blue-500 text-white hover:bg-blue-600" 
                          : index < steps.findIndex(s => s.path === location.pathname)
                          ? "bg-blue-100 text-blue-800"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      {step.label}
                    </Button>
                    {index < steps.length - 1 && (
                      <div className={`h-[2px] w-8 mx-2 ${
                        index < steps.findIndex(s => s.path === location.pathname)
                          ? "bg-blue-200"
                          : "bg-gray-200"
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </nav>
          ) : (
            <nav className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" onClick={() => navigate('/')}>
                Home
              </Button>
              <Button variant="ghost">
                About
              </Button>
              <Button 
                variant="default"
                className="bg-primary hover:bg-primary/90 text-white px-6"
                onClick={() => navigate('/country')}
              >
                Get Started
              </Button>
            </nav>
          )}
        </div>
      </div>
    </header>
  )
} 