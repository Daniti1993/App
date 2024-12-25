import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const APARTMENT_COMPLEXES = [
  {
    name: "ALLEGRO APARTMENTS",
    address: "15750 Spectrum Dr, Addison, TX 75001",
    building: "15750 Allegro Pl, Addison, TX 75001",
    email: "allegro@greystar.com",
    phone: "(972)362-0391 || 972-759-9444",
    units: ["AAA 1400", "AAA 3321", "AAA 3325", "AAA 3400", "AAA 3401", "AAA 3416", "AAA 3519"]
  },
  {
    name: "SYNC Cityline",
    address: "120 West Cityline Drive, Richardson, TX 75082",
    email: "cityline@syncre.com",
    phone: "(855) 648-4048",
    units: ["ACL 1024", "ACL 2046", "ACL 3006", "ACL 3070", "ACL 4081", "ACL 5028", "ACL 5038", "ACL 5039"]
  },
  {
    name: "The Alexan Apartments",
    address: "3333 HARRY HINES BLVD. DALLAS, TX 75201",
    email: "thealexan@greystar.com",
    phone: "469-713-2084",
    units: ["ALX 10151", "ALX 11151"]
  },
  {
    name: "ALVISTA GALLERIA",
    address: "13505 Inwood Rd, Farmers Branch, TX 75244",
    email: "alvistgalleria@lincolnapts.com",
    phone: "(469) 707-8332",
    units: ["AND 1130", "AND 1228", "AND 1233", "AND 1612", "AND 2218", "AND 2234"]
  },
  {
    name: "UPTOWN @ COLE PARK",
    address: "3030 Elizabeth St, Dallas, TX 75204",
    email: "leasing@uptownatcolepark.com",
    phone: "(469) 730-4880",
    units: ["COLE 305", "COLE 405", "COLE 417", "COLE 517", "COLE 523", "COLE 527", "COLE 621", "COLE 625", "COLE 633"]
  },
  {
    name: "4110 FAIRMOUNT",
    address: "4110 Fairmount St, Dallas, TX 75219",
    email: "4110fairmont@greystar.com",
    phone: "214-556-1091",
    units: ["FMU 2150", "FMU 4121"]
  },
  {
    name: "CORTLAND GALLERIA",
    address: "5005 Galleria Dr, Farmers Branch, TX 75244",
    email: "galleria@cortland.com",
    phone: "972-851-0000",
    units: ["GND 1212", "GND 1340", "GND 2114"]
  },
  {
    name: "LOFTS AT THE SAWYER",
    address: "3839 McKinney Ave Suite 120, Dallas, TX 75204",
    email: "uptowndirector@weidner.com",
    phone: "(214) 528-3636",
    units: ["LOFTS 508"]
  },
  {
    name: "OAK & ELLUM",
    address: "2627 Live Oak St, Dallas TX 75204",
    email: "oakandellum@greystar.com",
    phone: "(469) 609-2683",
    units: ["OAK 11094", "OAK 11102", "OAK 14105", "OAK 14106"]
  },
  {
    name: "The Riley @Cityline",
    address: "3551 Wilshire Wy, Richardson, TX 75082",
    email: "theriley@rpmliving.com",
    phone: "(972) 627-4928 / 972.449.9651",
    units: ["RCL 3135"]
  },
  {
    name: "RIVIERA WEST VILLAGE",
    address: "3530 Travis St, Dallas TX 75204",
    email: "rivierawestvillage@greystar.com",
    phone: "(214) 523-6700",
    units: ["RWV 125", "RWV 306", "RWV 331"]
  },
  {
    name: "3700M",
    address: "3700 McKinney St, Dallas TX 75204",
    email: "3700m@greystar.com",
    phone: "(214) 219-3700",
    units: ["TMU 356", "TMU 556", "TMU 679", "TMU 2008"]
  },
  {
    name: "VUE FITZHUGH",
    address: "2819 N Fitzhugh Ave, Dallas, TX 75204",
    email: "vuefitzhugh@tiptongroup.com",
    phone: "214-271-4778",
    units: ["VUE 1240", "VUE 1260"]
  }
];

export default function ApartmentSelector() {
  const { register, setValue } = useFormContext();
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
      <h3 className="text-2xl font-bold text-dallas-blue">Select Apartment Location</h3>
      
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
                {complex.building && (
                  <p className="text-sm text-gray-600">Building: {complex.building}</p>
                )}
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