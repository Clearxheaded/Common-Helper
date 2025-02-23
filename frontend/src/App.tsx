import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Header } from "@/components/layout/Header"
import { LaunchPage } from "@/pages/LaunchPage"
import { CountryPage } from "@/pages/CountryPage"
import { DocumentsPage } from "@/pages/DocumentsPage"
import { ResultsPage } from "@/pages/ResultsPage"

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Header />
        <Routes>
          <Route path="/" element={<LaunchPage />} />
          <Route path="/country" element={<CountryPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
} 