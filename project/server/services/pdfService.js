import PDFDocument from 'pdfkit';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateCheckInPDF = async (checkInData) => {
  const { apartment, guest, date } = checkInData;
  
  // Create directory structure: complexes/[complex_name]/[guest_name].pdf
  const baseDir = path.join(__dirname, '../../storage/complexes');
  const complexDir = path.join(baseDir, sanitizePath(apartment.complex));
  await fs.mkdir(complexDir, { recursive: true });

  // Create simple filename with guest name and date
  const fileName = `${sanitizePath(guest.name)}_${new Date(date).toISOString().split('T')[0]}.pdf`;
  const filePath = path.join(complexDir, fileName);

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);

    stream.on('finish', () => resolve(filePath));
    stream.on('error', reject);

    doc.pipe(stream);

    // Simple header with complex name
    doc.fontSize(20)
       .text(apartment.complex, { align: 'center' })
       .moveDown();

    // Guest name and date
    doc.fontSize(16)
       .text(`Guest: ${guest.name}`)
       .text(`Check-in Date: ${new Date(date).toLocaleDateString()}`)
       .moveDown();

    doc.end();
  });
};

// Helper function to sanitize paths
const sanitizePath = (str) => {
  return str.replace(/[^a-z0-9]/gi, '_').toLowerCase();
};