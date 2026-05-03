'use client';
import { Download } from 'lucide-react';

interface PDFExportProps {
  elementId: string;
  filename?: string;
  buttonText?: string;
}

export default function PDFExport({
  elementId,
  filename = 'ClearPath_Document.pdf',
  buttonText = 'Download PDF'
}: PDFExportProps) {

  const handleExport = async () => {
    try {
      const htmlToImage = await import('html-to-image');
      const { jsPDF } = await import('jspdf');

      const element = document.getElementById(elementId);
      if (!element) {
        console.error(`Element with id ${elementId} not found.`);
        alert('Could not find the document to export.');
        return;
      }

      const imgData = await htmlToImage.toPng(element, {
        quality: 1.0,
        pixelRatio: 2
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4',
      });

      const rect = element.getBoundingClientRect();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (rect.height * pdfWidth) / rect.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <button
      onClick={handleExport}
      className="bg-[#F59E0B] hover:bg-[#d98b09] text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center gap-2"
    >
      <Download className="w-4 h-4" />
      {buttonText}
    </button>
  );
}
