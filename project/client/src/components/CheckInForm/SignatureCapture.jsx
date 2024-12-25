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
      <h4 className="text-md font-medium text-gray-900">{label}</h4>
      <div className="border rounded-lg p-2">
        <SignatureCanvas
          ref={sigPad}
          canvasProps={{
            className: 'signature-canvas w-full h-40 border rounded',
            style: { border: '1px solid #e5e7eb' }
          }}
        />
      </div>
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={clear}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={save}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Signature
        </button>
      </div>
    </div>
  );
}