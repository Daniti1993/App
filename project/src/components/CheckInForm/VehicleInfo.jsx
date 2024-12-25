import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function VehicleInfo() {
  const { register, formState: { errors }, watch } = useFormContext();
  const parkingAcknowledged = watch('confirmations.parkingInstructions');

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-dallas-blue">Vehicle Information</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">
            Year
          </label>
          <input
            type="text"
            id="year"
            {...register('vehicle.year', { required: 'Year is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-dallas-blue focus:border-dallas-blue sm:text-sm"
          />
          {errors.vehicle?.year && (
            <p className="mt-1 text-sm text-red-600">{errors.vehicle.year.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="make" className="block text-sm font-medium text-gray-700">
            Make
          </label>
          <input
            type="text"
            id="make"
            {...register('vehicle.make', { required: 'Make is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-dallas-blue focus:border-dallas-blue sm:text-sm"
          />
          {errors.vehicle?.make && (
            <p className="mt-1 text-sm text-red-600">{errors.vehicle.make.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-700">
            Model
          </label>
          <input
            type="text"
            id="model"
            {...register('vehicle.model', { required: 'Model is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-dallas-blue focus:border-dallas-blue sm:text-sm"
          />
          {errors.vehicle?.model && (
            <p className="mt-1 text-sm text-red-600">{errors.vehicle.model.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="color" className="block text-sm font-medium text-gray-700">
            Color
          </label>
          <input
            type="text"
            id="color"
            {...register('vehicle.color', { required: 'Color is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-dallas-blue focus:border-dallas-blue sm:text-sm"
          />
          {errors.vehicle?.color && (
            <p className="mt-1 text-sm text-red-600">{errors.vehicle.color.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700">
            License Plate
          </label>
          <input
            type="text"
            id="licensePlate"
            {...register('vehicle.licensePlate', { required: 'License plate is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-dallas-blue focus:border-dallas-blue sm:text-sm"
          />
          {errors.vehicle?.licensePlate && (
            <p className="mt-1 text-sm text-red-600">{errors.vehicle.licensePlate.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State
          </label>
          <input
            type="text"
            id="state"
            {...register('vehicle.state', { required: 'State is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-dallas-blue focus:border-dallas-blue sm:text-sm"
          />
          {errors.vehicle?.state && (
            <p className="mt-1 text-sm text-red-600">{errors.vehicle.state.message}</p>
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-dallas-cream rounded-lg border border-dallas-gold">
        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="parkingInstructions"
              type="checkbox"
              {...register('confirmations.parkingInstructions', { 
                required: 'You must acknowledge the parking instructions before proceeding' 
              })}
              className="h-5 w-5 rounded border-gray-300 text-dallas-blue focus:ring-dallas-gold"
            />
          </div>
          <div className="ml-3">
            <label htmlFor="parkingInstructions" className="text-lg font-bold text-dallas-blue">
              Parking Tag(s) Instructions & Towing Explained
            </label>
            <p className="mt-2 text-sm text-gray-600">
              I acknowledge that I have received and understand the parking instructions and towing policies.
            </p>
            {errors.confirmations?.parkingInstructions && (
              <p className="mt-2 text-sm text-red-600 font-bold">
                {errors.confirmations.parkingInstructions.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}