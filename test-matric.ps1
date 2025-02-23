$pdfPath = "matric-transcript.pdf"
$Form = @{
    pdf = Get-Item -Path $pdfPath
}
Invoke-RestMethod -Uri "http://localhost:3000/api/pdf/parse" -Method Post -Form $Form 