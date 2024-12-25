import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import DatePicker from '../components/CheckInForm/DatePicker';
import GuestInfo from '../components/CheckInForm/GuestInfo';
import VehicleInfo from '../components/CheckInForm/VehicleInfo';
import SignatureCapture from '../components/CheckInForm/SignatureCapture';
import PhotoCapture from '../components/CheckInForm/PhotoCapture';
import Acknowledgments from '../components/CheckInForm/Acknowledgments';
import ApartmentSelector from '../components/CheckInForm/ApartmentSelector';
import ConfirmationScreen from '../components/CheckInForm/ConfirmationScreen';
import { checkInService } from '../services/checkInService';

export default function CheckInForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [signatures, setSignatures] = useState({ guest: null, agent: null });
  const [photos, setPhotos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const methods = useForm({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      apartment: {
        complex: '',
        address: '',
        number: ''
      },
      guest: {
        name: '',
        phone: '',
        email: '',
        emergencyContact: {
          name: '',
          phone: '',
          email: ''
        }
      },
      vehicle: {
        year: '',
        make: '',
        model: '',
        color: '',
        licensePlate: '',
        state: ''
      },
      confirmations: {
        trashInstructions: false,
        parkingInstructions: false,
        contactUnderstanding: false,
        replacementCharge: false
      }
    }
  });

  const { handleSubmit, trigger, watch } = methods;
  const parkingInstructions = watch('confirmations.parkingInstructions');

  const validateStep = async () => {
    let isValid = true;
    switch (step) {
      case 1:
        isValid = await trigger(['date', 'apartment.complex', 'apartment.number']);
        break;
      case 2:
        isValid = await trigger([
          'guest.name',
          'guest.phone',
          'guest.email',
          'guest.emergencyContact.name',
          'guest.emergencyContact.phone',
          'guest.emergencyContact.email'
        ]);
        break;
      case 3:
        isValid = await trigger([
          'vehicle.year',
          'vehicle.make',
          'vehicle.model',
          'vehicle.color',
          'vehicle.licensePlate',
          'vehicle.state'
        ]);
        if (!parkingInstructions) {
          isValid = false;
          alert('You must acknowledge the parking instructions before proceeding');
        }
        break;
      case 4:
        isValid = await trigger(['confirmations.contactUnderstanding', 'confirmations.replacementCharge']);
        if (!signatures.guest || !signatures.agent) {
          isValid = false;
          alert('Both guest and agent signatures are required');
        }
        if (photos.length === 0) {
          isValid = false;
          alert('At least one ID photo is required');
        }
        break;
      default:
        isValid = true;
    }
    return isValid;
  };

  const nextStep = async () => {
    const isValid = await validateStep();
    if (isValid) {
      setStep(current => Math.min(current + 1, 5));
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setStep(current => Math.max(current - 1, 1));
    window.scrollTo(0, 0);
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const formData = new FormData();
      formData.append('data', JSON.stringify({
        ...data,
        signatures,
        date: new Date(data.date).toISOString()
      }));

      photos.forEach((photo, index) => {
        formData.append(`photos`, photo);
      });

      await checkInService.submitCheckIn(formData);
      alert('Check-in completed successfully!');
      navigate('/');
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitError(error.message || 'Failed to submit check-in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <DatePicker />
            <ApartmentSelector />
          </div>
        );
      case 2:
        return <GuestInfo />;
      case 3:
        return <VehicleInfo />;
      case 4:
        return (
          <div className="space-y-6">
            <SignatureCapture 
              label="Guest Signature" 
              onSave={(data) => setSignatures(prev => ({ ...prev, guest: data }))}
            />
            <SignatureCapture 
              label="Agent Signature" 
              onSave={(data) => setSignatures(prev => ({ ...prev, agent: data }))}
            />
            <PhotoCapture onCapture={setPhotos} />
            <Acknowledgments />
          </div>
        );
      case 5:
        return (
          <ConfirmationScreen 
            signatures={signatures}
            photos={photos}
            onEdit={setStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-dallas-cream py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4, 5].map((number) => (
                <React.Fragment key={number}>
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                      step === number 
                        ? 'bg-dallas-gold text-white'
                        : step > number
                        ? 'bg-dallas-blue text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {number}
                  </div>
                  {number < 5 && (
                    <div 
                      className={`flex-1 h-1 mx-2 ${
                        step > number ? 'bg-dallas-blue' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="mt-4 flex justify-between text-sm text-gray-600">
              <span>Details</span>
              <span>Guest Info</span>
              <span>Vehicle</span>
              <span>Documents</span>
              <span>Review</span>
            </div>
          </div>

          {submitError && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="bg-white shadow rounded-lg">
              <div className="p-6">
                {renderStep()}
              </div>

              <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dallas-gold"
                  >
                    Previous
                  </button>
                )}
                <button
                  type={step === 5 ? 'submit' : 'button'}
                  onClick={step === 5 ? undefined : nextStep}
                  disabled={isSubmitting}
                  className={`px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dallas-gold ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-dallas-blue text-white hover:bg-dallas-navy'
                  }`}
                >
                  {isSubmitting
                    ? 'Submitting...'
                    : step === 5
                    ? 'Submit Check-In'
                    : 'Next'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
}