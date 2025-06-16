import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import Header from "../../components/Navbar";
import Footer from "../../components/Footer";
import Card from "../../components/scholarshiphub/Card";
import PopupDetail from "../../components/scholarshiphub/PopupDetail";
import PopupSaved from "../../components/scholarshiphub/PopupSaved";

const Rekomendasi = () => {
  const location = useLocation();

  const initialFilters = location.state || {
    kategori: "",
    jenjang: "",
    lokasi: "",
    deadline: "",
  };

  const [filters, setFilters] = useState(initialFilters);
  const [selectedCard, setSelectedCard] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [beasiswaData, setBeasiswaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // PASTIKAN URL INI BENAR SESUAI DENGAN BACKEND ANDA
  const API_URL = "http://localhost:5000";

  // Fungsi untuk mengambil data beasiswa dari backend dengan filter
  const fetchFilteredBeasiswa = async (currentFilters) => {
    setLoading(true);
    setError(null);
    try {
      let url = `${API_URL}/beasiswa`;

      const queryParams = new URLSearchParams();
      if (currentFilters.kategori) queryParams.append("kategori", currentFilters.kategori);
      if (currentFilters.jenjang) queryParams.append("jenjang", currentFilters.jenjang);
      if (currentFilters.lokasi) queryParams.append("lokasi", currentFilters.lokasi);
      if (currentFilters.deadline) queryParams.append("deadline", currentFilters.deadline);

      if (queryParams.toString()) {
        url = `${url}?${queryParams.toString()}`;
      }

      console.log("Fetching filtered scholarships from URL:", url); // Debugging URL
      const response = await axios.get(url);
      setBeasiswaData(response.data);
      console.log("Fetched filtered data:", response.data); // Debugging data
    } catch (err) {
      console.error(
        "Gagal mengambil data beasiswa rekomendasi:",
        err.response ? err.response.data : err.message
      );
      setError("Gagal memuat rekomendasi beasiswa. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk mengambil detail beasiswa berdasarkan UUID
  const fetchBeasiswaDetail = async (uuid) => {
    setError(null); // Reset error state for detail fetch
    try {
      console.log("Fetching detail for UUID:", uuid); // Debugging UUID
      const response = await axios.get(`${API_URL}/beasiswa/${uuid}`);
      console.log("Fetched detail data:", response.data); // Debugging data detail

      if (response.data) {
        setSelectedCard(response.data);
        setPopupOpen(true); // Ini yang membuka popup
        setSaved(false); // Reset saved status for new detail view
      } else {
        console.warn("No data returned for detail:", uuid);
        setError("Detail beasiswa tidak ditemukan.");
      }
    } catch (err) {
      console.error(
        "Error fetching beasiswa detail:",
        err.response ? err.response.data : err.message
      );
      setError("Gagal mengambil detail beasiswa. Silakan coba lagi.");
      setSelectedCard(null); // Clear selected card on error
      setPopupOpen(false); // Ensure popup is closed on error
    }
  };

  // useEffect untuk memanggil fetchFilteredBeasiswa saat komponen dimuat atau filters berubah
  useEffect(() => {
    if (location.state && JSON.stringify(location.state) !== JSON.stringify(filters)) {
      setFilters(location.state);
    }
    fetchFilteredBeasiswa(filters);
  }, [filters, location.state]);

  // Handler saat kartu beasiswa diklik
  const handleCardClick = (card) => {
    // Pastikan `card.uuid` ada dan bukan undefined
    if (card && card.uuid) {
      fetchBeasiswaDetail(card.uuid);
    } else {
      console.error("Card or card.uuid is undefined:", card);
    }
  };

  const handleSave = () => {
    setPopupOpen(false);
    setSaved(true);
  };

  useEffect(() => {
    if (saved) {
      const timer = setTimeout(() => setSaved(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [saved]);

  return (
    <>
      <Header />
      <main>
        <section
          className="h-[450px] flex items-stretch"
          style={{ background: "linear-gradient(to right, #0d1d33, #265899)" }}
        >
          <div className="max-w-6xl mx-auto px-4 w-full flex items-stretch">
            <div className="flex-1 flex flex-col justify-center text-white">
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                Rekomendasi{" "}
                <span className="text-[#dda853] italic">Beasiswa</span>
                <br />
                Untuk Anda!
              </h1>
            </div>
            <div className="flex-1 flex items-end justify-center md:justify-end">
              <img
                src="/img/scholarshiphub/Banner.png"
                alt="Rekomendasi Beasiswa"
                className="max-h-full object-contain self-end w-full max-w-sm"
              />
            </div>
          </div>
        </section>

        <section className="mt-12 mb-12 ml-8">
          <a
            href="/scholarshiphub"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#3375CC] hover:bg-[#295ea3] text-white text-sm font-semibold rounded"
          >
            <i className="fa-solid fa-arrow-left"></i> Kembali
          </a>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full px-8 mb-20">
          {loading && (
            <p className="col-span-full text-center text-gray-500">
              Memuat beasiswa rekomendasi...
            </p>
          )}
          {error && (
            <p className="col-span-full text-center text-red-500">{error}</p>
          )}
          {!loading && !error && beasiswaData.length > 0 ? (
            beasiswaData.map((item) => (
              // Pastikan `item.uuid` adalah properti yang benar untuk kunci unik
              // Dan pastikan `item` (objek beasiswa lengkap) diteruskan ke onClick
              <Card key={item.uuid} {...item} onClick={() => handleCardClick(item)} />
            ))
          ) : (
            !loading && !error && (
              <p className="col-span-full text-center text-gray-500">
                Tidak ada program yang sesuai dengan filter.
              </p>
            )
          )}
        </section>

        {/* PopupDetail harus dirender agar bisa ditampilkan */}
        <PopupDetail
          show={popupOpen} // Ini mengontrol visibilitas popup
          onClose={() => setPopupOpen(false)} // Untuk menutup popup
          data={selectedCard} // Data yang akan ditampilkan di popup
          saved={false} // Sesuaikan jika ada logika saved dari backend
          onSave={handleSave}
        />
        <PopupSaved show={saved} onClose={() => setSaved(false)} />
      </main>
      <Footer />
    </>
  );
};

export default Rekomendasi;