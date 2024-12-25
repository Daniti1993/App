import React, { useState, useCallback } from 'react';
import Webcam from 'react-webcam';

export default function PhotoCapture({ onCapture }) {
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const webcamRef = React.useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedPhotos(prev => [...prev, imageSrc]);
    onCapture([...capturedPhotos, imageSrc]);
  }, [webcamRef, capturedPhotos, onCapture]);

  const removePhoto = (index) => {
    const newPhotos = capturedPhotos.filter((_, i) => i !== index);
    setCapturedPhotos(newPhotos);
    onCapture(newPhotos);
  };

  return (
    <div className="space-y-4">
      <h4 className="text-xl font-bold text-dallas-blue">ID Photo Capture</h4>
      
      {!isCapturing ? (
        <button
          type="button"
          onClick={() => setIsCapturing(true)}
          className="px-4 py-2 bg-dallas-blue text-white rounded-md text-sm font-medium hover:bg-dallas-navy focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dallas-gold"
        >
          Open Camera
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
              className="px-4 py-2 bg-dallas-blue text-white rounded-md text-sm font-medium hover:bg-dallas-navy focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dallas-gold"
            >
              Take Photo
            </button>
            <button
              type="button"
              onClick={() => setIsCapturing(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dallas-gold"
            >
              Close Camera
            </button>
          </div>
        </div>
      )}

      {capturedPhotos.length > 0 && (
        <div className="mt-4">
          <h5 className="text-lg font-semibold text-dallas-blue mb-2">Captured Photos</h5>
          <div className="grid grid-cols-2 gap-4">
            {capturedPhotos.map((photo, index) => (
              <div key={index} className="relative">
                <img src={photo} alt={`ID ${index + 1}`} className="rounded-lg" />
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}