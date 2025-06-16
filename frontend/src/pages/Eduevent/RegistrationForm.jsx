// src/components/RegistrationForm.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true; // Penting: Pastikan ini ada di sini atau di konfigurasi global Axios

const RegistrationForm = () => {
  const { id } = useParams(); // 'id' di sini adalah UUID dari kompetisi
  const navigate = useNavigate();
  const [competitionTitle, setCompetitionTitle] = useState('');
  // const [hasRegistered, setHasRegistered] = useState(false); // State ini akan disederhanakan
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    jenjang_pendidikan: '',
    instansi_pendidikan: '',
    jurusan: '',
    no_telp: '',
    email: '',
    alasan_mengikuti: '',
    kompetisiId: null, // Ini akan diisi dengan ID numerik dari BE
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [currentCompetition, setCurrentCompetition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUserRegistered, setIsUserRegistered] = useState(false); // State baru untuk cek registrasi

  useEffect(() => {
    console.log("DEBUG: useEffect - Mulai mengambil detail kompetisi...");
    const fetchCompetitionDetailsAndCheckRegistration = async () => {
      setLoading(true);
      setError(null);
      try {
        const competitionResponse = await axios.get(`http://localhost:5000/kompetisi/${id}`);
        const fetchedCompetition = competitionResponse.data;

        setCompetitionTitle(fetchedCompetition.judul);
        setCurrentCompetition({
          id: fetchedCompetition.id,
          uuid: fetchedCompetition.uuid,
          title: fetchedCompetition.judul,
          image: fetchedCompetition.gambar,
          date: fetchedCompetition.tanggal_mulai_pendaftaran,
          isFree: fetchedCompetition.biaya_pendaftaran === 0,
          level: fetchedCompetition.tingkat_kompetisi,
        });

        setFormData((prevData) => ({
          ...prevData,
          kompetisiId: fetchedCompetition.id,
        }));
        console.log(`DEBUG: useEffect - Detail kompetisi "${fetchedCompetition.judul}" (ID: ${fetchedCompetition.id}) berhasil dimuat.`);

        // --- Perbaikan Utama di Sini: Cek Pendaftaran & Redirect ---
        try {
          const registrationCheckResponse = await axios.get(
            `http://localhost:5000/kompetisi-registrasi/user/${fetchedCompetition.uuid}`
          );
          
          if (registrationCheckResponse.data.isRegistered && registrationCheckResponse.data.registrationData) {
            setIsUserRegistered(true); // Set true jika sudah terdaftar
            // Simpan data pendaftaran lengkap ke localStorage
            localStorage.setItem(`registration_${fetchedCompetition.uuid}`, JSON.stringify(registrationCheckResponse.data.registrationData));
            console.log("DEBUG: useEffect - Pengguna sudah terdaftar. Mengalihkan ke halaman status...");
            navigate(`/eduevents/check-status/${fetchedCompetition.uuid}`); 
            return; // Penting: Hentikan eksekusi lebih lanjut jika sudah terdaftar
          } else {
            setIsUserRegistered(false); // Set false jika belum terdaftar
            console.log("DEBUG: useEffect - Pengguna belum terdaftar.");
            // Hapus data registrasi lama dari localStorage jika tidak terdaftar
            localStorage.removeItem(`registration_${fetchedCompetition.uuid}`);
          }
        } catch (regError) {
          // Tangani 404 (Not Found) atau 401 (Unauthorized) sebagai "belum terdaftar"
          if (regError.response && (regError.response.status === 404 || regError.response.status === 401)) {
            setIsUserRegistered(false);
            console.warn(`DEBUG: useEffect - Cek pendaftaran: ${regError.response.status} - ${regError.response.data?.msg || 'Belum terdaftar atau belum login.'}`);
            // Hapus data registrasi lama dari localStorage jika error
            localStorage.removeItem(`registration_${fetchedCompetition.uuid}`);
          } else {
            console.error('DEBUG: useEffect - Error saat memeriksa status pendaftaran:', regError.response ? regError.response.data : regError.message);
            setError('Gagal memeriksa status pendaftaran Anda. Silakan coba lagi.');
            setIsUserRegistered(false);
          }
        }
      } catch (err) {
        console.error('DEBUG: useEffect - Error saat mengambil detail kompetisi:', err.response ? err.response.data : err.message);
        setError('Gagal memuat detail kompetisi atau kompetisi tidak ditemukan.');
        setCompetitionTitle('Kompetisi Tidak Ditemukan');
        navigate('/eduevents/all'); // Redirect jika kompetisi tidak ditemukan
      } finally {
        setLoading(false);
        console.log("DEBUG: useEffect - Selesai memuat.");
      }
    };

    fetchCompetitionDetailsAndCheckRegistration();
  }, [id, navigate]); // Dependensi: id dan navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("DEBUG: handleSubmit - Tombol 'Submit' diklik!");

    setSubmissionStatus(null);
    setError(null);

    if (!formData.kompetisiId) {
      setSubmissionStatus('error');
      setError('ID kompetisi tidak ditemukan. Silakan refresh halaman atau coba lagi.');
      console.error("DEBUG: handleSubmit - ERROR: kompetisiId masih null.");
      return;
    }

    console.log("DEBUG: handleSubmit - Mengirim data pendaftaran:", formData);

    try {
      const response = await axios.post('http://localhost:5000/kompetisi-registrasi', formData);
      console.log("DEBUG: handleSubmit - Respon dari backend:", response.data);

      if (response.status === 201) {
        setSubmissionStatus('success');
        console.log("DEBUG: handleSubmit - Pendaftaran berhasil!");

        // Setelah pendaftaran berhasil, ambil lagi data pendaftaran dari backend
        // Ini memastikan kita mendapatkan status default ('diproses') dan data lainnya
        const registrationCheckResponse = await axios.get(
            `http://localhost:5000/kompetisi-registrasi/user/${id}`
        );
        if (registrationCheckResponse.data.isRegistered && registrationCheckResponse.data.registrationData) {
            localStorage.setItem(`registration_${id}`, JSON.stringify(registrationCheckResponse.data.registrationData));
        }
        
        setIsUserRegistered(true); // Perbarui state ini juga
        // Hapus entri lama jika masih ada (ini untuk migrasi dari 'registeredCompetitions')
        localStorage.removeItem('registeredCompetitions'); 

        // Redirect ke halaman status kompetisi setelah berhasil mendaftar
        setTimeout(() => navigate(`/eduevents/check-status/${id}`), 2000); 
      } else {
        setSubmissionStatus('error');
        setError(response.data.msg || 'Terjadi kesalahan tidak terduga saat pendaftaran.');
        console.error("DEBUG: handleSubmit - Respon tidak terduga (bukan 201):", response.status, response.data);
      }
    } catch (error) {
      console.error('DEBUG: handleSubmit - Terjadi kesalahan saat pendaftaran:', error.response ? error.response.data : error.message);
      setSubmissionStatus('error');
      setError(error.response?.data?.msg || 'Terjadi kesalahan server saat pendaftaran. Silakan coba lagi.');

      if (error.response && error.response.status === 401) {
        console.log("DEBUG: handleSubmit - Menerima 401 Unauthorized, mengalihkan ke halaman login.");
        navigate('/login');
      }
      // Tambahan: Tangani error 409 Conflict jika backend mengindikasikan sudah terdaftar
      else if (error.response && error.response.status === 409) {
          setError('Anda sudah terdaftar untuk kompetisi ini!');
          console.log("DEBUG: handleSubmit - Menerima 409 Conflict, sudah terdaftar.");
          // Jika sudah terdaftar, coba ambil datanya dan redirect
          try {
              const existingRegResponse = await axios.get(`http://localhost:5000/kompetisi-registrasi/user/${id}`);
              if (existingRegResponse.data.isRegistered && existingRegResponse.data.registrationData) {
                  localStorage.setItem(`registration_${id}`, JSON.stringify(existingRegResponse.data.registrationData));
                  setIsUserRegistered(true);
                  setTimeout(() => navigate(`/eduevents/check-status/${id}`), 1000);
              }
          } catch (fetchErr) {
              console.error("DEBUG: handleSubmit - Gagal mengambil data registrasi yang sudah ada:", fetchErr);
          }
      }
    }
  };

  // --- Bagian Rendering UI ---
  // Jika loading, atau ada error fatal saat memuat detail kompetisi
  if (loading) {
    return <div className="text-center py-10 text-xl font-semibold text-blue-600">Memuat detail kompetisi...</div>;
  }

  if (error && !currentCompetition) {
    return <div className="text-center py-10 text-xl font-semibold text-red-600">{error}</div>;
  }

  // Jika currentCompetition tidak ditemukan setelah loading selesai dan tidak ada error
  if (!currentCompetition) {
    return <div className="text-center py-10 text-xl font-semibold text-gray-500">Kompetisi tidak ditemukan.</div>;
  }

  // Jika sudah terdaftar, tampilkan pesan dan redirect
  // Catatan: Redirect sudah dilakukan di useEffect, ini hanya sebagai fallback tampilan
  if (isUserRegistered) { // Menggunakan state baru
    return (
      <div className="bg-gray-50 min-h-screen pt-20 pb-12 font-poppins text-gray-800 flex justify-center items-center">
        <div className="container mx-auto px-4 max-w-2xl bg-white rounded-2xl shadow-lg p-8 my-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Status Pendaftaran Kompetisi</h1>
          <p className="text-lg text-green-700 font-semibold mb-6">
            Anda sudah terdaftar untuk "{competitionTitle}"!
          </p>
          <p className="text-gray-600 mb-8">
            Anda akan dialihkan ke halaman status kompetisi dalam beberapa saat.
          </p>
          <Link
            to={`/eduevents/check-status/${id}`}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md"
          >
            Cek Status Pendaftaran Saya
          </Link>
        </div>
      </div>
    );
  }

  // Render form jika belum terdaftar
  return (
    <div className="bg-gray-50 min-h-screen pt-20 pb-12 font-poppins text-gray-800 flex justify-center items-start lg:items-center">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Kartu Detail Kompetisi di sisi kiri */}
          <div className="lg:w-1/3 w-full bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between">
            <img
              src={currentCompetition.image}
              alt={currentCompetition.title}
              className="w-full h-auto object-cover rounded-xl mb-6"
            />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentCompetition.title}</h2>
            <div className="space-y-2 text-gray-700 text-sm">
              <div className="flex items-center">
                <img src="/img/eduevent/img_calendar.svg" alt="Calendar" className="w-[1rem] h-[1rem] mr-2 flex-shrink-0 relative" />
                <p className="leading-tight">Tanggal Mulai Pendaftaran: {new Date(currentCompetition.date).toLocaleDateString('id-ID')}</p>
              </div>
              <div className="flex items-center">
                <img src="/img/eduevent/img_usercheck.svg" alt="Status" className="w-[1rem] h-[1rem] mr-2 flex-shrink-0 relative" />
                <p className="leading-tight">{currentCompetition.isFree ? 'Gratis tanpa syarat bayar' : 'Berbayar'}</p>
              </div>
              <div className="flex items-center">
                <img src="/img/eduevent/img_circle.svg" alt="Level" className="w-[1rem] h-[1rem] mr-2 flex-shrink-0 relative" />
                <p className="leading-tight">tingkat {currentCompetition.level.charAt(0).toUpperCase() + currentCompetition.level.slice(1)}</p>
              </div>
            </div>
          </div>

          {/* Form Pendaftaran di sisi kanan */}
          <div className="lg:w-2/3 w-full bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Form Pendaftaran Kompetisi</h1>

            {/* Form pendaftaran */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="nama_lengkap" className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap :</label>
                <input
                  type="text"
                  id="nama_lengkap"
                  name="nama_lengkap"
                  value={formData.nama_lengkap}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="jenjang_pendidikan" className="block text-sm font-medium text-gray-700 mb-1">Jenjang Pendidikan :</label>
                <input
                  type="text"
                  id="jenjang_pendidikan"
                  name="jenjang_pendidikan"
                  value={formData.jenjang_pendidikan}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="instansi_pendidikan" className="block text-sm font-medium text-gray-700 mb-1">Instansi Pendidikan :</label>
                <input
                  type="text"
                  id="instansi_pendidikan"
                  name="instansi_pendidikan"
                  value={formData.instansi_pendidikan}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="jurusan" className="block text-sm font-medium text-gray-700 mb-1">Jurusan :</label>
                <input
                  type="text"
                  id="jurusan"
                  name="jurusan"
                  value={formData.jurusan}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="no_telp" className="block text-sm font-medium text-gray-700 mb-1">No.Telp/HP :</label>
                <input
                  type="tel"
                  id="no_telp"
                  name="no_telp"
                  value={formData.no_telp}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email :</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="alasan_mengikuti" className="block text-sm font-medium text-gray-700 mb-1">Alasan Mengikuti Kompetisi :</label>
                <textarea
                  id="alasan_mengikuti"
                  name="alasan_mengikuti"
                  value={formData.alasan_mengikuti}
                  onChange={handleChange}
                  rows="3"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                ></textarea>
              </div>

              {submissionStatus === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                  Pendaftaran berhasil! Mengalihkan...
                </div>
              )}

              {submissionStatus === 'error' && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  {error || 'Terjadi kesalahan saat pendaftaran. Silakan coba lagi.'}
                </div>
              )}

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;