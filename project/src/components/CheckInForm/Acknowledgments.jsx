import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function Acknowledgments() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-dallas-blue">Acknowledgments</h3>
      
      <div className="space-y-6">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            <input
              id="contactUnderstanding"
              type="checkbox"
              {...register('confirmations.contactUnderstanding', { 
                required: 'You must acknowledge this requirement' 
              })}
              className="h-4 w-4 rounded border-gray-300 text-dallas-blue focus:ring-dallas-gold"
            />
          </div>
          <div>
            <label htmlFor="contactUnderstanding" className="text-base font-semibold text-gray-900">
              Contact Policy Understanding
            </label>
            <p className="mt-1 text-sm text-gray-700">
              Guests MUST contact Furnished Apartments Dallas Directly [NOT THE BUILDING LEASING OFFICE] for ANY CONCERN - FAILURE TO DO SO CAN RESULT IN TERMINATION of your reservation. As the lease owners this is part of our agreement with the building so our guests can only contact and get help from the Furnished Apartments Dallas team.
            </p>
            {errors.confirmations?.contactUnderstanding && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmations.contactUnderstanding.message}</p>
            )}
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            <input
              id="replacementCharge"
              type="checkbox"
              {...register('confirmations.replacementCharge', { 
                required: 'You must acknowledge the replacement charge policy' 
              })}
              className="h-4 w-4 rounded border-gray-300 text-dallas-blue focus:ring-dallas-gold"
            />
          </div>
          <div>
            <label htmlFor="replacementCharge" className="text-base font-semibold text-gray-900">
              Replacement Charge Policy
            </label>
            <p className="mt-1 text-sm text-gray-700">
              I understand there is a $150 replacement charge per item.
            </p>
            {errors.confirmations?.replacementCharge && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmations.replacementCharge.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}