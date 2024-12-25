import mongoose from 'mongoose';

const checkInSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  apartment: {
    complex: {
      type: String,
      required: true
    },
    number: {
      type: String,
      required: true
    }
  },
  guest: {
    name: {
      type: String,
      required: true
    }
  },
  pdfPath: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('CheckIn', checkInSchema);