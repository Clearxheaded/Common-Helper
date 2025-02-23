# Set the file path
$pdfPath = "matric-transcript.pdf"

# Create multipart form data
$fileBytes = [System.IO.File]::ReadAllBytes($pdfPath)
$fileEnc = [System.Text.Encoding]::GetEncoding('UTF-8').GetString($fileBytes)

$boundary = [System.Guid]::NewGuid().ToString()
$LF = "`r`n"

$bodyLines = (
    "--$boundary",
    "Content-Disposition: form-data; name=`"pdf`"; filename=`"matric-transcript.pdf`"",
    "Content-Type: application/pdf$LF",
    $fileEnc,
    "--$boundary--$LF"
) -join $LF

# Send the request
$result = Invoke-WebRequest -Uri "http://localhost:3000/api/pdf/parse" `
    -Method Post `
    -ContentType "multipart/form-data; boundary=`"$boundary`"" `
    -Body $bodyLines

# Display the result
$result.Content

$Form = @{
    pdf = Get-Item -Path $pdfPath
}
Invoke-RestMethod -Uri "http://localhost:3000/api/pdf/parse" -Method Post -Form $Form