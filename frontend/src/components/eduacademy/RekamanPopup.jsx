// components/eduacademy/RekamanPopup.jsx
import React from 'react';
// Hapus import statis video karena akan diambil dari backend
// import rekaman from '/img/eduacademy/nah.mp4'; // Hapus ini

function RekamanPopup({ showRekamanPopup, closePopup, rekamanLink }) { // Tambahkan rekamanLink sebagai prop
  if (!showRekamanPopup) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#F5F7FA] rounded-lg p-10 w-[90%] max-w-4xl shadow-lg relative flex flex-col items-center">
        {/* Close button */}
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          &times;
        </button>

        {/* Video */}
        <div className="overflow-hidden mb-6">
          {rekamanLink ? ( // Tampilkan video hanya jika rekamanLink ada
            <video
              className="w-full h-full object-cover rounded-lg" // Tambahkan styling yang sesuai
              controls
              playsInline
            >
              <source src={rekamanLink} type="video/mp4" /> {/* Gunakan rekamanLink dari props */}
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="w-[400px] h-[225px] bg-gray-200 flex items-center justify-center rounded-lg text-gray-500">
              <p>Rekaman video tidak tersedia.</p>
            </div>
          )}
        </div>

        {/* Text */}
        <div className="text-center">
          <p className="text-lg font-semibold text-[#E5A426] mb-4 tracking-[0.1em]">
            <span className="text-[#3375CC]">
              Terima kasih telah bergabung dalam webinar
            </span>
            <span className="text-[#E5A426]"> Eduacademy! </span>
            <span className="text-[#1F467A]">
              Semoga <br />
              sesi ini bermanfaat untuk pengembangan dirimu.
            </span>
          </p>

          {/* Download Button */}
          <a
            href={rekamanLink} // Gunakan rekamanLink dari props
            download // Atribut download akan menyarankan browser untuk mengunduh
            className={`bg-[#3375CC] hover:bg-sky-800 text-white font-semibold px-6 py-3 rounded-md text-sm transition inline-block text-center ${!rekamanLink ? 'opacity-50 cursor-not-allowed' : ''}`}
            target="_blank" // Buka di tab baru (baik untuk unduhan atau melihat video eksternal)
            rel="noopener noreferrer" // Praktik keamanan
            disabled={!rekamanLink} // Nonaktifkan tombol jika link tidak ada
          >
            {rekamanLink ? "Download Rekaman" : "Rekaman Tidak Tersedia"}
          </a>
          {!rekamanLink && (
            <p className="text-red-500 text-xs mt-2">Rekaman belum tersedia.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RekamanPopup;