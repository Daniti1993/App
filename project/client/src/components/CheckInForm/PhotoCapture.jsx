import React, { useState } from 'react';
import Webcam from 'react-webcam';

export default function PhotoCapture({ onCapture }) {
  const [isCapturing, setIsCapturing] = useState(false);
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
    setIsCapturing(false);
  }, [webcamRef, onCapture]);

  return (
    <div className="space-y-4">
      <h4 className="text-md font-medium text-gray-900">ID Photo Capture</h4>
      
      {!isCapturing ? (
        <button
          type="button"
          onClick={() => setIsCapturing(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Start Camera
        </button>
      ) : (
        <div className="space-y-4">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full rounded-lg"
          />
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={capture}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Capture Photo
            </button>
            <button
              type="button"
              onClick={() => setIsCapturing(false)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}