import express from 'express';
import { writeFile } from 'fs/promises';
import { Readable } from 'stream';
import PDFDocument from 'pdfkit';
import * as XLSX from 'xlsx';
import CheckIn from '../models/CheckIn.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all check-ins with pagination and filtering
router.get('/check-ins', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startDate = req.query.startDate ? new Date(req.query.startDate) : null;
    const endDate = req.query.endDate ? new Date(req.query.endDate) : null;
    const complex = req.query.complex;
    const guestName = req.query.guestName;

    let query = {};
    
    if (startDate && endDate) {
      query.date = { $gte: startDate, $lte: endDate };
    }
    
    if (complex) {
      query['apartment.complex'] = new RegExp(complex, 'i');
    }
    
    if (guestName) {
      query['guest.name'] = new RegExp(guestName, 'i');
    }

    const total = await CheckIn.countDocuments(query);
    const checkIns = await CheckIn.find(query)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      checkIns,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Export to Excel
router.get('/export/excel', auth, async (req, res) => {
  try {
    const checkIns = await CheckIn.find().sort({ date: -1 });
    
    const data = checkIns.map(checkIn => ({
      Date: new Date(checkIn.date).toLocaleDateString(),
      Complex: checkIn.apartment.complex,
      'Unit Number': checkIn.apartment.number,
      'Guest Name': checkIn.guest.name,
      'Guest Phone': checkIn.guest.phone,
      'Guest Email': checkIn.guest.email,
      'Vehicle Make': checkIn.vehicle?.make || 'N/A',
      'Vehicle Model': checkIn.vehicle?.model || 'N/A',
      'License Plate': checkIn.vehicle?.licensePlate || 'N/A'
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Check-ins');
    
    const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=check-ins.xlsx');
    res.send(excelBuffer);
  } catch (error) {
    console.error('Excel export error:', error);
    res.status(500).json({ message: 'Failed to export data to Excel' });
  }
});

// Export to PDF
router.get('/export/pdf', auth, async (req, res) => {
  try {
    const checkIns = await CheckIn.find().sort({ date: -1 });
    const doc = new PDFDocument();
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=check-ins.pdf');
    
    doc.pipe(res);
    
    doc.fontSize(16).text('Check-in Records', { align: 'center' });
    doc.moveDown();
    
    checkIns.forEach((checkIn, index) => {
      if (index > 0) doc.addPage();
      
      doc.fontSize(14).text('Check-in Details', { underline: true });
      doc.moveDown();
      doc.fontSize(12)
         .text(`Date: ${new Date(checkIn.date).toLocaleDateString()}`)
         .text(`Complex: ${checkIn.apartment.complex}`)
         .text(`Unit: ${checkIn.apartment.number}`);
      doc.moveDown();
      
      doc.fontSize(14).text('Guest Information', { underline: true });
      doc.moveDown();
      doc.fontSize(12)
         .text(`Name: ${checkIn.guest.name}`)
         .text(`Phone: ${checkIn.guest.phone}`)
         .text(`Email: ${checkIn.guest.email}`);
      
      if (checkIn.vehicle?.make) {
        doc.moveDown();
        doc.fontSize(14).text('Vehicle Information', { underline: true });
        doc.moveDown();
        doc.fontSize(12)
           .text(`Make: ${checkIn.vehicle.make}`)
           .text(`Model: ${checkIn.vehicle.model}`)
           .text(`License Plate: ${checkIn.vehicle.licensePlate}`);
      }
    });
    
    doc.end();
  } catch (error) {
    console.error('PDF export error:', error);
    res.status(500).json({ message: 'Failed to export data to PDF' });
  }
});

export default router;