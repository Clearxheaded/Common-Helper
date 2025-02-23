The project is focused on assisting international students with the often challenging and expensive process of converting their educational grades to U.S. equivalents, which is crucial for applications like the Common App. The goal is to create a system that automates this process and simplifies the Common App experience for international students.

Core Functionalities:
Grade Conversion & GPA Calculation: The system should be able to analyze the student's grades from their educational system (e.g., South Africa’s A-levels or matriculation system) and convert them into a U.S. GPA system using predefined conversion rules.

Subject Matching: The system will analyze subjects taken by the student and match them to the most similar U.S. Advanced Placement (AP) subjects using predefined syllabuses for both South African and AP courses. The system should provide a percentage match of equivalency, showing similarities and differences between the subjects.

Document Upload and Parsing: The student will upload PDF documents containing their grades, such as a grade report or transcript. The backend should parse these documents, extract relevant subject and grade data, and use that information to calculate GPA and match subjects.

Database Integration: The system will use Supabase to store student data and other necessary information such as course syllabuses, conversion charts, and results from the OpenAI analysis.

OpenAI Integration: The OpenAI API will be used to analyze the uploaded transcript PDFs, extract relevant information, and provide grade conversion and subject matching based on preloaded syllabuses and conversion charts.

Frontend Integration: A frontend engineer is handling the front-end development using V0, which specializes in Next.js, and will also integrate Supabase. The backend will need to communicate smoothly with the frontend once it's ready, especially in terms of API calls and data exchange.

Technology Stack:
Backend: Node.js for backend development.
OpenAI: For analyzing uploaded transcripts, performing grade conversion, and subject matching.
Supabase: For database storage, including storing syllabuses, conversion rules, and student data.
Frontend: V0 (Next.js) for the user interface and integration with Supabase.
File Handling: PDF parsing for extracting text from transcripts.
Key Requirements for Backend:
APIs: The backend should have APIs to send data to OpenAI, parse uploaded PDFs, and handle other necessary business logic such as grade conversion and subject matching.

PDF Parsing: The backend needs to be able to accept a PDF document upload, parse it, and extract text (course names and grades). The OpenAI API will then use this text to match courses to U.S. equivalents.

Database Structure: Use Supabase to store data such as:

Preloaded syllabuses and conversion rules.
The student's transcript data (subjects, grades, GPA, etc.).
Subject matches and equivalencies.
Security: Ensure that sensitive data, such as student transcripts, is handled securely.

Next Steps:
Backend Setup: Setting up the Node.js backend with the necessary folder structure, API endpoints, and integration with OpenAI and Supabase.
Frontend-Backend Communication: Ensuring that the frontend engineer can connect to the backend, especially for tasks like file upload and data retrieval.
Training OpenAI: The OpenAI API needs to be trained or configured with the context of South African syllabuses, conversion charts, and AP subject equivalents.
This is a high-level context that you can use when prompting Cursor for generating the backend structure, API setup, and other necessary code.
