import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

export default function SignatureCapture({ onSave, label }) {
  const sigPad = useRef(null);

  const clear = () => {
    sigPad.current.clear();
  };

  const save = () => {
    if (!sigPad.current.isEmpty()) {
      const signatureData = sigPad.current.toDataURL();
      onSave(signatureData);
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="text-xl font-bold text-dallas-blue">{label}</h4>
      <div className="border rounded-lg p-2 bg-white">
        <SignatureCanvas
          ref={sigPad}
          canvasProps={{
            className: 'signature-canvas w-full h-40',
            style: { 
              border: '1px solid #e5e7eb',
              borderRadius: '0.375rem',
              backgroundColor: '#fff'
            }
          }}
        />
      </div>
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={clear}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dallas-gold"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={save}
          className="px-4 py-2 bg-dallas-blue text-white rounded-md text-sm font-medium hover:bg-dallas-navy focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dallas-gold"
        >
          Save Signature
        </button>
      </div>
    </div>
  );
}