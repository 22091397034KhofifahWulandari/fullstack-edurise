import React from 'react';
import toga from '/img/eduacademy/toga.png'; // Pastikan path ini benar

function SuccessPopup({ showSuccessPopup, closePopup }) {
  if (!showSuccessPopup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-md w-full mx-4 relative p-8 text-center">
        {/* Image */}
        <div className="flex justify-center mb-6">
          <img src={toga} alt="Graduation Cap" className="h-36" />
        </div>

        {/* Success message */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            <span className="text-sky-600">Pendaftaran sukses!</span>
            <span className="text-sky-900">cek email anda</span>
            <span className="text-amber-400">
              {" "}
              untuk informasi selanjutnya
            </span>
          </h2>
        </div>

        {/* Close button */}
        <button
          onClick={closePopup}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-12 rounded-lg transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default SuccessPopup;