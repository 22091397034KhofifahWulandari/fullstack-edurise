import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import EdueventCard from "../eduevent/EdueventCard"; // Pastikan path benar
import EdueventButton from "../eduevent/EdueventBtn"; // Pastikan path benar
import axios from 'axios'; // Import axios untuk melakukan HTTP requests

const WebminarSection = () => {
  const [activeYear, setActiveYear] = useState('all');
  const [activePeriod, setActivePeriod] = useState('all');
  const [webminars, setWebminars] = useState([]); // State untuk menyimpan data webinar dari API
  const [loading, setLoading] = useState(true); // State untuk indikator loading
  const [error, setError] = useState(null); // State untuk menangani error

  // Fungsi untuk mengambil data webinar dari API
  const fetchWebinars = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Panggil endpoint getWebinars. Anda bisa menambahkan query params jika ingin filter di BE
      // Namun, untuk section ini, kita asumsikan ambil semua dan filter di frontend
      const response = await axios.get('http://localhost:5000/webinars'); // Ganti dengan URL API Anda
      // Memetakan data dari backend ke format yang diharapkan komponen frontend
      const formattedWebinars = response.data.map(webinar => ({
        id: webinar.uuid, // Menggunakan uuid sebagai id untuk routing detail
        image: webinar.gambar || '/img/eduevent/default_image.png', // Fallback gambar default jika tidak ada
        title: webinar.judul,
        date: webinar.tanggal_pelaksanaan, // Tanggal dari backend
        year: new Date(webinar.tanggal_pelaksanaan).getFullYear().toString(), // Ekstrak tahun
        description: webinar.deskripsi,
        // Properti lain dari backend yang mungkin relevan untuk detail:
        link_webinar: webinar.link_webinar,
        link_rekaman: webinar.link_rekaman,
        link_sertifikat: webinar.link_sertifikat,
        status: webinar.status,
        penyelenggara: webinar.penyelenggara,
        narasumber: webinar.narasumber,
        kategori: webinar.kategori,
        jam_pelaksanaan: webinar.jam_pelaksanaan,
      }));
      setWebminars(formattedWebinars);
    } catch (err) {
      console.error("Error fetching webinars:", err);
      setError("Gagal memuat webinar. Silakan coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWebinars();
  }, [fetchWebinars]);

  const allYears = useMemo(() => {
    const years = new Set(webminars.map(webminar => webminar.year));
    // Mengurutkan tahun dari terbaru ke terlama, dan 'all' di paling depan
    return ['all', ...Array.from(years)].sort((a, b) => {
      if (a === 'all') return -1;
      if (b === 'all') return 1;
      return parseInt(b) - parseInt(a);
    });
  }, [webminars]);

  const periods = [
    { id: 'all', label: 'Semua Event' },
    { id: 'jan-mar', label: 'Jan-Mar' },
    { id: 'apr-jun', label: 'Apr-Jun' },
    { id: 'jul-sep', label: 'Jul-Sep' },
    { id: 'oct-dec', label: 'Okt-Des' },
  ];

  const getPeriodFromDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error("Invalid date format:", dateString);
      return '';
    }
    const month = date.getMonth() + 1; // getMonth() returns 0-11

    if (month >= 1 && month <= 3) return 'jan-mar';
    if (month >= 4 && month <= 6) return 'apr-jun';
    if (month >= 7 && month <= 9) return 'jul-sep';
    if (month >= 10 && month <= 12) return 'oct-dec';
    return '';
  };

  const filteredWebminars = useMemo(() => {
    return webminars.filter((webminar) => {
      const webminarYear = webminar.year;
      const webminarPeriod = getPeriodFromDate(webminar.date);

      const yearMatches = activeYear === 'all' || webminarYear === activeYear;
      const periodMatches = activePeriod === 'all' || webminarPeriod === activePeriod;

      return yearMatches && periodMatches;
    });
  }, [activeYear, activePeriod, webminars]);

  const periodsWithCount = useMemo(() => {
    return periods.map(period => {
      const count = webminars.filter(webminar => {
        const webminarYear = webminar.year;
        const webminarPeriod = getPeriodFromDate(webminar.date);

        const yearFilterApplies = activeYear === 'all' || webminarYear === activeYear;
        const periodFilterApplies = period.id === 'all' || webminarPeriod === period.id;

        return yearFilterApplies && periodFilterApplies;
      }).length;
      return { ...period, count };
    });
  }, [activeYear, periods, webminars]);

  const allYearsTotalCount = useMemo(() => {
    return webminars.length;
  }, [webminars]);

  return (
    <section className="bg-[#ebf1fa] py-12">
      <div className="container mx-auto px-4">
        {/* Header Bagian Webminar */}
        <div className="flex items-center mb-8">
          <img
            src="/img/eduevent/img_ellipse_1.png"
            alt="Webminar Icon"
            className="w-[50px] h-[50px] rounded-full mr-4"
          />
          <h2 className="font-poppins font-bold text-[24px] text-black">
            Webinar
          </h2>
        </div>

        {/* Bagian Filter (Tahun & Periode) */}
        <div className="flex flex-wrap gap-4 mb-8">
          {/* Filter Tahun (Dropdown) */}
          <div className="relative">
            <select
              value={activeYear}
              onChange={(e) => {
                setActiveYear(e.target.value);
                setActivePeriod('all'); // Reset periode saat tahun berubah
              }}
              className="bg-white rounded-lg px-4 py-2 font-poppins font-bold text-[16px] text-black appearance-none pr-8 cursor-pointer w-fit h-[40px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Semua Tahun ({allYearsTotalCount} Rekaman)</option>
              {allYears.filter(year => year !== 'all').map((year) => (
                <option key={year} value={year}>
                  {year} ({webminars.filter(web => web.year === year).length} Rekaman)
                </option>
              ))}
            </select>
            <img
              src="/img/eduevent/img_chevronright.svg"
              alt="Dropdown arrow"
              className="w-[21px] h-[24px] absolute right-2 top-8 transform -translate-y-1/2 pointer-events-none"
            />
          </div>

          {/* Filter Periode - Hanya tampilkan jika tahun spesifik dipilih */}
          {activeYear !== 'all' && (
            <div className="flex flex-wrap gap-4">
              {periodsWithCount.map((period) => (
                <div
                  key={period.id}
                  onClick={() => setActivePeriod(period.id)}
                  className={`
                    bg-white rounded-lg px-6 py-2 flex items-center h-[40px]
                    ${activePeriod === period.id ? 'border-2 border-black' : 'border border-gray-200'}
                    cursor-pointer transition-all duration-200
                    hover:border-black
                    min-w-fit max-w-xs justify-between
                  `}
                >
                  <span className="font-poppins text-[18px] text-[#575858] mr-2 whitespace-nowrap">
                    {period.label}
                  </span>
                  <div className="h-[25px] w-[1px] bg-gray-300 mx-2 flex-shrink-0"></div>
                  <span className="font-poppins text-[12px] text-black whitespace-nowrap">
                    {period.count} Rekaman
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bagian Kartu Webinar */}
        {loading ? (
          <p className="col-span-full text-center text-gray-600 py-8">Memuat webinar...</p>
        ) : error ? (
          <p className="col-span-full text-center text-red-600 py-8">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredWebminars.length > 0 ? (
              filteredWebminars.map((webminar) => (
                <EdueventCard
                  key={webminar.id} // UUID dari BE digunakan sebagai key
                  id={webminar.id} // UUID juga di-pass sebagai ID untuk routing
                  type="Webminar" // Ini akan membuat link ke /webinardetail/{id} di dalam EdueventCard
                  image={webminar.image}
                  title={webminar.title}
                  date={webminar.date}
                  description={webminar.description}
                  // Tidak perlu buttonText dan buttonVariant di sini,
                  // karena link detail sudah ditangani oleh prop 'type' dan 'id'
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600 py-8">
                Tidak ada Webminar ditemukan untuk filter yang dipilih.
              </p>
            )}
          </div>
        )}

        {/* Tombol "Selengkapnya" global */}
        {/* Tombol ini mengarahkan ke halaman daftar semua webinar, bukan detail spesifik */}
        <div className="flex justify-end mt-12">
          <Link to="/webinar"> {/* Ini akan mengarah ke halaman daftar semua webinar */}
            <EdueventButton
              variant="primary"
              className="w-[295px] h-[40px] flex items-center justify-center"
            >
              Lihat Semua Webinar
            </EdueventButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WebminarSection;