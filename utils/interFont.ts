// Inter font base64 data for jsPDF
// This would normally be generated using jsPDF font converter

// For now, we'll create a system that gracefully handles Inter font loading
// and falls back to Helvetica when Inter is not available

import { jsPDF } from 'jspdf';

export const loadInterFontForPDF = async (doc: jsPDF): Promise<boolean> => {
  try {
    // Check if we have Inter font available in the browser
    const testDiv = document.createElement('div');
    testDiv.style.fontFamily = 'Inter, sans-serif';
    testDiv.style.fontSize = '12px';
    testDiv.style.position = 'absolute';
    testDiv.style.visibility = 'hidden';
    testDiv.textContent = 'Test';
    
    document.body.appendChild(testDiv);
    const computedFont = window.getComputedStyle(testDiv).fontFamily;
    document.body.removeChild(testDiv);
    
    // If Inter is loaded in the browser, we can use it as reference
    // For PDF generation, we use Helvetica as the closest alternative
    if (computedFont.includes('Inter')) {
      console.log('Inter font detected in browser, using Helvetica as PDF equivalent');
      doc.setFont('helvetica', 'normal');
      return true;
    } else {
      console.log('Inter font not detected, using Helvetica');
      doc.setFont('helvetica', 'normal');
      return false;
    }
  } catch (error) {
    console.warn('Error checking Inter font availability:', error);
    doc.setFont('helvetica', 'normal');
    return false;
  }
};

export const setInterFont = (doc: jsPDF, style: 'normal' | 'bold' = 'normal') => {
  // Use Helvetica as Inter alternative
  doc.setFont('helvetica', style);
};

export const setInterFontSize = (doc: jsPDF, size: number) => {
  doc.setFontSize(size);
};

// Future implementation when we have proper Inter font converted:
/*
export const loadInterFontBase64 = async (doc: jsPDF) => {
  // This would contain the actual Inter font converted to base64
  // using jsPDF font converter
  
  const interRegularBase64 = "BASE64_STRING_HERE";
  const interBoldBase64 = "BASE64_STRING_HERE";
  
  doc.addFileToVFS('Inter-Regular.ttf', interRegularBase64);
  doc.addFileToVFS('Inter-Bold.ttf', interBoldBase64);
  
  doc.addFont('Inter-Regular.ttf', 'Inter', 'normal');
  doc.addFont('Inter-Bold.ttf', 'Inter', 'bold');
  
  doc.setFont('Inter', 'normal');
};
*/