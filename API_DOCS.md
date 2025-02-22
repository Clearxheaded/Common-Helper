# Grade Conversion API Documentation

## Base URL
http://localhost:3000

## Endpoints

### 1. PDF Transcript Processing
Process a South African transcript and convert grades to US equivalents.

POST /api/pdf/parse

**Request:**
- Content-Type: multipart/form-data
- Body: 
  - `pdf`: PDF file (transcript)

**Response:**
{
  "subjects": ["English Home Language", "Mathematics", ...],
  "percentages": [87, 88, ...],
  "achievementLevels": [7, 7, ...],
  "usGpaEquivalents": [4.0, 4.0, ...],
  "letterGrades": ["A", "A", ...],
  "overallGPA": "3.90"
}

### 2. Subject Matching
Match South African subjects to AP equivalents.

POST /api/subjects/match

**Request:**
{
  "subject": "Mathematics"
}

**Response:**
{
  "saSubject": "Mathematics",
  "bestMatch": "AP Calculus AB",
  "matchPercentage": 85,
  "reasoning": "Detailed explanation of the match...",
  "keyDifferences": [
    "Specific difference 1",
    "Specific difference 2"
  ],
  "topicOverlap": {
    "fullyMatched": ["Topics that match exactly"],
    "partiallyMatched": ["Topics with partial overlap"],
    "notCovered": ["Topics in one but not the other"]
  }
}

## Grade Conversion Scale
- Level 7 → 4.0 GPA
- Level 6 → 3.3 GPA
- Level 5 → 3.0 GPA
- Level 4 → 2.0 GPA
- Level 3 → 1.0 GPA
- Level 2 → 0.0 GPA
- Level 1 → 0.0 GPA

## Testing Examples

### PowerShell
# Upload PDF
$pdfPath = "transcript.pdf"
$Form = @{
    pdf = Get-Item -Path $pdfPath
}
Invoke-RestMethod -Uri "http://localhost:3000/api/pdf/parse" -Method Post -Form $Form

# Match Subject
$body = @{
    subject = "Mathematics"
} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3000/api/subjects/match" -Method Post -Body $body -ContentType "application/json"

## Notes
- Maximum file size: 5MB
- Only PDF files accepted
- Rate limit: 100 requests per 15 minutes
