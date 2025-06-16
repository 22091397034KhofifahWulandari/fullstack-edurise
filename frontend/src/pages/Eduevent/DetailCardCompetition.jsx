import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios'; // Import axios untuk melakukan HTTP request

const DetailCardCompetiton = () => {
  const { id } = useParams(); // ID di sini adalah UUID dari backend
  const [competitionDetail, setCompetitionDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State untuk menangani error
  const [isSaved, setIsSaved] = useState(false); // State baru untuk status simpan

  // --- DATA FASILITAS DAN HADIAH (Ini akan disesuaikan jika BE menyediakan data spesifik) ---
  // Untuk saat ini, kita biarkan commonPrizes sebagai fallback atau jika memang semua kompetisi punya ini
  const commonPrizes = [
    { icon: '/img/eduevent/Symbol1.png', text: 'Medali Juara, Honorable Mention, dan Finalis', subtext: 'Untuk Peserta di Babak Final' },
    { icon: '/img/eduevent/Symbol2.png', text: 'Beasiswa', subtext: 'Beasiswa untuk juara dengan tingkat yang dikategorikan' },
    { icon: '/img/eduevent/Symbol3.png', text: 'E-Plagam dan E-Sertifikat', subtext: 'Untuk Peserta dan Juara' },
    { icon: '/img/eduevent/Symbol4.png', text: 'Piala Juara', subtext: 'Untuk Juara Terbaik setiap Bidang' },
  ];

  useEffect(() => {
    const fetchCompetitionDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:5000/kompetisi/${id}`); // Sesuaikan URL API Anda
        const data = response.data;

        // Memetakan data dari backend ke struktur state yang diharapkan frontend
        const mappedDetail = {
          id: data.uuid, // Menggunakan uuid dari backend sebagai id
          image: data.gambar || '/img/eduevent/placeholder.png', // Fallback gambar jika tidak ada
          title: data.judul,
          date: `${new Date(data.tanggal_mulai_pendaftaran).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })} - ${new Date(data.tanggal_akhir_pendaftaran).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })}`,
          isFree: data.biaya_pendaftaran === 0 || data.biaya_pendaftaran === '0', // Asumsi 0 berarti gratis
          level: data.tingkat_kompetisi,
          scholarshipSectionTitle: 'Fasilitas dan Hadiah', // Ini mungkin hardcoded jika BE tidak menyediakan
          scholarshipSubTitle: 'Dapatkan Beasiswa Dari kompetisi yang kategori!', // Ini mungkin hardcoded jika BE tidak menyediakan
          prizes: commonPrizes, // Gunakan commonPrizes atau sesuaikan jika BE punya data hadiah spesifik
          about: data.tentang_kompetisi,
          terms: data.syarat_ketentuan ? data.syarat_ketentuan.split('\n') : [], // Asumsi syarat_ketentuan adalah string dipisahkan newline
          scholarshipCriteria: data.ketentuan_penilaian ? data.ketentuan_penilaian.split('\n') : [], // Menggunakan ketentuan_penilaian untuk kriteria beasiswa
          benefits: data.manfaat_partisipasi ? data.manfaat_partisipasi.split('\n').map(b => ({ desc: b, amount: '' })) : [], // Menggunakan manfaat_partisipasi untuk benefits
        };

        setCompetitionDetail(mappedDetail);

        // Cek apakah kompetisi ini sudah tersimpan di localStorage
        const savedCompetitions = JSON.parse(localStorage.getItem('savedCompetitions')) || [];
        setIsSaved(savedCompetitions.some(comp => comp.id === mappedDetail.id));

      } catch (err) {
        console.error("Gagal mengambil detail kompetisi:", err);
        setError("Gagal memuat detail kompetisi. Silakan coba lagi nanti.");
        setCompetitionDetail(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitionDetail();
  }, [id]);

  const handleSaveToggle = () => {
    let savedCompetitions = JSON.parse(localStorage.getItem('savedCompetitions')) || [];
    if (isSaved) {
      savedCompetitions = savedCompetitions.filter(comp => comp.id !== competitionDetail.id);
      alert('Kompetisi dihapus dari daftar simpan!');
    } else {
      savedCompetitions.push(competitionDetail);
      alert('Kompetisi disimpan!');
    }
    localStorage.setItem('savedCompetitions', JSON.stringify(savedCompetitions));
    setIsSaved(!isSaved);
  };

  if (loading) {
    return <div className="text-center py-10 text-xl font-semibold">Memuat detail kompetisi...</div>;
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center text-red-600 text-lg">
          <p>{error}</p>
          <Link to="/eduevents/all" className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Kembali ke Daftar Kompetisi
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  if (!competitionDetail) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center text-red-600 text-lg">
          <p>Mohon maaf, detail kompetisi tidak ditemukan.</p>
          <Link to="/eduevents/all" className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Kembali ke Daftar Kompetisi
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen pt-20 pb-12 font-poppins text-gray-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8 mb-12 items-stretch">
            <div className="lg:w-1/2 flex flex-col gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-center items-center relative min-h-[250px] lg:min-h-[400px]">
                <img
                  src="/img/eduevent/tropy.png" // Gambar ini statis, bukan dari BE
                  alt="Trophy Podium"
                  className="w-full max-w-[350px] h-auto object-contain"
                />
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 flex-grow flex flex-col justify-between">
                  <div>
                      <h3 className="text-lg font-bold text-blue-600 mb-2">{competitionDetail.scholarshipSectionTitle}</h3>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                          {competitionDetail.scholarshipSubTitle}
                      </h2>
                      <div className="space-y-5">
                          {competitionDetail.prizes && competitionDetail.prizes.map((prize, index) => (
                              <div key={index} className="flex items-start">
                                  <img src={prize.icon} alt={prize.text} className="w-7 h-7 mr-4 flex-shrink-0" />
                                  <div>
                                      <p className="font-semibold text-gray-900 text-lg">{prize.text}</p>
                                      <p className="text-gray-600 text-sm">{prize.subtext}</p>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
            </div>

            <div className="lg:w-1/2 flex flex-col gap-6">
              <div className="bg-white rounded-2xl shadow-lg relative overflow-hidden flex-grow flex justify-center items-center p-4">
                <img
                  src={competitionDetail.image}
                  alt={competitionDetail.title}
                  className="w-full h-auto object-contain max-h-[500px]"
                />
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 flex-grow flex flex-col justify-between">
                  <div>
                    {/* Judul Kompetisi dan Tombol Simpan */}
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{competitionDetail.title}</h2>
                      <button
                        onClick={handleSaveToggle}
                        className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
                        title={isSaved ? "Hapus dari Tersimpan" : "Simpan Kompetisi"}
                      >
                        {/* Ikon Bookmark */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-7 w-7 ${isSaved ? 'text-blue-500 fill-current' : 'text-gray-400'}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Detail Kompetisi (Tanggal, Status, Level) */}
                    <div className="space-y-2 text-gray-700 text-sm">
                      <div className="flex items-center">
                          <img src="/img/eduevent/img_calendar.svg" alt="Calendar" className="w-[1rem] h-[1rem] mr-2 flex-shrink-0 relative" />
                          <p className="leading-tight">{competitionDetail.date}</p>
                      </div>
                      <div className="flex items-center">
                          <img src="/img/eduevent/img_usercheck.svg" alt="Status" className="w-[1rem] h-[1rem] mr-2 flex-shrink-0 relative" />
                          <p className="leading-tight">{competitionDetail.isFree ? 'Gratis tanpa syarat bayar' : 'Berbayar'}</p>
                      </div>
                      <div className="flex items-center">
                          <img src="/img/eduevent/img_circle.svg" alt="Level" className="w-[1rem] h-[1rem] mr-2 flex-shrink-0 relative" />
                          <p className="leading-tight">tingkat {competitionDetail.level.charAt(0).toUpperCase() + competitionDetail.level.slice(1)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                      <Link
                          to={`/eduevents/${competitionDetail.id}/registration`}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md inline-block text-center"
                      >
                          Daftar Sekarang
                      </Link>
                  </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
                <a href="#about" className="whitespace-nowrap py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">Tentang Kompetisi</a>
                <a href="#terms" className="whitespace-nowrap py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">Syarat & Ketentuan</a>
                {competitionDetail.scholarshipCriteria && competitionDetail.scholarshipCriteria.length > 0 && (
                  <a href="#scholarshipCriteria" className="whitespace-nowrap py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">Ketentuan Beasiswa</a>
                )}
                {competitionDetail.benefits && competitionDetail.benefits.length > 0 && (
                  <a href="#benefits" className="whitespace-nowrap py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">Bantuan Yang Didapatkan</a>
                )}
              </nav>
            </div>

            <div className="space-y-8">
              <div id="about" className="p-4 rounded-lg border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Tentang Kompetisi</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {competitionDetail.about || 'Deskripsi tentang kompetisi ini belum tersedia.'}
                </p>
              </div>
              <div id="terms" className="p-4 rounded-lg border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Syarat & Ketentuan</h2>
                <ul className="list-decimal list-inside text-gray-700 leading-relaxed space-y-1">
                  {competitionDetail.terms && competitionDetail.terms.length > 0 ? (
                    competitionDetail.terms.map((term, index) => (
                      <li key={index}>{term}</li>
                    ))
                  ) : (
                    <li>Syarat & ketentuan belum tersedia.</li>
                  )}
                </ul>
              </div>
              {competitionDetail.scholarshipCriteria && competitionDetail.scholarshipCriteria.length > 0 && (
                <div id="scholarshipCriteria" className="p-4 rounded-lg border border-gray-100 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Ketentuan Beasiswa</h2>
                  <ul className="list-decimal list-inside text-gray-700 leading-relaxed space-y-1">
                    {competitionDetail.scholarshipCriteria.map((criteria, index) => (
                      <li key={index}>{criteria}</li>
                    ))}
                  </ul>
                </div>
              )}
              {competitionDetail.benefits && competitionDetail.benefits.length > 0 && (
                <div id="benefits" className="p-4 rounded-lg border border-gray-100 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Bantuan Yang Didapatkan</h2>
                  <ul className="list-decimal list-inside text-gray-700 leading-relaxed space-y-1">
                    {competitionDetail.benefits.map((benefit, index) => (
                      <li key={index}>
                        {benefit.desc} {benefit.amount ? `(${benefit.amount})` : ''}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="mt-8 text-center">
              <Link to="/eduevents/all" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                Kembali ke Daftar Kompetisi
              </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetailCardCompetiton;