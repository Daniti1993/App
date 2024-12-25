import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import GuestInfo from '../components/CheckInForm/GuestInfo';
import VehicleInfo from '../components/CheckInForm/VehicleInfo';
import SignatureCapture from '../components/CheckInForm/SignatureCapture';
import PhotoCapture from '../components/CheckInForm/PhotoCapture';
import Acknowledgments from '../components/CheckInForm/Acknowledgments';
import ApartmentSelector from '../components/CheckInForm/ApartmentSelector';

export default function CheckInForm() {
  const methods = useForm({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      apartment: {
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

  const [step, setStep] = useState(1);
  const [signatures, setSignatures] = useState({ guest: null, agent: null });
  const [photos, setPhotos] = useState([]);

  const totalSteps = 5;

  const nextStep = () => {
    setStep(current => Math.min(current + 1, totalSteps));
  };

  const prevStep = () => {
    setStep(current => Math.max(current - 1, 1));
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('data', JSON.stringify({ ...data, signatures }));
    photos.forEach((photo, index) => {
      formData.append(`photo${index}`, photo);
    });

    try {
      const response = await fetch('/api/checkin', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        // Handle success
      }
    } catch (error) {
      // Handle error
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Check-In Date
              </label>
              <input
                type="datetime-local"
                id="date"
                {...methods.register('date')}
                defaultValue={new Date().toISOString().slice(0, 16)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
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
            <PhotoCapture onCapture={(photo) => setPhotos(prev => [...prev, photo])} />
          </div>
        );
      case 5:
        return <Acknowledgments />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex justify-between items-center">
                  {[...Array(totalSteps)].map((_, index) => (
                    <React.Fragment key={index}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step > index + 1 ? 'bg-dallas-blue' :
                        step === index + 1 ? 'bg-dallas-gold' :
                        'bg-gray-200'
                      } text-white`}>
                        {index + 1}
                      </div>
                      {index < totalSteps - 1 && (
                        <div className={`flex-1 h-1 mx-2 ${
                          step > index + 1 ? 'bg-dallas-blue' : 'bg-gray-200'
                        }`} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {renderStep()}
            </div>

            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 rounded-b-lg">
              <div className="flex justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dallas-gold"
                  >
                    Previous
                  </button>
                )}
                <button
                  type={step === totalSteps ? 'submit' : 'button'}
                  onClick={step === totalSteps ? undefined : nextStep}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-dallas-blue hover:bg-dallas-navy focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dallas-gold"
                >
                  {step === totalSteps ? 'Submit' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}