// Artikel.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Pastikan Anda sudah setup react-router-dom

import HeroArtikel from "/img/eduacademy/img.png";
import Header from "../../components/Navbar";
import Footer from "../../components/Footer";

// Komponen Card Artikel Reusable (Tidak ada perubahan)
const ArticleCard = ({ uuid, judul, deskripsi, gambar, link, kategori }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block h-full">
      <div className="border p-4 rounded-xl shadow-sm hover:shadow-md transition h-full flex flex-col">
        {gambar && (
          <img
            src={gambar}
            alt={judul}
            className="w-full h-40 object-cover rounded-lg mb-3"
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
      </div>
    </a>
  );
};

function Artikel() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:5000";

  const categoriesToDisplay = [
    "Beasiswa & Pendidikan",
    "Pengembangan Diri & Karir",
    "Tips Belajar & Produktivitas",
  ];

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/articles`);
      setArticles(response.data);
    } catch (err) {
      console.error("Gagal mengambil artikel:", err.response ? err.response.data : err.message);
      setError("Gagal memuat artikel. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const getArticlesByCategory = (categoryNameFromDisplay) => {
    const filtered = articles.filter(
      (article) => article.kategori === categoryNameFromDisplay
    );
    return filtered;
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero Section (Tidak ada perubahan) */}
        <section
          className="relative text-white min-h-screen flex items-center overflow-hidden"
          style={{ background: "linear-gradient(to right, #265899, #0D1D33)" }}
        >
          <div className="absolute bottom-0 left-0 z-10 w-full md:w-1/2">
            <img
              src={HeroArtikel}
              alt="Students"
              className="w-full object-cover mt-[-630px]"
            />
          </div>
          <div className="container mx-auto px-6 md:px-12 z-20 flex flex-col items-start md:items-end w-full">
            <div className="max-w-xl text-left mt-24 md:mt-0">
              <h1 className="text-6xl md:text-7xl font-bold leading-tight text-white mb-6 mt-[-90px]">
                <span className="">Learn</span>
                <br />
                <span className="">something</span>
                <br />
                <span className="">new, one</span>{" "}
                <span className="text-[#DDA853]">read</span>
                <br />
                <span className="">at a time.</span>
              </h1>
              <br />
              <a
                href="#featured-articles"
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

        {/* Featured Articles Section */}
        <section id="featured-articles" className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-center text-2xl font-bold mb-12">
            <span className="text-[#1F467A]">Featured</span>{" "}
            <span className="text-[#DDA853]">Articles</span>
          </h2>

          {/* Kondisi Loading, Error, dan Data Kosong */}
          {loading && (
            <p className="text-center text-gray-600">Memuat artikel...</p>
          )}
          {error && (
            <p className="text-center text-red-500">{error}</p>
          )}
          {!loading && !error && articles.length === 0 && (
            <p className="text-center text-gray-500">Tidak ada artikel yang tersedia saat ini.</p>
          )}

          {!loading && !error && articles.length > 0 && (
            <>
              {categoriesToDisplay.map((categoryDisplayName) => {
                const categoryArticles = getArticlesByCategory(categoryDisplayName);

                if (categoryArticles.length === 0) {
                  return null;
                }

                return (
                  <div key={categoryDisplayName} className="mb-12">
                    <h3 className="text-xl font-semibold mb-4 text-[#1F467A]">
                      {categoryDisplayName}
                    </h3>
                    <div className="grid md:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryArticles.map((article) => (
                        <ArticleCard key={article.uuid} {...article} />
                      ))}
                    </div>
                    {/* Link ke halaman detail kategori baru yang generik */}
                    <Link
                      to={`/kategori/${encodeURIComponent(categoryDisplayName)}`} // <-- Perubahan di sini!
                      className="mt-4 bg-[#3375CC] hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-sm inline-block"
                    >
                      Lihat Lainnya
                    </Link>
                  </div>
                );
              })}
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Artikel;