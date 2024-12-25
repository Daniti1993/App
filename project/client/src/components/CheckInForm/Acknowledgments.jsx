import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function Acknowledgments() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Acknowledgments</h3>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="contactUnderstanding"
              type="checkbox"
              {...register('confirmations.contactUnderstanding')}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="contactUnderstanding" className="font-medium text-gray-700">
              Guests MUST contact Furnished Apartments Dallas Directly [NOT THE BUILDING LEASING OFFICE] for ANY CONCERN
            </label>
            <p className="text-gray-500">
              FAILURE TO DO SO CAN RESULT IN TERMINATION of your reservation. As the lease owners this is part of our agreement with the building so our guests can only contact and get help from the Furnished Apartments Dallas team.
            </p>
          </div>
        </div>
        {errors.confirmations?.contactUnderstanding && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmations.contactUnderstanding.message}</p>
        )}

        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="replacementCharge"
              type="checkbox"
              {...register('confirmations.replacementCharge')}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="replacementCharge" className="font-medium text-gray-700">
              $150 replacement charge per item
            </label>
          </div>
        </div>
        {errors.confirmations?.replacementCharge && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmations.replacementCharge.message}</p>
        )}

        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="trashInstructions"
              type="checkbox"
              {...register('confirmations.trashInstructions')}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="trashInstructions" className="font-medium text-gray-700">
              Trash Instructions & Violation Explained
            </label>
          </div>
        </div>
        {errors.confirmations?.trashInstructions && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmations.trashInstructions.message}</p>
        )}
      </div>

      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h4 className="text-md font-bold text-gray-900 mb-2">Furnished Apartments Dallas Contact Info:</h4>
        <p className="text-gray-700">
          Email: <a href="mailto:customerservice@furnished-apartments-dallas.com" className="text-indigo-600">customerservice@furnished-apartments-dallas.com</a>
        </p>
        <p className="text-gray-700">
          Phone: <a href="tel:713-766-0495" className="text-indigo-600">713-766-0495</a>
        </p>
      </div>
    </div>
  );
}