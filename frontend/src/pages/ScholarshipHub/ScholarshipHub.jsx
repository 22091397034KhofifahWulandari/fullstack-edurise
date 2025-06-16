import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../../components/Navbar";
import Footer from "../../components/Footer";
import Card from "../../components/scholarshiphub/Card";
import PopupDetail from "../../components/scholarshiphub/PopupDetail";
import PopupFilter from "../../components/scholarshiphub/PopupFilter";
import PopupSaved from "../../components/scholarshiphub/PopupSaved";

const ScholarshipHub = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [showSavedPopup, setShowSavedPopup] = useState(false); // Ganti 'saved' menjadi 'showSavedPopup' agar lebih jelas

  const [selectedCard, setSelectedCard] = useState(null);
  const [beasiswaList, setBeasiswaList] = useState([]);
  const [userSavedBeasiswa, setUserSavedBeasiswa] = useState([]); // State baru untuk menyimpan UUID beasiswa yang sudah disimpan pengguna

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const API_URL = "http://localhost:5000";

  axios.defaults.withCredentials = true;

  // --- Fungsi untuk mengambil semua beasiswa dari backend ---
  const fetchAllBeasiswa = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/beasiswa`);
      setBeasiswaList(response.data);
    } catch (err) {
      console.error(
        "Error fetching all beasiswa:",
        err.response ? err.response.data : err.message
      );
      setError("Gagal mengambil data beasiswa. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  // --- Fungsi untuk mengambil beasiswa yang disimpan oleh pengguna ---
  const fetchUserSavedBeasiswa = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/saved-beasiswa`);
      // Asumsi backend mengembalikan array UUID beasiswa yang disimpan
      // Jika backend mengembalikan objek lengkap, Anda mungkin perlu memetakan ke array UUID
      setUserSavedBeasiswa(response.data.map(item => item.uuid)); // Sesuaikan jika struktur respons berbeda (misal: item.beasiswa_uuid)
    } catch (err) {
      console.error(
        "Error fetching user saved beasiswa:",
        err.response ? err.response.data : err.message
      );
      // Tangani jika pengguna belum login atau sesi berakhir
      if (err.response && err.response.status === 401) {
        // Tidak perlu navigasi otomatis ke login di sini,
        // karena ini adalah background fetch dan user mungkin belum ingin login
        console.warn("User not logged in or session expired when fetching saved beasiswa.");
      } else {
        setError("Gagal mengambil daftar beasiswa tersimpan.");
      }
    }
  };

  // --- Fungsi untuk mengambil detail beasiswa berdasarkan UUID ---
  const fetchBeasiswaDetail = async (uuid) => {
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/beasiswa/${uuid}`);
      setSelectedCard(response.data);
      setPopupOpen(true);
      // Status tersimpan akan dihitung saat PopupDetail dirender berdasarkan userSavedBeasiswa
    } catch (err) {
      console.error(
        "Error fetching beasiswa detail:",
        err.response ? err.response.data : err.message
      );
      setError("Gagal mengambil detail beasiswa. Silakan coba lagi.");
    }
  };

  // --- Fungsi untuk menyimpan/membatalkan simpan beasiswa ---
  const handleToggleSaveScholarship = async (beasiswaUuid) => {
    if (!beasiswaUuid) return;

    const isCurrentlySaved = userSavedBeasiswa.includes(beasiswaUuid);
    const method = isCurrentlySaved ? "delete" : "post"; // Gunakan DELETE untuk batal simpan, POST untuk simpan
    const url = `${API_URL}/users/saved-beasiswa`; // Asumsi endpoint sama untuk POST/DELETE

    try {
      if (method === "post") {
        await axios.post(url, { beasiswa_uuid: beasiswaUuid });
        setUserSavedBeasiswa([...userSavedBeasiswa, beasiswaUuid]); // Tambahkan ke daftar yang disimpan
        setShowSavedPopup(true); // Tampilkan popup "Beasiswa Tersimpan"
      } else { // method === "delete"
        await axios.delete(url, { data: { beasiswa_uuid: beasiswaUuid } }); // DELETE dengan body memerlukan `data`
        setUserSavedBeasiswa(userSavedBeasiswa.filter(id => id !== beasiswaUuid)); // Hapus dari daftar
        setShowSavedPopup(false); // Opsional: mungkin tidak perlu popup untuk batal simpan
        alert("Beasiswa berhasil dibatalkan dari daftar tersimpan."); // Atau notifikasi lain
      }
      setPopupOpen(false); // Tutup popup detail setelah aksi berhasil

    } catch (err) {
      console.error(
        "Error toggling scholarship save status:",
        err.response ? err.response.data : err.message
      );
      if (err.response && err.response.status === 401) {
        alert("Sesi Anda telah berakhir atau Anda belum login. Silakan login kembali.");
        navigate("/login");
      } else {
        alert("Gagal memperbarui status simpan beasiswa. Silakan coba lagi.");
      }
    }
  };

  // --- useEffect untuk memuat semua beasiswa dan beasiswa yang disimpan pengguna saat komponen pertama kali dimuat ---
  useEffect(() => {
    fetchAllBeasiswa();
    fetchUserSavedBeasiswa(); // Ambil daftar beasiswa yang disimpan saat komponen dimuat
  }, []); // [] agar hanya berjalan sekali saat mount

  // --- Handler saat kartu beasiswa diklik ---
  const handleCardClick = (card) => {
    fetchBeasiswaDetail(card.uuid);
  };

  // --- Handler saat filter diterapkan dari PopupFilter ---
  const handleApplyFilter = (newFilterData) => {
    setShowFilterPopup(false);
    navigate("/scholarshiphub/rekomendasi", { state: newFilterData });
  };

  // Tentukan apakah beasiswa saat ini (selectedCard) sudah tersimpan
  const isSelectedCardSaved = selectedCard ? userSavedBeasiswa.includes(selectedCard.uuid) : false;

  return (
    <>
      <Header />
      <main>
        {/* Banner Section */}
        <section
          className="h-[450px] flex items-stretch"
          style={{ background: "linear-gradient(to right, #0d1d33, #265899)" }}
        >
          <div className="max-w-6xl mx-auto px-4 w-full flex items-stretch">
            <div className="flex-1 flex items-end justify-center">
              <img
                src="/img/scholarshiphub/MainBanner.png"
                alt="Banner EduRise"
                className="max-h-full object-contain self-end"
              />
            </div>
            <div className="flex-1 flex flex-col justify-center text-white text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                Temukan <span className="text-[#dda853]">Beasiswa</span>
                <br />
                Impianmu Bersama{" "}
                <span className="text-[#dda853] italic">EDURISE</span>
              </h1>
            </div>
          </div>
        </section>

        {/* Loading / Error / No Data Messages */}
        <section className="text-center mt-8 px-8">
          {loading && <p className="text-gray-600">Memuat beasiswa...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && beasiswaList.length === 0 && (
            <p className="text-gray-500">Tidak ada data beasiswa yang tersedia saat ini.</p>
          )}
        </section>

        {/* Total Scholarship Count */}
        {!loading && !error && (
            <section className="text-center mt-4 px-8">
                <p className="text-lg font-semibold">Total Beasiswa Tersedia: {beasiswaList.length}</p>
            </section>
        )}

        {/* Scholarship List Section */}
        <section className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full px-8">
          {!loading && !error && beasiswaList.length > 0 && (
            beasiswaList.map((item) => (
              <Card key={item.uuid} {...item} onClick={() => handleCardClick(item)} />
            ))
          )}
        </section>

        {/* Recommendation CTA Section */}
        <section className="text-center mt-16 mb-20">
          <h1 className="text-2xl font-bold mb-4">Kamu Masih Bingung?</h1>
          <button
            className="px-6 py-3 bg-[#3375CC] hover:bg-[#295ea3] text-white font-semibold rounded transition-colors"
            onClick={() => setShowFilterPopup(true)}
          >
            Cari Rekomendasi
          </button>
        </section>

        {/* Popups */}
        <PopupDetail
          show={popupOpen}
          onClose={() => setPopupOpen(false)}
          data={selectedCard}
          isSaved={isSelectedCardSaved} // Meneruskan status tersimpan ke PopupDetail
          onSave={() => selectedCard && handleToggleSaveScholarship(selectedCard.uuid)} // Panggil fungsi toggle
        />
        <PopupSaved show={showSavedPopup} onClose={() => setShowSavedPopup(false)} />
        <PopupFilter
          show={showFilterPopup}
          onClose={() => setShowFilterPopup(false)}
          onFilter={handleApplyFilter}
        />
      </main>
      <Footer />
    </>
  );
};

export default ScholarshipHub;