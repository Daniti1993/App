import path from 'path';
import { fileURLToPath } from 'url';
import PDFDocument from 'pdfkit';
import { uploadToSpaces, generateStorageUrl } from '../services/storageService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const submitCheckIn = async (req, res) => {
  try {
    const checkInData = JSON.parse(req.body.data);
    const { apartment, guest } = checkInData;
    
    // Generate PDF filename
    const timestamp = new Date().toISOString().split('T')[0];
    const pdfFilename = `${timestamp}_${sanitizePath(guest.name)}_checkin.pdf`;

    // Generate PDF and upload to DigitalOcean Spaces
    const pdfBuffer = await generatePDF(checkInData, req.files || []);
    const pdfUrl = await uploadToSpaces(pdfBuffer, pdfFilename, 'application/pdf');

    // Upload photos to DigitalOcean Spaces
    const uploadedFiles = await Promise.all(
      (req.files || []).map(async (file) => {
        const fileName = `${timestamp}_${sanitizePath(guest.name)}_${file.originalname}`;
        const fileUrl = await uploadToSpaces(file.buffer, fileName);
        return {
          filename: fileName,
          url: fileUrl
        };
      })
    );

    res.status(200).json({
      success: true,
      message: 'Check-in completed successfully',
      pdfUrl,
      uploadedFiles
    });
  } catch (error) {
    console.error('Submit check-in error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process check-in',
      error: error.message
    });
  }
};

const generatePDF = async (checkInData, files) => {
  return new Promise((resolve, reject) => {
    try {
      const chunks = [];
      const doc = new PDFDocument();

      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));

      // Add header
      doc.fontSize(20)
         .text('Furnished Apartments Dallas', { align: 'center' })
         .fontSize(16)
         .text('Guest Check-In Form', { align: 'center' })
         .moveDown();

      // Add check-in details
      doc.fontSize(14)
         .text('Check-in Date: ' + new Date(checkInData.date).toLocaleString())
         .moveDown();

      // Apartment Information
      doc.fontSize(14)
         .text('Apartment Information', { underline: true })
         .fontSize(12)
         .text(`Complex: ${checkInData.apartment.complex}`)
         .text(`Unit: ${checkInData.apartment.number}`)
         .text(`Address: ${checkInData.apartment.address}`)
         .moveDown();

      // Guest Information
      doc.fontSize(14)
         .text('Guest Information', { underline: true })
         .fontSize(12)
         .text(`Name: ${checkInData.guest.name}`)
         .text(`Phone: ${checkInData.guest.phone}`)
         .text(`Email: ${checkInData.guest.email}`)
         .moveDown();

      // Vehicle Information
      if (checkInData.vehicle) {
        doc.fontSize(14)
           .text('Vehicle Information', { underline: true })
           .fontSize(12)
           .text(`Make: ${checkInData.vehicle.make || 'N/A'}`)
           .text(`Model: ${checkInData.vehicle.model || 'N/A'}`)
           .text(`License Plate: ${checkInData.vehicle.licensePlate || 'N/A'}`)
           .moveDown();
      }

      // Add signatures if available
      if (checkInData.signatures) {
        doc.fontSize(14)
           .text('Signatures', { underline: true });

        if (checkInData.signatures.guest) {
          doc.fontSize(12)
             .text('Guest Signature:')
             .image(Buffer.from(checkInData.signatures.guest.split(',')[1], 'base64'), {
               fit: [200, 100],
               align: 'center'
             })
             .moveDown();
        }

        if (checkInData.signatures.agent) {
          doc.fontSize(12)
             .text('Agent Signature:')
             .image(Buffer.from(checkInData.signatures.agent.split(',')[1], 'base64'), {
               fit: [200, 100],
               align: 'center'
             })
             .moveDown();
        }
      }

      // Add footer
      doc.fontSize(10)
         .text('For any concerns or questions, please contact:', { align: 'center' })
         .text('Email: customerservice@furnished-apartments-dallas.com', { align: 'center' })
         .text('Phone: 713-766-0495', { align: 'center' });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

const sanitizePath = (str) => {
  return str.replace(/[^a-z0-9]/gi, '_').toLowerCase();
};