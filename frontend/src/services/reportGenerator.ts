import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import format from 'date-fns/format';

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export function generateReport(analysis) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });
  
  // Add header
  doc.setFillColor(50, 50, 50);
  doc.rect(0, 0, 210, 40, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text('Grade Conversion Report', 15, 20);
  doc.setFontSize(12);
  doc.text(`Generated on ${formatDate(new Date())}`, 15, 30);
  
  // Reset text color
  doc.setTextColor(0, 0, 0);
  
  // Overall GPA
  doc.setFillColor(240, 240, 240);
  doc.rect(15, 50, 180, 20, 'F');
  doc.setFontSize(16);
  doc.text('Overall GPA', 20, 60);
  doc.setFontSize(20);
  doc.text(`${analysis.cumulativeGPA.toFixed(2)}/4.0`, 150, 60);
  
  let yPos = 90;
  
  // Subject Analysis
  analysis.subjectMatches.forEach(subject => {
    // Subject header
    doc.setFillColor(245, 245, 245);
    doc.rect(15, yPos - 5, 180, 15, 'F');
    doc.setFontSize(14);
    doc.text(subject.original, 20, yPos);
    doc.text(subject.grade, 170, yPos);
    yPos += 15;
    
    // Create table for subject details
    doc.autoTable({
      startY: yPos,
      margin: { left: 20 },
      head: [['Category', 'Details']],
      body: [
        ['US Equivalent', subject.equivalent],
        ['Match Percentage', `${subject.matchPercentage}%`],
        ['GPA Equivalent', subject.gpaEquivalent.toFixed(1)]
      ],
      theme: 'striped',
      headStyles: { fillColor: [70, 70, 70] },
      styles: { fontSize: 10 }
    });
    
    yPos = (doc as any).lastAutoTable.finalY + 10;
    
    // Content comparison table
    doc.setFontSize(10);
    doc.autoTable({
      startY: yPos,
      margin: { left: 20 },
      head: [['Original Content', 'AP Content']],
      body: subject.contentComparison.originalContent.map((content, i) => [
        content,
        subject.contentComparison.apContent[i] || ''
      ]),
      theme: 'striped',
      headStyles: { fillColor: [70, 70, 70] },
      styles: { fontSize: 10 }
    });
    
    yPos = (doc as any).lastAutoTable.finalY + 10;
    
    // Narrative
    doc.setFontSize(10);
    doc.setFillColor(250, 250, 250);
    doc.rect(15, yPos - 5, 180, 5, 'F');
    doc.text('Detailed Comparison:', 20, yPos);
    yPos += 5;
    const lines = doc.splitTextToSize(
      subject.contentComparison.narrativeComparison, 
      160
    );
    doc.text(lines, 20, yPos);
    
    yPos += lines.length * 7 + 20;
    
    // Add new page if needed
    if (yPos > 250) {
      doc.addPage();
      yPos = 30;
    }
  });
  
  // Add footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text(`Page ${i} of ${pageCount}`, 100, 290, { align: 'center' });
  }
  
  return doc;
} 