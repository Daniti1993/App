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
    address: {
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
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    emergencyContact: {
      name: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      }
    }
  },
  vehicle: {
    year: String,
    make: String,
    model: String,
    color: String,
    licensePlate: String,
    state: String
  },
  confirmations: {
    trashInstructions: {
      type: Boolean,
      required: true
    },
    parkingInstructions: {
      type: Boolean,
      required: true
    },
    contactUnderstanding: {
      type: Boolean,
      required: true
    },
    replacementCharge: {
      type: Boolean,
      required: true
    }
  },
  signatures: {
    guest: {
      type: String,
      required: true
    },
    agent: {
      type: String,
      required: true
    }
  },
  photos: [{
    type: String
  }],
  pdfPath: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('CheckIn', checkInSchema);