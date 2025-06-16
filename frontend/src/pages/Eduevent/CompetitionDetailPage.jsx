import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from 'react-router-dom';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import EdueventCard from "../../components/eduevent/EdueventCard";
import EdueventButton from "../../components/eduevent/EdueventBtn";
import axios from 'axios';

const CompetitionDetailPage = () => {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default filter tahun ke 'all' (Semua Tahun)
  const [activeYearFilter, setActiveYearFilter] = useState('all');
  const [activeMonthFilter, setActiveMonthFilter] = useState('all');

  const months = useMemo(() => ([
    { id: 'januari', label: 'Januari', monthNum: 0 },
    { id: 'februari', label: 'Februari', monthNum: 1 },
    { id: 'maret', label: 'Maret', monthNum: 2 },
    { id: 'april', label: 'April', monthNum: 3 },
    { id: 'mei', label: 'Mei', monthNum: 4 },
    { id: 'juni', label: 'Juni', monthNum: 5 },
    { id: 'juli', label: 'Juli', monthNum: 6 },
    { id: 'agustus', label: 'Agustus', monthNum: 7 },
    { id: 'september', label: 'September', monthNum: 8 },
    { id: 'oktober', label: 'Oktober', monthNum: 9 },
    { id: 'november', label: 'November', monthNum: 10 },
    { id: 'desember', label: 'Desember', monthNum: 11 },
  ]), []);

  const getMonthAndYearFromDate = useCallback((dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.warn("Invalid date format:", dateString);
      return { month: '', year: '', monthIndex: -1 };
    }
    const monthNames = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear().toString();
    return { month, year, monthIndex: date.getMonth() };
  }, []);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/kompetisi');

        const fetchedCompetitions = response.data.map(comp => {
          const isCompetitionFree =
            String(comp.biaya_pendaftaran).toLowerCase() === "gratis" ||
            parseFloat(comp.biaya_pendaftaran) === 0;

          return {
            id: comp.uuid,
            image: comp.gambar,
            title: comp.judul,
            date: comp.tanggal_mulai_pendaftaran,
            year: new Date(comp.tanggal_mulai_pendaftaran).getFullYear().toString(),
            isFree: isCompetitionFree,
            level: comp.tingkat_kompetisi,
          };
        });
        setCompetitions(fetchedCompetitions);

      } catch (err) {
        setError("Gagal memuat data kompetisi. Silakan coba lagi nanti.");
        console.error("Error fetching competitions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitions();
  }, []);

  // Mendapatkan semua tahun yang tersedia dari data kompetisi (untuk dropdown tahun)
  const allAvailableYears = useMemo(() => {
    const years = new Set(competitions.map(comp => comp.year));
    const sortedYears = Array.from(years).sort((a, b) => parseInt(b) - parseInt(a));
    // Tambahkan 'all' di awal daftar tahun
    return ['all', ...sortedYears];
  }, [competitions]);

  // Filter kompetisi berdasarkan tahun dan bulan yang aktif
  const filteredCompetitionsByMonth = useMemo(() => {
    return competitions.filter(comp => {
      const { year, monthIndex } = getMonthAndYearFromDate(comp.date);
      // Jika activeYearFilter adalah 'all', maka semua tahun cocok
      const yearMatches = activeYearFilter === 'all' || comp.year === activeYearFilter;
      const monthMatches = activeMonthFilter === 'all' || monthIndex === months.find(m => m.id === activeMonthFilter)?.monthNum;

      return yearMatches && monthMatches;
    });
  }, [activeMonthFilter, activeYearFilter, competitions, months, getMonthAndYearFromDate]);

  // Mengelompokkan kompetisi untuk tampilan berdasarkan bulan (Januari | 2025)
  // Logic pengelompokan harus menyesuaikan dengan activeYearFilter
  const groupedCompetitionsForDisplay = useMemo(() => {
    const groups = {};
    filteredCompetitionsByMonth.forEach(comp => {
      const { month, year } = getMonthAndYearFromDate(comp.date);
      // Jika activeYearFilter adalah 'all', tampilkan semua tahun.
      // Jika tahun spesifik, hanya tampilkan tahun itu.
      const displayKeyYear = activeYearFilter === 'all' ? year : activeYearFilter;
      const key = `${month} | ${displayKeyYear}`;

      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(comp);
    });

    const sortedGroupKeys = Object.keys(groups).sort((a, b) => {
      const [monthLabelA, yearA] = a.split(' | ');
      const [monthLabelB, yearB] = b.split(' | ');

      const monthIndexA = months.find(m => m.label === monthLabelA)?.monthNum;
      const monthIndexB = months.find(m => m.label === monthLabelB)?.monthNum;

      // Urutkan berdasarkan tahun terlebih dahulu (terbaru ke terlama)
      if (yearA !== yearB) {
        return parseInt(yearB) - parseInt(yearA);
      }
      // Kemudian urutkan berdasarkan bulan (Januari ke Desember)
      return monthIndexA - monthIndexB;
    });

    const sortedGroups = {};
    sortedGroupKeys.forEach(key => {
      sortedGroups[key] = groups[key];
    });

    return sortedGroups;
  }, [filteredCompetitionsByMonth, getMonthAndYearFromDate, activeYearFilter, months]);


  // Tampilan loading dan error
  if (loading) {
    return (
      <div className="bg-[#ebf1fa] min-h-screen flex flex-col items-center justify-center">
        <Navbar />
        <p className="text-gray-700 font-poppins text-xl mt-8">Memuat kompetisi...</p>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#ebf1fa] min-h-screen flex flex-col items-center justify-center">
        <Navbar />
        <p className="text-red-600 font-poppins text-xl mt-8">{error}</p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#ebf1fa] min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section dengan Gambar Latar Belakang dan Filter Bulan */}
      <div
        className="relative py-16 px-4 md:px-8 lg:px-16 flex flex-col md:flex-row items-center justify-between text-white overflow-hidden"
        style={{
          backgroundImage: 'url(/img/eduevent/bg_detail.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '600px'
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full">
          <div className="text-center md:text-left mb-8 md:mb-0">
            <h1 className="font-poppins font-bold text-4xl leading-tight mb-2">
              Yuk Ikuti Kompetisi <br />
              Online Di EDURISE
            </h1>
          </div>

          <div
            className="rounded-lg p-6 shadow-lg text-black w-full max-w-md md:ml-auto"
            style={{
                background: 'linear-gradient(to bottom right, rgba(0, 0, 255, 0.4), rgba(255, 165, 0, 0.4))',
                backdropFilter: 'blur(5px)'
            }}
          >
            <h2 className="font-poppins font-bold text-2xl text-white mb-4 text-center">
              Pilih Bulan Kompetisi
            </h2>
            <div className="mb-4">
              <select
                value={activeYearFilter}
                onChange={(e) => {
                  setActiveYearFilter(e.target.value);
                  setActiveMonthFilter('all'); // Selalu reset bulan ke 'all' saat tahun berubah
                }}
                className="w-full bg-white rounded-lg px-4 py-2 font-poppins font-bold text-[16px] text-black appearance-none pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Semua Tahun</option> {/* Opsi "Semua Tahun" */}
                {allAvailableYears
                    .filter(year => year !== 'all') // Jangan tampilkan 'all' lagi di sini
                    .map((year) => (
                    <option key={year} value={year}>
                        Tahun {year}
                    </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {months.map((month) => {
                // Hitung jumlah kompetisi untuk bulan ini,
                // menyesuaikan dengan filter tahun yang aktif (termasuk 'all')
                const countForMonth = competitions.filter(comp => {
                  const { monthIndex, year } = getMonthAndYearFromDate(comp.date);
                  const yearMatches = activeYearFilter === 'all' || year === activeYearFilter;
                  return yearMatches && monthIndex === month.monthNum;
                }).length;

                return (
                  <button
                    key={month.id}
                    className={`
                      w-full py-2 px-1 rounded-lg text-center font-poppins text-sm md:text-base
                      ${activeMonthFilter === month.id
                          ? 'bg-blue-600 text-white border-2 border-blue-600'
                          : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100'}
                      transition-all duration-200 flex items-center justify-between
                      ${countForMonth === 0 && activeMonthFilter !== month.id ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    onClick={() => setActiveMonthFilter(month.id)}
                    disabled={countForMonth === 0 && activeMonthFilter !== month.id}
                  >
                    <span className="flex-grow">{month.label}</span>
                    <span className="ml-1 text-xs text-right opacity-75">({countForMonth})</span>
                    <img
                      src="/img/eduevent/img_chevronright.svg"
                      alt="Arrow"
                      className="w-[15px] h-[15px] ml-1 filter brightness-0 invert"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1f467a] py-4 text-white text-center flex items-center justify-center min-h-[120px]">
        <h2 className="font-poppins font-bold text-3xl leading-tight">
          DAFTAR KOMPETISI
        </h2>
      </div>

      <div className="bg-[#ebf1fa] py-12 flex-grow">
        <div className="container mx-auto px-4">
            {Object.keys(groupedCompetitionsForDisplay).length > 0 ? (
                // Iterasi melalui bulan-bulan yang didefinisikan untuk memastikan urutan yang konsisten
                // Kita perlu iterasi melalui tahun-tahun yang ada jika 'all' dipilih
                (activeYearFilter === 'all'
                    ? allAvailableYears.filter(year => year !== 'all').sort((a,b) => parseInt(b) - parseInt(a))
                    : [activeYearFilter]
                ).map(displayYear => (
                    months.map(monthData => {
                        const monthLabel = monthData.label;
                        const monthKey = `${monthLabel} | ${displayYear}`; // Gunakan displayYear
                        const competitionsInMonth = groupedCompetitionsForDisplay[monthKey];

                        if (competitionsInMonth && competitionsInMonth.length > 0) {
                            return (
                                <div key={monthKey} className="mb-8 p-4 bg-white rounded-lg shadow-md">
                                    <h3 className="font-poppins font-bold text-xl text-black mb-4">
                                        {monthKey}
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                        {competitionsInMonth.map((competition) => (
                                            <EdueventCard
                                                key={competition.id}
                                                id={competition.id}
                                                type="competition"
                                                image={competition.image}
                                                title={competition.title}
                                                date={competition.date}
                                                isFree={competition.isFree}
                                                level={competition.level}
                                            />
                                        ))}
                                    </div>
                                </div>
                            );
                        } else if (activeMonthFilter === monthData.id && competitionsInMonth === undefined && activeYearFilter !== 'all') {
                          // Jika bulan spesifik dipilih dan tidak ada kompetisi untuk tahun itu
                          return (
                            <div key={monthKey} className="mb-8 p-4 bg-white rounded-lg shadow-md">
                              <h3 className="font-poppins font-bold text-xl text-black mb-4">
                                  {monthKey}
                              </h3>
                              <p className="col-span-full text-center text-gray-600 py-4">
                                  Mohon maaf, tidak ada kompetisi tersedia untuk bulan {monthData.label} {displayYear}.
                              </p>
                            </div>
                          );
                        }
                        return null;
                    })
                )).flat() // Gunakan .flat() untuk meratakan array dari array bulan
            ) : (
                <p className="text-center text-gray-600 py-8 font-poppins">
                    Tidak ada kompetisi ditemukan untuk filter yang dipilih.
                </p>
            )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CompetitionDetailPage;