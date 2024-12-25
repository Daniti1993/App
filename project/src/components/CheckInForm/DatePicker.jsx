import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function DatePicker() {
  const { register } = useFormContext();
  const currentDateTime = new Date().toISOString().slice(0, 16);

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-dallas-blue">Check-In Date & Time</h3>
      <div className="mt-2">
        <input
          type="datetime-local"
          defaultValue={currentDateTime}
          {...register('date')}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-dallas-gold focus:border-dallas-gold text-lg text-dallas-blue"
          style={{ colorScheme: 'light' }}
        />
      </div>
    </div>
  );
}