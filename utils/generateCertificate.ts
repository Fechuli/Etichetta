import { jsPDF } from 'jspdf';
import { loadInterFontForPDF, setInterFont } from './interFont';

export type ExportFormat = "a4" | "instagram-story" | "instagram-post" | "post-square";

interface CertificateData {
  word: string;
  date?: string;
  format: ExportFormat;
}

interface FormatConfig {
  width: number;
  height: number;
  unit: 'mm' | 'pt';
  orientation: 'portrait' | 'landscape';
  margins: { top: number; bottom: number; horizontal: number; };
  spacing: { subtitle: number; philosophy: number; wordSection: number; conclusion: number; lineHeight: number; };
  fonts: { subtitle: number; body: number; label: number; word: number; footer: number; };
}

const getFormatConfig = (format: ExportFormat): FormatConfig => {
  switch (format) {
    
    case "a4":
      return {
        width: 297, height: 210, unit: 'mm', orientation: 'landscape',
        margins: { top: 30, bottom: 20, horizontal: 25 },
        spacing: { subtitle: 25, philosophy: 30, wordSection: 35, conclusion: 30, lineHeight: 6 },
        fonts: { subtitle: 12, body: 9, label: 11, word: 32, footer: 7 }
      };
    case "instagram-story":
      return {
        width: 540, height: 960, unit: 'pt', orientation: 'portrait',
        margins: { top: 80, bottom: 60, horizontal: 40 },
        spacing: { subtitle: 50, philosophy: 60, wordSection: 80, conclusion: 60, lineHeight: 16 },
        fonts: { subtitle: 24, body: 18, label: 22, word: 64, footer: 14 }
      };
    case "instagram-post":
      return {
        width: 612, height: 612, unit: 'pt', orientation: 'portrait',
        margins: { top: 60, bottom: 40, horizontal: 30 },
        spacing: { subtitle: 35, philosophy: 40, wordSection: 50, conclusion: 35, lineHeight: 12 },
        fonts: { subtitle: 18, body: 14, label: 16, word: 48, footer: 12 }
      };
    case "post-square":
      return {
        width: 720, height: 720, unit: 'pt', orientation: 'portrait',
        margins: { top: 70, bottom: 50, horizontal: 40 },
        spacing: { subtitle: 40, philosophy: 45, wordSection: 60, conclusion: 40, lineHeight: 14 },
        fonts: { subtitle: 20, body: 16, label: 18, word: 56, footer: 13 }
      };
    default:
      return {
        width: 297, height: 210, unit: 'mm', orientation: 'landscape',
        margins: { top: 30, bottom: 20, horizontal: 25 },
        spacing: { subtitle: 25, philosophy: 30, wordSection: 35, conclusion: 30, lineHeight: 6 },
        fonts: { subtitle: 12, body: 9, label: 11, word: 32, footer: 7 }
      };
  }
};

const loadInterFont = async (doc: jsPDF) => {
  const interLoaded = await loadInterFontForPDF(doc);
  if (interLoaded) {
    console.log('Inter font system initialized successfully');
  } else {
    console.log('Using Helvetica as Inter alternative');
  }
};

const addCenteredText = (doc: jsPDF, text: string, y: number, pageWidth: number) => {
  const textWidth = doc.getTextWidth(text);
  doc.text(text, (pageWidth - textWidth) / 2, y);
};

const addWrappedCenteredText = (doc: jsPDF, text: string, startY: number, pageWidth: number, lineHeight: number, maxWidth?: number): number => {
  const words = text.split(' ');
  let currentLine = '';
  let currentY = startY;
  const usableWidth = maxWidth || pageWidth * 0.8;

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = doc.getTextWidth(testLine);

    if (testWidth <= usableWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) {
        addCenteredText(doc, currentLine, currentY, pageWidth);
        currentY += lineHeight;
      }
      currentLine = word;
    }
  }

  if (currentLine) {
    addCenteredText(doc, currentLine, currentY, pageWidth);
    currentY += lineHeight;
  }

  return currentY;
};

