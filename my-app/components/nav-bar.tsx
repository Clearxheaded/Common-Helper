import Link from "next/link"

interface NavBarProps {
  currentStep: number
}

export function NavBar({ currentStep }: NavBarProps) {
  const steps = ["Country Selection", "Document Upload", "Results"]

  return (
    <div className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 flex-col items-center justify-center relative">
          <Link href="/" className="absolute left-4 text-xl font-bold text-blue-600">
            EduTranslate
          </Link>
          <div className="flex items-center space-x-24">
            {steps.map((step, index) => (
              <div
                key={step}
                className={`flex flex-col items-center ${index + 1 <= currentStep ? "text-blue-600" : "text-gray-400"}`}
              >
                <div
                  className={`mb-1.5 h-6 w-6 rounded-full ${
                    index + 1 <= currentStep ? "bg-blue-600 shadow-md shadow-blue-200" : "bg-gray-200"
                  } flex items-center justify-center text-xs text-white ring-4 ${
                    index + 1 <= currentStep ? "ring-blue-100" : "ring-transparent"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="text-xs font-medium tracking-wide">{step}</span>
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-100">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-in-out"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

