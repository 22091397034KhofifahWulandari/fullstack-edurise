// src/components/eduevent/CompetitionSection.jsx

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import EdueventCard from "./EdueventCard";
import EdueventButton from "./EdueventBtn";
import axios from 'axios';

const CompetitionSection = () => {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeYear, setActiveYear] = useState('all');
  const [activePeriod, setActivePeriod] = useState('all');

  const [availableYears, setAvailableYears] = useState([]);

  // Definisi periode untuk filter
  const periods = useMemo(() => ([
    { id: 'all', label: 'Semua Event' },
    { id: 'jan-mar', label: 'Jan-Mar' },
    { id: 'apr-jun', label: 'Apr-Jun' },
    { id: 'jul-sep', label: 'Jul-Sep' },
    { id: 'oct-dec', label: 'Okt-Des' },
  ]), []);

  // Fungsi untuk menentukan periode dari string tanggal
  const getPeriodFromDate = useCallback((dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.warn("Invalid date format for period calculation:", dateString); // Gunakan warn daripada error
      return '';
    }
    const month = date.getMonth() + 1; // getMonth() returns 0-11

    if (month >= 1 && month <= 3) return 'jan-mar';
    if (month >= 4 && month <= 6) return 'apr-jun';
    if (month >= 7 && month <= 9) return 'jul-sep';
    if (month >= 10 && month <= 12) return 'oct-dec';
    return '';
  }, []);

  // Effect untuk mengambil data kompetisi dari backend
  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        setLoading(true);
        // Pastikan URL API Anda benar, gunakan endpoint 'kompetisis' sesuai controller BE Anda
        const response = await axios.get('http://localhost:5000/kompetisi');

        const fetchedCompetitions = response.data.map(comp => {
          // Logika untuk menentukan apakah kompetisi gratis
          // Memeriksa string "Gratis" atau nilai numerik 0
          const isCompetitionFree =
            String(comp.biaya_pendaftaran).toLowerCase() === "gratis" || // Konversi ke string & lowercase untuk cek "Gratis"
            parseFloat(comp.biaya_pendaftaran) === 0; // Pastikan ini juga dicek untuk angka 0

          return {
            id: comp.uuid, // Gunakan uuid sebagai id unik
            // Handle path gambar: jika gambar dari BE adalah path relatif, tambahkan base URL backend
            image: comp.gambar,
            title: comp.judul,
            // Anda mungkin ingin menggunakan tanggal_akhir_pendaftaran jika itu lebih relevan sebagai 'date'
            date: comp.tanggal_mulai_pendaftaran,
            year: new Date(comp.tanggal_mulai_pendaftaran).getFullYear().toString(),
            isFree: isCompetitionFree, // Meneruskan status gratis/berbayar
            level: comp.tingkat_kompetisi,
          };
        });
        setCompetitions(fetchedCompetitions);

        // Menghasilkan daftar tahun unik dari data yang diambil
        // Filter tahun 'all' tidak diperlukan di sini karena ini adalah tahun aktual
        const uniqueYears = [...new Set(fetchedCompetitions.map(comp => comp.year))]
          .sort((a, b) => parseInt(b) - parseInt(a)); // Urutkan dari tahun terbaru
        setAvailableYears(uniqueYears);

      } catch (err) {
        setError("Gagal memuat data kompetisi. Silakan coba lagi nanti.");
        console.error("Error fetching competitions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitions();
  }, []); // Dependensi kosong agar hanya dijalankan sekali saat komponen di-mount

  // Memfilter kompetisi berdasarkan tahun dan periode yang aktif
  const filteredCompetitions = useMemo(() => {
    return competitions.filter((comp) => {
      const compYear = comp.year;
      const compPeriod = getPeriodFromDate(comp.date);

      const yearMatches = activeYear === 'all' || compYear === activeYear;
      const periodMatches = activePeriod === 'all' || compPeriod === activePeriod;

      return yearMatches && periodMatches;
    });
  }, [activeYear, activePeriod, competitions, getPeriodFromDate]);

  // Menghitung jumlah kompetisi untuk setiap periode berdasarkan tahun aktif
  // Ini penting agar filter periode menampilkan hitungan yang akurat
  const periodsWithCount = useMemo(() => {
    return periods.map(period => {
      const count = competitions.filter(comp => {
        const compYear = comp.year;
        const compPeriod = getPeriodFromDate(comp.date);

        // Jika tahun aktif adalah 'all', hitung semua kompetisi yang cocok dengan periode
        // Jika tahun spesifik, hanya hitung yang cocok dengan tahun DAN periode
        const yearFilterApplies = activeYear === 'all' || compYear === activeYear;
        const periodFilterApplies = period.id === 'all' || compPeriod === period.id;

        return yearFilterApplies && periodFilterApplies;
      }).length;
      return { ...period, count };
    });
  }, [activeYear, periods, competitions, getPeriodFromDate]);

  // Menghitung total rekaman untuk opsi "Semua Tahun"
  const allYearsTotalCount = useMemo(() => {
    return competitions.length;
  }, [competitions]);

  // Tampilan loading dan error
  if (loading) {
    return (
      <section className="bg-[#ebf1fa] py-12">
        <div className="container mx-auto px-4 text-center text-gray-700 font-poppins text-lg">Memuat kompetisi...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-[#ebf1fa] py-12">
        <div className="container mx-auto px-4 text-center text-red-600 font-poppins text-lg">{error}</div>
      </section>
    );
  }

  return (
    <section className="bg-[#ebf1fa] py-12">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center mb-8">
          <img
            src="/img/eduevent/img_ellipse_1.png"
            alt="Competition Icon"
            className="w-[50px] h-[50px] rounded-full mr-4"
          />
          <h2 className="font-poppins font-bold text-[24px] text-black">
            Daftar Kompetisi
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 items-center"> {/* Tambahkan items-center untuk alignment */}
          {/* Year Filter (Dropdown) */}
          <div className="relative">
            <select
              value={activeYear}
              onChange={(e) => {
                setActiveYear(e.target.value);
                setActivePeriod('all'); // Selalu reset periode ke 'all' saat tahun berubah
              }}
              className="bg-white rounded-lg px-4 py-2 font-poppins font-bold text-[16px] text-black appearance-none pr-8 cursor-pointer w-fit h-[40px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Semua Tahun ({allYearsTotalCount} Rekaman)</option>
              {/* Hanya tampilkan tahun yang benar-benar ada di data */}
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year} ({competitions.filter(comp => comp.year === year).length} Rekaman)
                </option>
              ))}
            </select>
            <img
              src="/img/eduevent/img_chevronright.svg"
              alt="Dropdown arrow"
              className="w-[21px] h-[24px] absolute right-1 top-8 transform -translate-y-1/2 pointer-events-none"
            />
          </div>

          {/* Period Filters - Hanya tampilkan jika tahun spesifik dipilih */}
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

        {/* Competition Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredCompetitions.length > 0 ? (
            filteredCompetitions.map((competition) => (
              <EdueventCard
                key={competition.id}
                id={competition.id}
                type="competition"
                image={competition.image} // Path gambar sudah di-handle di mapping data
                title={competition.title}
                date={competition.date}
                isFree={competition.isFree}
                level={competition.level}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600 py-8 font-poppins">
              Tidak ada kompetisi ditemukan untuk filter yang dipilih.
            </p>
          )}
        </div>

        {/* View More Button */}
        <div className="flex justify-end mt-12">
          <Link to="/eduevents/all">
            <EdueventButton
              variant="primary"
              className="w-[295px] h-[40px] flex items-center justify-center"
            >
              Selengkapnya
            </EdueventButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CompetitionSection;