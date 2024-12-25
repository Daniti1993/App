import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function GuestInfo() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Guest Information</h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            {...register('guest.name')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.guest?.name && (
            <p className="mt-1 text-sm text-red-600">{errors.guest.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            {...register('guest.phone')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.guest?.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.guest.phone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('guest.email')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.guest?.email && (
            <p className="mt-1 text-sm text-red-600">{errors.guest.email.message}</p>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-md font-medium leading-6 text-gray-900">Emergency Contact</h4>
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="emergencyName" className="block text-sm font-medium text-gray-700">
              Emergency Contact Name
            </label>
            <input
              type="text"
              id="emergencyName"
              {...register('guest.emergencyContact.name')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.guest?.emergencyContact?.name && (
              <p className="mt-1 text-sm text-red-600">{errors.guest.emergencyContact.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="emergencyPhone" className="block text-sm font-medium text-gray-700">
              Emergency Contact Phone
            </label>
            <input
              type="tel"
              id="emergencyPhone"
              {...register('guest.emergencyContact.phone')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.guest?.emergencyContact?.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.guest.emergencyContact.phone.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="emergencyEmail" className="block text-sm font-medium text-gray-700">
              Emergency Contact Email
            </label>
            <input
              type="email"
              id="emergencyEmail"
              {...register('guest.emergencyContact.email')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.guest?.emergencyContact?.email && (
              <p className="mt-1 text-sm text-red-600">{errors.guest.emergencyContact.email.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}