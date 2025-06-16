// src/pages/competition/CheckStatusPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios'; // Import axios
import StatusModal from './StatusModal'; // Pastikan path ini benar!

axios.defaults.withCredentials = true; // Penting untuk kredensial/session

const CheckStatusPage = () => {
  const { id } = useParams(); // 'id' di sini adalah UUID dari kompetisi
  const [competitionTitle, setCompetitionTitle] = useState('Kompetisi ini');
  const [registrationStatus, setRegistrationStatus] = useState(null); // Status dari BE
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegistrationDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // Coba ambil dari localStorage dulu
        const storedRegistration = JSON.parse(localStorage.getItem(`registration_${id}`));
        if (storedRegistration) {
          setCompetitionTitle(storedRegistration.registeredKompetisiDetail?.judul || 'Kompetisi ini');
          setRegistrationStatus(storedRegistration.status_pendaftaran);
          setLoading(false);
          return; // Jika ada di localStorage, tidak perlu panggil API lagi
        }

        // Jika tidak ada di localStorage, panggil API untuk mendapatkan detail pendaftaran user
        const response = await axios.get(`http://localhost:5000/kompetisi-registrasi/user/${id}`);
        
        if (response.data.isRegistered && response.data.registrationData) {
          const data = response.data.registrationData;
          setCompetitionTitle(data.registeredKompetisiDetail?.judul || 'Kompetisi ini');
          setRegistrationStatus(data.status_pendaftaran);
          // Simpan ke localStorage untuk penggunaan selanjutnya
          localStorage.setItem(`registration_${id}`, JSON.stringify(data));
        } else {
          setError('Anda belum terdaftar untuk kompetisi ini atau data tidak ditemukan.');
          setRegistrationStatus(null);
        }
      } catch (err) {
        console.error('Error fetching registration status:', err.response?.data?.msg || err.message);
        if (err.response?.status === 401) {
            setError('Anda belum login. Silakan login untuk melihat status.');
        } else {
            setError(err.response?.data?.msg || 'Gagal memuat status pendaftaran. Silakan coba lagi.');
        }
        setRegistrationStatus(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrationDetails();
  }, [id]); // Dependensi: id dari URL

  const handleOpenStatusModal = () => {
    setShowStatusModal(true);
  };

  const handleCloseStatusModal = () => {
    setShowStatusModal(false);
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen pt-20 pb-12 font-poppins text-gray-800 flex justify-center items-center">
        <div className="text-center text-xl font-semibold text-blue-600">Memuat status pendaftaran...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen pt-20 pb-12 font-poppins text-gray-800 flex justify-center items-center">
        <div className="container mx-auto px-4 max-w-2xl bg-white rounded-2xl shadow-lg p-8 my-8 text-center text-red-600">
          <h1 className="text-3xl font-bold mb-4">Kesalahan</h1>
          <p className="text-lg mb-6">{error}</p>
          <Link
            to={`/eduevents/all`}
            className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg transition-colors duration-300"
          >
            Kembali ke Daftar Kompetisi
          </Link>
        </div>
      </div>
    );
  }

  // Jika status pendaftaran belum dimuat atau tidak ada (misal, belum terdaftar)
  if (!registrationStatus) {
    return (
        <div className="bg-gray-50 min-h-screen pt-20 pb-12 font-poppins text-gray-800 flex justify-center items-center">
            <div className="container mx-auto px-4 max-w-2xl bg-white rounded-2xl shadow-lg p-8 my-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Status Pendaftaran Tidak Ditemukan</h1>
                <p className="text-lg text-gray-700 mb-6">
                    Sepertinya Anda belum terdaftar untuk kompetisi ini, atau terjadi masalah saat memuat data.
                </p>
                <Link
                    to={`/eduevents/detail/${id}`} // Arahkan ke halaman detail kompetisi untuk mendaftar
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md"
                >
                    Kembali ke Detail Kompetisi
                </Link>
                <Link
                    to={`/eduevents/all`}
                    className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg transition-colors duration-300 ml-4"
                >
                    Lihat Semua Kompetisi
                </Link>
            </div>
        </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-20 pb-12 font-poppins text-gray-800 flex justify-center items-center">
      <div className="container mx-auto px-4 max-w-2xl bg-white rounded-2xl shadow-lg p-8 my-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Status Pendaftaran Kompetisi</h1>
        <p className="text-lg text-gray-700 mb-6">
          Anda sudah terdaftar untuk **"{competitionTitle}"**.
        </p>
        <p className="text-gray-600 mb-8">
          Silakan cek status pendaftaran Anda di halaman berikut untuk informasi lebih lanjut.
        </p>
        <button
          onClick={handleOpenStatusModal}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md"
        >
          Cek Status Pendaftaran Saya
        </button>
        <Link
          to={`/eduevents/all`}
          className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg transition-colors duration-300 ml-4"
        >
          Kembali
        </Link>
      </div>

      {showStatusModal && (
        <StatusModal
          onClose={handleCloseStatusModal}
          currentStatus={registrationStatus} // Meneruskan status dari BE ke modal
        />
      )}
    </div>
  );
};

export default CheckStatusPage;