import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateCheckInPDF = async (checkInData) => {
  const { apartment, guest, vehicle, date, signatures, photos } = checkInData;
  
  // Create directory structure for the apartment if it doesn't exist
  const baseDir = path.join(__dirname, '../../storage/apartments');
  const complexDir = path.join(baseDir, sanitizePath(apartment.complex));
  const unitDir = path.join(complexDir, sanitizePath(apartment.number));
  
  await fs.promises.mkdir(unitDir, { recursive: true });

  // Create PDF filename with timestamp and guest name
  const timestamp = new Date().toISOString().split('T')[0];
  const fileName = `${timestamp}_${sanitizePath(guest.name)}_checkin.pdf`;
  const filePath = path.join(unitDir, fileName);

  // Generate PDF
  const doc = new PDFDocument();
  const stream = fs.createWriteStream(filePath);

  return new Promise((resolve, reject) => {
    stream.on('finish', () => resolve(filePath));
    stream.on('error', reject);

    doc.pipe(stream);

    // Add header with logo
    doc.fontSize(20)
       .text('Furnished Apartments Dallas', { align: 'center' })
       .fontSize(16)
       .text('Guest Check-In Form', { align: 'center' })
       .moveDown();

    // Check-in Date
    doc.fontSize(14)
       .text('Check-in Date: ' + new Date(date).toLocaleString())
       .moveDown();

    // Apartment Information
    doc.fontSize(14)
       .text('Apartment Information', { underline: true })
       .fontSize(12)
       .text(`Complex: ${apartment.complex}`)
       .text(`Unit: ${apartment.number}`)
       .text(`Address: ${apartment.address}`)
       .moveDown();

    // Guest Information
    doc.fontSize(14)
       .text('Guest Information', { underline: true })
       .fontSize(12)
       .text(`Name: ${guest.name}`)
       .text(`Phone: ${guest.phone}`)
       .text(`Email: ${guest.email}`)
       .moveDown();

    // Emergency Contact
    doc.fontSize(14)
       .text('Emergency Contact', { underline: true })
       .fontSize(12)
       .text(`Name: ${guest.emergencyContact.name}`)
       .text(`Phone: ${guest.emergencyContact.phone}`)
       .text(`Email: ${guest.emergencyContact.email}`)
       .moveDown();

    // Vehicle Information
    if (vehicle.make) {
      doc.fontSize(14)
         .text('Vehicle Information', { underline: true })
         .fontSize(12)
         .text(`Make: ${vehicle.make}`)
         .text(`Model: ${vehicle.model}`)
         .text(`Year: ${vehicle.year}`)
         .text(`Color: ${vehicle.color}`)
         .text(`License Plate: ${vehicle.licensePlate}`)
         .text(`State: ${vehicle.state}`)
         .moveDown();
    }

    // Confirmations
    doc.fontSize(14)
       .text('Acknowledgments', { underline: true })
       .fontSize(12)
       .text('✓ Contact Policy Understanding')
       .text('✓ Replacement Charge Policy')
       .text('✓ Parking Instructions')
       .moveDown();

    // Signatures
    doc.fontSize(14)
       .text('Signatures', { underline: true });

    // Add guest signature
    if (signatures.guest) {
      doc.fontSize(12)
         .text('Guest Signature:')
         .image(Buffer.from(signatures.guest.split(',')[1], 'base64'), {
           fit: [200, 100],
           align: 'center'
         })
         .moveDown();
    }

    // Add agent signature
    if (signatures.agent) {
      doc.fontSize(12)
         .text('Agent Signature:')
         .image(Buffer.from(signatures.agent.split(',')[1], 'base64'), {
           fit: [200, 100],
           align: 'center'
         })
         .moveDown();
    }

    // Add photos
    if (photos && photos.length > 0) {
      doc.addPage()
         .fontSize(14)
         .text('ID Photos', { underline: true })
         .moveDown();

      for (const photo of photos) {
        doc.image(photo, {
          fit: [400, 300],
          align: 'center'
        }).moveDown();
      }
    }

    // Add footer with contact information
    doc.fontSize(10)
       .text('For any concerns or questions, please contact:', { align: 'center' })
       .text('Email: customerservice@furnished-apartments-dallas.com', { align: 'center' })
       .text('Phone: 713-766-0495', { align: 'center' });

    doc.end();
  });
};

// Helper function to sanitize paths
const sanitizePath = (str) => {
  return str.replace(/[^a-z0-9]/gi, '_').toLowerCase();
};