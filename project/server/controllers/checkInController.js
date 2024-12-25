import { generateCheckInPDF } from '../services/pdfService.js';
import CheckIn from '../models/CheckIn.js';
import { logger } from '../utils/logger.js';

export const submitCheckIn = async (req, res) => {
  try {
    const checkInData = JSON.parse(req.body.data);
    
    // Generate and save PDF
    const pdfPath = await generateCheckInPDF(checkInData);
    
    // Save check-in data to database
    const checkIn = new CheckIn({
      ...checkInData,
      pdfPath
    });
    await checkIn.save();
    
    logger.info(`Check-in saved: ${checkIn._id}, PDF: ${pdfPath}`);

    res.status(200).json({
      success: true,
      message: 'Check-in completed successfully',
      checkInId: checkIn._id
    });
  } catch (error) {
    logger.error('Submit check-in error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process check-in',
      error: error.message
    });
  }
};