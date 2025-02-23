# 📄 Common Helper - README

## 🌍 International Transcript Conversion Assistant

Transform international transcripts into U.S. academic standards with instant GPA calculation and course equivalency mapping, helping international students understand their academic standing in the U.S. education system.

---

## 📝 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Challenges Faced](#challenges-faced)
- [Future Improvements](#future-improvements)
- [Contributors](#contributors)
- [License](#license)

---

## 🔎 About

**Common Helper** is an AI-powered platform designed to assist international students in converting their academic transcripts to U.S. standards. The application analyzes uploaded transcripts, calculates cumulative GPA, and maps subjects to their U.S. equivalents (e.g., AP courses), providing topic similarities, differences, and overall equivalency percentages.

## 🚀 Features

✅ Convert international grades to U.S. GPA on a 4.0 scale  
✅ Course equivalency mapping with a 40%-100% match range  
✅ Subject analysis detailing topic similarities and differences  
✅ Comprehensive downloadable academic reports  
✅ User-friendly and mobile-responsive interface

---

## 🛠️ Tech Stack

### Frontend

- **React (TypeScript)**: Component-based development
- **Vite**: Fast build and optimized development environment
- **Tailwind CSS**: Utility-first styling for responsiveness
- **React Router**: Seamless navigation

### Backend

- **Node.js**: Handles server logic and API endpoints
- **OpenAI API**: Powers subject extraction and GPA calculation
- **Supabase**: Manages data storage and user transcripts

---

## 🖥️ Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account & project
- OpenAI API key

### Steps

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/common-helper.git
cd common-helper
```

2. **Install dependencies:**

```bash
npm install  # or yarn install
```

3. **Configure environment variables:**  
   Create a `.env` file with:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
OPENAI_API_KEY=your_openai_api_key
```

4. **Run the application:**  
   Frontend:

```bash
npm run dev
```

Backend:

```bash
node index.js
```

The app should be running at `http://localhost:5173` (or your configured port).

---

## 📂 Usage

1. Select your country and educational system (e.g., A-levels, Matric system).
2. Upload your transcript(s) in PDF format.
3. Receive your U.S. GPA calculation and subject equivalency report.
4. Download the detailed report for submission or personal reference.

## 🧩 Challenges Faced

- Fine-tuning AI prompts for accurate PDF parsing
- Integrating Supabase and ensuring seamless database interactions
- Managing frontend-backend communication with file uploads
- Designing a responsive and user-friendly UI

## 🚀 Future Improvements

- Add more international education systems
- Introduce user authentication and saved reports
- Refine AI analysis for nuanced subject mapping
- Develop a mobile version for wider accessibility

## 📄 License

This project is licensed under the [MIT License](LICENSE).

Convert international transcripts to US standards with instant GPA calculation and course equivalency mapping.

🌐 [Live Demo](https://common-helper.vercel.app/)

---

🚀 _Empowering international students with clarity and ease!_