export const generateCertificate = async (data: CertificateData) => {
  const config = getFormatConfig(data.format);
  
  const doc = new jsPDF({
    orientation: config.orientation,
    unit: config.unit,
    format: [config.width, config.height]

  });

 await loadInterFont(doc);
  
  const { width: pageWidth, height: pageHeight, margins, spacing, fonts } = config;
  
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setDrawColor(12, 12, 12);
  doc.setLineWidth(1);
  doc.rect(margins.horizontal / 2, margins.top / 2, 
          pageWidth - margins.horizontal, pageHeight - margins.top - margins.bottom);

  let currentY = margins.top;

  setInterFont(doc, "normal");
  doc.setFontSize(fonts.subtitle);
  doc.setTextColor(135, 135, 135);
  addCenteredText(doc, 'UN ESPERIMENTO DI LIBERTÀ TEMPORANEA', currentY, pageWidth);
  currentY += spacing.subtitle;

  doc.setFontSize(fonts.body);
  doc.setTextColor(12, 12, 12);
  
  const philosophyText = 'Ti sono state date etichette tutta la vita. Parole scelte da altri. Stavolta la scegli tu. Le parole ci precedono. Ti sei abituato a riconoscerti in parole che non hai mai scelto. Questa volta è diverso.';
  
  currentY = addWrappedCenteredText(doc, philosophyText, currentY, pageWidth, spacing.lineHeight, pageWidth * 0.7);
  currentY += spacing.philosophy;

  setInterFont(doc, "normal");
  doc.setFontSize(fonts.label);
  doc.setTextColor(135, 135, 135);
  addCenteredText(doc, 'Questo sei tu ora:', currentY, pageWidth);
  currentY += spacing.wordSection * 0.4;

  setInterFont(doc, "bold");
  const dynamicWordSize = Math.min(fonts.word, (pageWidth * 0.8) / (data.word.length * 0.6));
  doc.setFontSize(dynamicWordSize);
  doc.setTextColor(12, 12, 12);
  addCenteredText(doc, data.word.toUpperCase(), currentY, pageWidth);
  currentY += spacing.wordSection;

  setInterFont(doc, "normal");
  doc.setFontSize(fonts.body);
  doc.setTextColor(12, 12, 12);
  
  const conclusionText = 'Una parola che non esisteva prima di questo momento. Una parte di te che nessuno aveva mai nominato. Finché lo vorrai, sarai questo.';
  
  currentY = addWrappedCenteredText(doc, conclusionText, currentY, pageWidth, spacing.lineHeight, pageWidth * 0.7);

  if (data.format === 'a4') {
    setInterFont(doc, "normal");
    doc.setFontSize(fonts.footer);
    doc.setTextColor(135, 135, 135);
    
    const currentDate = data.date || new Date().toLocaleDateString('it-IT');
    const footerY = pageHeight - margins.bottom;
    
    doc.text(`Data: ${currentDate}`, margins.horizontal, footerY);
    
    const studioText = 'Un progetto di Backdoor Studio';
    const studioWidth = doc.getTextWidth(studioText);
    doc.text(studioText, pageWidth - margins.horizontal - studioWidth, footerY);
  }

  setInterFont(doc, "normal");
  doc.setFontSize(fonts.footer + 1);
  doc.setTextColor(135, 135, 135);

  return doc;
};

export const downloadCertificate = async (word: string, format: ExportFormat) => {
  try {
    console.log('Generating certificate for:', word, 'in format:', format);
    
    const pdf = await generateCertificate({ word, format });
    
    const formatSuffix = format === 'a4' ? 'a4' : 
                        format === 'instagram-story' ? 'story' :
                        format === 'instagram-post' ? 'post' : 'square';
    
    pdf.save(`etichetta-${word.toLowerCase()}-${formatSuffix}.pdf`);
    console.log('Certificate downloaded successfully');
  } catch (error) {
    console.error('Error generating certificate:', error);
    alert('Errore nella generazione del certificato. Riprova più tardi.');
  }
};