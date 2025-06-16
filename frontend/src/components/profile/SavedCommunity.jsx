import { useState, useEffect } from "react";
// Hapus import FiUsers, BsBookmarkFill, karena kita akan menggunakan img untuk ikon bookmark
import { FiBookmark } from "react-icons/fi"; // FiBookmark tetap jika Anda ingin ikon bookmark kosong
import axios from "axios";

const SavedCard = ({
  uuid, // Tambahkan uuid agar bisa digunakan untuk menghapus
  title,
  name,
  createdAt, // Ganti timeAgo dengan createdAt untuk format yang konsisten
  kategori, // Ganti categories dengan kategori
  discordLink, // Tambahkan discordLink
  konten, // Ganti description dengan konten
  profileImage, // Jika Anda memiliki gambar profil, tambahkan prop ini
  onRemoveSaved, // Fungsi callback untuk menghapus dari daftar simpanan
}) => {
  // isSaved tidak lagi diperlukan karena di halaman ini semua item sudah tersimpan
  // Anda bisa menggantinya dengan state internal jika ada kebutuhan lain
  // Namun untuk fungsionalitas hapus, langsung panggil onRemoveSaved
  // const [isSaved, setIsSaved] = useState(true); // Default true karena ini adalah kartu yang disimpan

  const handleToggleSave = async () => { // Ganti nama fungsi menjadi lebih generik
    try {
      await axios.delete(`http://localhost:5000/me/saved-forum/${uuid}`, { withCredentials: true });
      // setIsSaved(false); // Tidak lagi perlu mengubah state lokal isSaved
      alert("Forum berhasil dihapus dari daftar simpanan!");
      if (onRemoveSaved) {
        onRemoveSaved(uuid); // Panggil callback untuk memperbarui daftar di parent
      }
    } catch (error) {
      console.error("Error removing saved forum:", error);
      alert(error.response?.data?.msg || "Gagal menghapus forum dari daftar simpanan.");
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " tahun lalu";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " bulan lalu";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " hari lalu";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " jam lalu";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " menit lalu";
    return Math.floor(seconds) + " detik lalu";
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md mb-4">
      {/* Title */}
      <h3 className="text-base font-bold text-[#17355c] mb-3">{title}</h3>

      {/* Header */}
      <div className="flex items-start justify-between">
        {/* Profile section */}
        <div className="flex items-start">
          <img
            src={profileImage || "/img/educonnect/modell.png"} // Gunakan gambar default jika profileImage tidak ada
            alt={name}
            className="w-10 h-10 object-cover rounded-md mr-3"
          />
          <div>
            <p className="text-sm font-semibold text-[#17355c]">{name}</p>
            <p className="text-xs text-gray-500">{formatTimeAgo(createdAt)}</p>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 flex-wrap">
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
            {kategori}
          </span>
        </div>
      </div>

      {/* Participants & Description */}
      <div className="mt-2 ml-[0px]">
        <p className="text-sm text-[#5e5a5a] mb-3">{konten}</p>

        {/* Saved Icon & Join Button */}
        <div className="flex justify-start items-center"> {/* Tambahkan items-center */}
          {/* Tombol Hapus dari Simpanan (dengan warna oranye) */}
          <button
            onClick={handleToggleSave} // Panggil fungsi untuk menghapus
            className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold
                       bg-orange-400 hover:bg-orange-500 transition-colors duration-200 ease-in-out"
            title="Hapus dari Tersimpan" // Teks tooltip
          >
            {/* Selalu gunakan ikon bookmark yang sama */}
            <img src="/img/educonnect/bookmark.svg" alt="Saved" className="h-4 w-4" />
          </button>

          {discordLink && (
            <a
              href={discordLink}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline flex flex-row items-center justify-center p-3 ml-2 bg-blue-500 hover:bg-blue-600 gap-2 text-white rounded-xl"
            >
              Gabung Forum
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const SavedCommunity = () => {
  const [savedForums, setSavedForums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSavedForums = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/me/saved-forum", { withCredentials: true });
      setSavedForums(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching saved forums:", err);
      setError("Gagal memuat forum tersimpan. Silakan coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedForums();
  }, []);

  const handleRemoveSaved = (removedForumUuid) => {
    setSavedForums(prev => prev.filter(forum => forum.uuid !== removedForumUuid));
  };

  return (
    <div className="bg-white rounded-[15px] p-6 mb-5">
      <h2 className="text-2xl font-semibold text-[#17355c] mb-6">
        Komunitas Tersimpan
      </h2>

      <div>
        {loading ? (
          <p className="text-center text-gray-500">Memuat komunitas tersimpan...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : savedForums.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada komunitas tersimpan.</p>
        ) : (
          savedForums.map((item) => (
            <SavedCard
              key={item.uuid} // Gunakan uuid sebagai key
              uuid={item.uuid}
              name={item.creator.name} // Ambil nama creator dari relasi
              createdAt={item.createdAt}
              title={item.judul}
              kategori={item.kategori} // Hanya satu kategori
              discordLink={item.discordLink} // Pastikan prop ini diteruskan
              konten={item.konten}
              profileImage="/img/educonnect/modell.png" // Tetapkan gambar profil default atau ambil dari user jika ada
              onRemoveSaved={handleRemoveSaved}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SavedCommunity;