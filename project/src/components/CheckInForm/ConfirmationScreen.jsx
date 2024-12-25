import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function ConfirmationScreen({ signatures, photos, onEdit }) {
  const { getValues } = useFormContext();
  const formData = getValues();

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-dallas-blue">Review Your Information</h3>

      {/* Check-in Details */}
      <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-dallas-gold">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-xl font-bold text-dallas-blue mb-4">Check-in Details</h4>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <span className="font-semibold">Date:</span>{' '}
                {new Date(formData.date).toLocaleString()}
              </div>
              <div>
                <span className="font-semibold">Complex:</span>{' '}
                {formData.apartment.complex}
              </div>
              <div>
                <span className="font-semibold">Unit Number:</span>{' '}
                {formData.apartment.number}
              </div>
            </div>
          </div>
          <button
            onClick={() => onEdit(1)}
            className="text-dallas-blue hover:text-dallas-gold"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Guest Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-dallas-gold">
        <div className="flex justify-between items-start">
          <div className="w-full">
            <h4 className="text-xl font-bold text-dallas-blue mb-4">Guest Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="font-semibold">Name:</span>{' '}
                {formData.guest.name}
              </div>
              <div>
                <span className="font-semibold">Phone:</span>{' '}
                {formData.guest.phone}
              </div>
              <div>
                <span className="font-semibold">Email:</span>{' '}
                {formData.guest.email}
              </div>
            </div>

            <h5 className="text-lg font-semibold text-dallas-blue mt-4 mb-2">Emergency Contact</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="font-semibold">Name:</span>{' '}
                {formData.guest.emergencyContact.name}
              </div>
              <div>
                <span className="font-semibold">Phone:</span>{' '}
                {formData.guest.emergencyContact.phone}
              </div>
              <div>
                <span className="font-semibold">Email:</span>{' '}
                {formData.guest.emergencyContact.email}
              </div>
            </div>
          </div>
          <button
            onClick={() => onEdit(2)}
            className="text-dallas-blue hover:text-dallas-gold"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Vehicle Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-dallas-gold">
        <div className="flex justify-between items-start">
          <div className="w-full">
            <h4 className="text-xl font-bold text-dallas-blue mb-4">Vehicle Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="font-semibold">Year:</span>{' '}
                {formData.vehicle.year}
              </div>
              <div>
                <span className="font-semibold">Make:</span>{' '}
                {formData.vehicle.make}
              </div>
              <div>
                <span className="font-semibold">Model:</span>{' '}
                {formData.vehicle.model}
              </div>
              <div>
                <span className="font-semibold">Color:</span>{' '}
                {formData.vehicle.color}
              </div>
              <div>
                <span className="font-semibold">License Plate:</span>{' '}
                {formData.vehicle.licensePlate}
              </div>
              <div>
                <span className="font-semibold">State:</span>{' '}
                {formData.vehicle.state}
              </div>
            </div>
          </div>
          <button
            onClick={() => onEdit(3)}
            className="text-dallas-blue hover:text-dallas-gold"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Documentation */}
      <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-dallas-gold">
        <div className="flex justify-between items-start">
          <div className="w-full">
            <h4 className="text-xl font-bold text-dallas-blue mb-4">Documentation</h4>
            
            {/* Signatures */}
            <div className="mb-6">
              <h5 className="text-lg font-semibold text-dallas-blue mb-2">Signatures</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {signatures.guest && (
                  <div>
                    <p className="font-semibold mb-2">Guest Signature:</p>
                    <img src={signatures.guest} alt="Guest Signature" className="border rounded-lg" />
                  </div>
                )}
                {signatures.agent && (
                  <div>
                    <p className="font-semibold mb-2">Agent Signature:</p>
                    <img src={signatures.agent} alt="Agent Signature" className="border rounded-lg" />
                  </div>
                )}
              </div>
            </div>

            {/* Photos */}
            {photos.length > 0 && (
              <div>
                <h5 className="text-lg font-semibold text-dallas-blue mb-2">ID Photos</h5>
                <div className="grid grid-cols-2 gap-4">
                  {photos.map((photo, index) => (
                    <img 
                      key={index} 
                      src={photo} 
                      alt={`ID ${index + 1}`} 
                      className="rounded-lg border"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => onEdit(4)}
            className="text-dallas-blue hover:text-dallas-gold"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Acknowledgments */}
      <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-dallas-gold">
        <h4 className="text-xl font-bold text-dallas-blue mb-4">Acknowledgments</h4>
        <ul className="list-disc pl-5 space-y-2">
          <li className={formData.confirmations.contactUnderstanding ? 'text-green-600' : 'text-red-600'}>
            Contact Policy Understanding
          </li>
          <li className={formData.confirmations.replacementCharge ? 'text-green-600' : 'text-red-600'}>
            Replacement Charge Policy
          </li>
          <li className={formData.confirmations.parkingInstructions ? 'text-green-600' : 'text-red-600'}>
            Parking Instructions
          </li>
        </ul>
      </div>

      {/* Contact Information */}
      <div className="bg-dallas-blue text-white p-6 rounded-lg">
        <h4 className="text-xl font-bold mb-4">Furnished Apartments Dallas Contact Information</h4>
        <div className="space-y-2">
          <p className="font-bold">
            For ANY concerns or questions, please contact us directly:
          </p>
          <p>
            <span className="font-semibold">Email:</span>{' '}
            <a href="mailto:customerservice@furnished-apartments-dallas.com" className="text-dallas-gold hover:text-dallas-cream">
              customerservice@furnished-apartments-dallas.com
            </a>
          </p>
          <p>
            <span className="font-semibold">Phone:</span>{' '}
            <a href="tel:713-766-0495" className="text-dallas-gold hover:text-dallas-cream">
              713-766-0495
            </a>
          </p>
          <p className="text-sm mt-4 border-t border-dallas-gold pt-4">
            Remember: Do NOT contact the building leasing office. All communication must go through Furnished Apartments Dallas directly.
          </p>
        </div>
      </div>
    </div>
  );
}