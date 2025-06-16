import React, { useState, useEffect } from "react";
import axios from "axios";

// Pastikan path gambar dan komponen Anda benar
import herobeasiswa from "/img/eduacademy/Colorful Playful Career Planner Presentation 1.png";
import Header from "../../components/Navbar"; // Sesuaikan path jika berbeda
import Footer from "../../components/Footer"; // Sesuaikan path jika berbeda

// --- Komponen ArticleCard Reusable ---
const ArticleCard = ({ uuid, judul, deskripsi, gambar, link, kategori }) => {
  return (
    <div className="border p-4 rounded-xl shadow-sm hover:shadow-md transition h-full flex flex-col relative">
      <a href={link} target="_blank" rel="noopener noreferrer" className="block h-full">
        {gambar && (
          <img
            src={gambar}
            alt={judul}
            className="w-full h-40 object-cover rounded-lg mb-3"
            // Tambahkan onError untuk gambar yang tidak bisa dimuat
            onError={(e) => { e.target.onerror = null; e.target.src="/path/to/fallback-image.png" }}
          />
        )}
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
          <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">
            {kategori}
          </span>
        </div>
        <h4 className="font-semibold text-lg mb-2 text-[#1F467A] line-clamp-2">
          {judul}
        </h4>
        <p className="text-sm text-gray-600 flex-grow line-clamp-3">
          {deskripsi}
        </p>
        <span className="text-[#3375CC] hover:underline text-sm mt-3 inline-block">Baca Selengkapnya</span>
      </a>
    </div>
  );
};

// --- Komponen Halaman Artikel Beasiswa ---
function Artikelbeasiswa() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:5000"; // Sesuaikan jika backend Anda berjalan di port atau domain lain
  // Encode the category filter to handle spaces and special characters in URL
  const CATEGORY_FILTER = encodeURIComponent("Beasiswa & Pendidikan"); // Kategori yang ingin Anda filter

  const fetchArticlesByCategory = async () => {
    setLoading(true);
    setError(null);
    try {
      // Panggil API dengan parameter query 'kategori'
      const response = await axios.get(`${API_URL}/articles?kategori=${CATEGORY_FILTER}`);
      setArticles(response.data);
    } catch (err) {
      console.error("Error fetching articles:", err); // Log error lengkap untuk debugging
      setError(`Gagal memuat artikel kategori "Beasiswa & Pendidikan". Silakan coba lagi.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticlesByCategory();
  }, []); // [] agar fungsi hanya berjalan sekali saat komponen di-mount

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section
          className="relative text-white min-h-screen flex items-center overflow-hidden"
          style={{ background: "linear-gradient(to right, #265899, #0D1D33)" }}
        >
          <div className="absolute bottom-0 left-0 z-10 w-full md:w-1/2">
            <img
              src={herobeasiswa}
              alt="Students"
              className="w-full h-auto object-contain transform translate-y-[200px] scale-75"
            />
          </div>
          <div className="container mx-auto px-6 md:px-12 z-20 flex flex-col items-start md:items-end w-full">
            <div className="max-w-xl text-left mt-29 md:mt-0">
              <h1 className="text-6xl md:text-8xl font-bold leading-tight text-white mb-6 mt-[-90px]">
                <span className="">Beasiswa</span>
                <br />
                <span className="">dan</span>
                <br />
                <span className="text-[#DDA853]">Pendidikan</span>
                <br />
              </h1>
              <br />
              <a
                href="#artikel-section"
                className="mt-4 bg-[#3375CC] hover:bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Get Started
              </a>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-30">
            <svg
              className="relative block w-full h-[100px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 100"
              preserveAspectRatio="none"
            >
              <path
                fill="#ffffff"
                d="M0,64 C360,0 1080,160 1440,64 L1440,100 L0,100 Z"
              />
            </svg>
          </div>
        </section>

        {/* Section Artikel */}
        <section id="artikel-section" className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-center text-3xl font-bold mb-12 text-[#1F467A]">
            Baca Artikel Seputar <span className="text-[#DDA853]">Beasiswa & Pendidikan</span>
          </h2>

          {loading && (
            <p className="text-center text-gray-600">Memuat artikel beasiswa...</p>
          )}
          {error && (
            <p className="text-center text-red-500">{error}</p>
          )}
          {/* Tampilkan pesan jika tidak ada artikel dan tidak dalam keadaan loading atau error */}
          {!loading && !error && articles.length === 0 && (
            <p className="text-center text-gray-500">Tidak ada artikel beasiswa yang tersedia saat ini.</p>
          )}

          {!loading && !error && articles.length > 0 && (
            <div className="grid md:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard
                  key={article.uuid}
                  {...article}
                />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Artikelbeasiswa;