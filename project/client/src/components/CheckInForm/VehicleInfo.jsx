import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function VehicleInfo() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Vehicle Information</h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">
            Year
          </label>
          <input
            type="text"
            id="year"
            {...register('vehicle.year')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
            {...register('vehicle.make')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
            {...register('vehicle.model')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
            {...register('vehicle.color')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
            {...register('vehicle.licensePlate')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
            {...register('vehicle.state')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.vehicle?.state && (
            <p className="mt-1 text-sm text-red-600">{errors.vehicle.state.message}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="parkingInstructions"
              type="checkbox"
              {...register('confirmations.parkingInstructions')}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="parkingInstructions" className="font-medium text-gray-700">
              Parking Tag(s) Instructions & Towing Explained
            </label>
          </div>
        </div>
        {errors.confirmations?.parkingInstructions && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmations.parkingInstructions.message}</p>
        )}
      </div>
    </div>
  );
}