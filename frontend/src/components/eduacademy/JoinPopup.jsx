// components/eduacademy/JoinPopup.jsx
import React from 'react';
// Hapus import statis gambar poster
// import posterWeb from '/img/eduacademy/posterweb.png'; // Hapus ini

function JoinPopup({ showJoinPopup, closePopup, webinarLink, webinarImage, handleJoinWebinar }) { // Tambahkan webinarImage, Hapus setShowDownloadButtons dari props
  if (!showJoinPopup) return null;

  const onJoinClick = () => {
    handleJoinWebinar(); // Panggil fungsi yang membuka link
    // HAPUS BARIS INI: setShowDownloadButtons(true); // INI LOGIC YANG SALAH
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#F5F7FA] rounded-lg p-10 flex w-[900px] h-[500px] max-w-full shadow-lg relative items-center justify-between">
        {/* Close button */}
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          &times;
        </button>

        {/* Text */}
        <div className="flex-1 pr-6 flex flex-col justify-center">
          <p className="text-sm font-bold text-[#E5A426] mb-8 tracking-[0.1em]">
            WELCOME BACK
          </p>
          <h2 className="text-4xl font-bold text-[#1F467A] mb-7">
            Thank you for joining <br /> our webinars
          </h2>
          <p className="text-sm text-[#667085] mb-6 leading-relaxed">
            Terima kasih sudah ikut belajar bersama kami!
            <br />
            Kami harap sesi ini bermanfaat dan menginspirasi.
            <br />
            Sampai jumpa di webinar Edurise
          </p>
          <button
            onClick={onJoinClick}
            className="bg-[#3375CC] hover:bg-sky-800 text-white font-semibold px-5 py-4 rounded-md text-sm transition w-1/2"
            disabled={!webinarLink}
          >
            {webinarLink ? "Join now" : "Link tidak tersedia"}
          </button>
          {!webinarLink && (
            <p className="text-red-500 text-xs mt-2">Link webinar belum tersedia atau sudah berakhir.</p>
          )}
        </div>

        {/* Image */}
        <div className="w-[400px] h-[400px] rounded-xl overflow-hidden">
          <img
            src={webinarImage || '/img/eduacademy/posterweb.png'} // Gunakan webinarImage dari props, fallback ke placeholder
            alt="Webinar Image"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default JoinPopup;