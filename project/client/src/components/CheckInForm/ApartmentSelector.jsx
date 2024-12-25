import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const APARTMENT_COMPLEXES = [
  {
    name: "ALLEGRO APARTMENTS",
    address: "15750 Allegro Pl, Addison, TX 75001",
    email: "allegro@greystar.com",
    phone: "(972)362-0391 || 972-759-9444",
    units: ["AAA 3301", "AAA 3321", "AAA 3345", "AAA 3365", "AAA 3385"]
  },
  {
    name: "SYNC Cityline",
    address: "120 West Cityline Drive, Richardson, TX 75082",
    email: "cityline@syncre.com",
    phone: "(855) 648-4048",
    units: ["ADL 1043", "ADL 2096", "ADL 3096", "ADL 5088", "ADL 5098"]
  },
  {
    name: "The Alexan Apartments",
    address: "3333 HARRY HINES BLVD. DALLAS, TX 75201",
    email: "thealexan@greystar.com",
    phone: "469-713-2084",
    units: ["ALX 11151"]
  },
  {
    name: "ALVISTA GALLERIA",
    address: "13505 Inwood Rd, Farmers Branch, TX 75244",
    email: "alvista@greystar.com",
    phone: "(469) 707-8332",
    units: ["AND 1136", "AND 1234", "AND 1235"]
  },
  {
    name: "UPTOWN @ COLE PARK",
    address: "3030 Elizabeth St, Dallas, TX 75204",
    email: "leasing@uptownatcolepark.com",
    phone: "(469) 730-4880",
    units: ["COLE 217", "COLE 227", "COLE 527"]
  },
  {
    name: "FAITH FAIRMONT",
    address: "4110 Fairmount St, Dallas, TX 75219",
    email: "4110fairmont@greystar.com",
    phone: "214-556-1091",
    units: ["FAI 2140", "FAI 4121"]
  }
  // Add other complexes as needed
];

export default function ApartmentSelector() {
  const { register, setValue, watch } = useFormContext();
  const [selectedComplex, setSelectedComplex] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState('');

  const handleComplexSelect = (complex) => {
    setSelectedComplex(complex);
    setSelectedUnit('');
    setValue('apartment.address', complex.address);
    setValue('apartment.complex', complex.name);
  };

  const handleUnitSelect = (unit) => {
    setSelectedUnit(unit);
    setValue('apartment.number', unit);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Select Apartment Location</h3>

      {/* Complex Selection */}
      <div className="space-y-4 max-h-96 overflow-y-auto rounded-lg border border-gray-200">
        {APARTMENT_COMPLEXES.map((complex, index) => (
          <div
            key={index}
            className={`p-4 cursor-pointer transition-all ${
              selectedComplex === complex
                ? 'bg-dallas-cream border-l-4 border-dallas-gold'
                : 'hover:bg-gray-50 border-l-4 border-transparent'
            }`}
            onClick={() => handleComplexSelect(complex)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-semibold text-dallas-blue">{complex.name}</h4>
                <p className="text-sm text-gray-600">{complex.address}</p>
                <p className="text-sm text-gray-500">{complex.email}</p>
                <p className="text-sm text-gray-500">{complex.phone}</p>
              </div>
              {selectedComplex === complex && (
                <span className="text-dallas-gold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}
            </div>

            {/* Unit Selection */}
            {selectedComplex === complex && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {complex.units.map((unit) => (
                  <button
                    key={unit}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnitSelect(unit);
                    }}
                    className={`p-2 text-sm rounded-md transition-all ${
                      selectedUnit === unit
                        ? 'bg-dallas-gold text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:border-dallas-gold'
                    }`}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Hidden inputs for form data */}
      <input type="hidden" {...register('apartment.complex')} />
      <input type="hidden" {...register('apartment.address')} />
      <input type="hidden" {...register('apartment.number')} />
    </div>
  );
}