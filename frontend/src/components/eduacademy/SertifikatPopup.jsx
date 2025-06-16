// components/eduacademy/SertifikatPopup.jsx
import React from 'react';
// Hapus import statis gambar sertifikat karena akan diambil dari backend
// import sertif from '/img/eduacademy/sertip.png'; // Hapus ini

function SertifikatPopup({ showSertifikatPopup, closePopup, sertifikatLink }) { // Tambahkan sertifikatLink sebagai prop
  if (!showSertifikatPopup) return null;

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

        {/* Image - Jika ingin menampilkan preview sertifikat dari link, Anda bisa ganti src di sini */}
        {/* Untuk saat ini, kita bisa pertahankan gambar default atau hilangkan jika tidak ada URL gambar sertifikat dari backend */}
        {/* Jika backend menyediakan URL gambar sertifikat, gunakan: <img src={sertifikatLink} ... /> */}
        <div className="overflow-hidden mb-6">
          {/* Untuk menampilkan gambar preview sertifikat, Anda bisa menggunakan sertifikatLink */}
          {/* Namun, jika sertifikatLink adalah PDF atau file lain, browser mungkin tidak bisa menampilkannya langsung sebagai img */}
          {/* Jika sertifikatLink adalah URL gambar (misal .png/.jpg dari backend), gunakan: */}
          {/* <img
            className="w-[400px] mx-auto object-cover"
            src={sertifikatLink || '/img/eduacademy/sertip_placeholder.png'} // Fallback ke placeholder jika link kosong
            alt="Sertifikat"
          /> */}
          {/* Jika sertifikatLink adalah URL PDF atau tidak selalu berupa gambar, lebih baik gunakan ikon atau placeholder */}
          <img
            className="w-[400px] mx-auto object-cover"
            src={'/img/eduacademy/sertip.png'} // Pertahankan placeholder/gambar default jika tidak ada preview dari backend
            alt="Sertifikat"
          />
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
            href={sertifikatLink} // Gunakan sertifikatLink dari props
            download // Atribut download akan menyarankan browser untuk mengunduh
            className={`bg-[#3375CC] hover:bg-sky-800 text-white font-semibold px-6 py-3 rounded-md text-sm transition inline-block text-center ${!sertifikatLink ? 'opacity-50 cursor-not-allowed' : ''}`}
            target="_blank" // Buka di tab baru (baik untuk unduhan atau melihat PDF)
            rel="noopener noreferrer" // Praktik keamanan
            disabled={!sertifikatLink} // Nonaktifkan tombol jika link tidak ada
          >
            {sertifikatLink ? "Download Sertifikat" : "Sertifikat Tidak Tersedia"}
          </a>
          {!sertifikatLink && (
            <p className="text-red-500 text-xs mt-2">Sertifikat belum tersedia.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SertifikatPopup;