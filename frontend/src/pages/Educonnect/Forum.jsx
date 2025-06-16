import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Navbar";
import Footer from "../../components/Footer";

const Forum = () => {
  const [showTambahModal, setShowTambahModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showHapusModal, setShowHapusModal] = useState(false);
  const [forums, setForums] = useState([]);
  const [selectedForum, setSelectedForum] = useState(null);
  const [newForum, setNewForum] = useState({
    judul: "",
    kategori: "",
    discordLink: "",
    konten: "",
  });
  const [editForumData, setEditForumData] = useState({
    judul: "",
    kategori: "",
    discordLink: "",
    konten: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedForumIds, setSavedForumIds] = useState(new Set()); // State baru untuk menyimpan ID forum yang telah disimpan

  // Kategori yang Tersedia (Sesuaikan dengan ENUM di database Anda)
  const availableCategories = [
    'Computer','Desain UI/UX','Digital Marketing','Sains','Bisnis'
  ];

  const fetchForums = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/forums", { withCredentials: true });
      console.log("Data forum dari API:", response.data);
      setForums(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching forums:", err);
      setError("Gagal memuat forum. Silakan coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi baru untuk mengambil forum yang disimpan oleh pengguna
  const fetchSavedForums = async () => {
    try {
      const response = await axios.get("http://localhost:5000/me/saved-forum", { withCredentials: true });
      const savedIds = new Set(response.data.map(forum => forum.uuid));
      setSavedForumIds(savedIds);
    } catch (err) {
      console.error("Error fetching saved forums:", err);
      // Handle error jika tidak bisa mengambil forum yang disimpan
    }
  };

  useEffect(() => {
    fetchForums();
    fetchSavedForums(); // Panggil juga saat komponen dimuat
  }, []);

  const handleNewForumChange = (e) => {
    const { name, value } = e.target;
    setNewForum((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddForumSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/forums", newForum, { withCredentials: true });
      setShowTambahModal(false);
      setNewForum({ judul: "", kategori: "", discordLink: "", konten: "" });
      fetchForums();
      alert("Forum berhasil ditambahkan!");
    } catch (err) {
      console.error("Error adding forum:", err);
      alert(err.response?.data?.msg || "Gagal menambahkan forum. Pastikan Anda sudah login dan memilih kategori.");
    }
  };

  const handleEditForumChange = (e) => {
    const { name, value } = e.target;
    setEditForumData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditForumSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!selectedForum) return;

      await axios.patch(`http://localhost:5000/forums/${selectedForum.uuid}`, editForumData, { withCredentials: true });
      setShowEditModal(false);
      setSelectedForum(null);
      fetchForums();
      alert("Forum berhasil diperbarui!");
    } catch (err) {
      console.error("Error updating forum:", err);
      alert(err.response?.data?.msg || "Gagal memperbarui forum. Pastikan Anda pemilik forum ini dan memilih kategori.");
    }
  };

  const handleEditClick = (forum) => {
    setSelectedForum(forum);
    setEditForumData({
      judul: forum.judul,
      kategori: forum.kategori,
      discordLink: forum.discordLink,
      konten: forum.konten,
    });
    setShowEditModal(true);
  };

  const handleDeleteForum = async () => {
    try {
      if (!selectedForum) return;

      await axios.delete(`http://localhost:5000/forums/${selectedForum.uuid}`, { withCredentials: true });
      setShowHapusModal(false);
      setSelectedForum(null);
      fetchForums();
      alert("Forum berhasil dihapus!");
    } catch (err) {
      console.error("Error deleting forum:", err);
      alert(err.response?.data?.msg || "Gagal menghapus forum. Pastikan Anda pemilik forum ini.");
    }
  };

  const handleBookmark = async (forumId) => {
    try {
      if (savedForumIds.has(forumId)) {
        // Forum sudah disimpan, jadi kita akan menghapusnya
        await axios.delete(`http://localhost:5000/me/saved-forum/${forumId}`, { withCredentials: true });
        setSavedForumIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(forumId);
          return newSet;
        });
        alert("Forum berhasil dihapus dari daftar simpanan!");
      } else {
        // Forum belum disimpan, jadi kita akan menyimpannya
        await axios.post("http://localhost:5000/me/saved-forum", { forumId }, { withCredentials: true });
        setSavedForumIds(prev => new Set(prev).add(forumId));
        alert("Forum berhasil disimpan!");
      }
    } catch (err) {
      console.error("Error bookmarking forum:", err);
      alert(err.response?.data?.msg || "Gagal mengubah status simpan forum. Silakan login terlebih dahulu.");
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
    <>
      <Header />
      <div className="bg-[#F9F9F9] text-black">
        <section className="w-full px-32 pb-10 flex justify-center">
          <div className="flex flex-col gap-4 w-[20%] mt-16">
            <div className="flex w-full justify-center items-center pr-5 border-r-blue-400 border-r-[3px] ml-[2.8px] z-20">
              <Link to="/forum" className="w-full bg-white flex flex-row items-center gap-3 p-4 rounded-xl shadow-sm no-underline">
                <img src="/img/educonnect/calendar-blue.svg" alt="Forum" />
                <h2 className="text-blue-400 font-medium text-base m-0">Forum</h2>
              </Link>
            </div>
            <div className="flex justify-center items-center pr-5 ml-[2.8px]">
              <Link to="/diskusi" className="w-full bg-white flex flex-row items-center gap-3 p-4 rounded-xl shadow-sm no-underline">
                <img src="/img/educonnect/message-circle.svg" alt="Discuss" />
                <h2 className="text-gray-600 font-medium text-base m-0">Discuss Group</h2>
              </Link>
            </div>
            <div className="flex justify-center items-center pr-5 ml-[2.8px]">
              <Link to="/mentoring" className="w-full bg-white flex flex-row items-center gap-3 p-4 rounded-xl shadow-sm no-underline">
                <img src="/img/educonnect/briefcase.svg" alt="Mentoring" />
                <h2 className="text-gray-600 font-medium text-base m-0">Mentoring</h2>
              </Link>
            </div>
          </div>

          <div className="flex flex-col pl-5 gap-4 w-[80%] border-l-[3px] h-full">
            <div className="mt-20 w-full flex-col justify-center">
              <div className="flex flex-row w-full justify-center items-center gap-3">
                <button
                  onClick={() => setShowTambahModal(true)}
                  className="flex justify-center items-center w-full bg-white rounded-xl pr-2 py-2 pl-5 shadow-sm"
                >
                  <div className="flex flex-row justify-between items-center w-full">
                    <p className="text-base m-0">Tambah Forum baru</p>
                    <div className="flex items-center justify-center p-3 bg-blue-500 hover:bg-blue-600 rounded-xl h-full">
                      <img src="/img/educonnect/plus.svg" alt="Tambah" />
                    </div>
                  </div>
                </button>
                <Link
                  to="/profile/saved-community" // Arahkan ke halaman Komunitas Tersimpan Anda
                  className="flex justify-center items-center bg-white rounded-xl p-2 shadow-sm no-underline"
                >
                  {/* Ini adalah tombol "Komunitas Tersimpan" di bagian atas, warnanya tetap ORANYE */}
                  <div className="flex items-center justify-center p-3.5 bg-orange-400 hover:bg-orange-500 rounded-xl">
                    <img src="/img/educonnect/bookmark.svg" alt="Bookmark" className="h-[24px] px-0.5" />
                  </div>
                </Link>
              </div>
            </div>

            {loading ? (
              <p className="text-center text-gray-500">Memuat forum...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : forums.length === 0 ? (
              <p className="text-center text-gray-500">Belum ada forum tersedia. Mari buat yang pertama!</p>
            ) : (
              <div className="flex flex-col gap-4">
                {forums.map((forum) => (
                  <div key={forum.uuid} className="w-full p-8 bg-white flex flex-col rounded-xl shadow-sm">
                    <h1 className="text-2xl font-semibold mb-3">{forum.judul}</h1>
                    <div className="w-full flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="relative flex items-center justify-center p-[12px]">
                          <div className="flex items-center justify-center overflow-hidden rounded-lg h-16 w-16">
                            <img src="/img/educonnect/modell.png" alt="User" className="object-cover object-top h-full w-full" />
                          </div>
                          <div className="absolute flex p-1 items-center justify-center left-0 bottom-0 bg-slate-700 rounded-lg">
                            <img src="/img/educonnect/graduation.svg" alt="Status" className="h-5" />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-base font-semibold m-0">{forum.creator.name}</h4>
                          <p className="text-sm text-gray-400 m-0">{formatTimeAgo(forum.createdAt)}</p>
                        </div>
                      </div>
                      <div className="flex flex-row px-3 py-2 h-fit justify-center text-sm items-center bg-green-200 text-green-500 border-2 font-medium border-green-500 rounded-lg">
                        {forum.kategori}
                      </div>
                    </div>

                    <p className="w-full text-base text-gray-500 mt-3 break-words whitespace-pre-line">
                      {forum.konten}
                    </p>

                    <div className="flex items-center mt-4 gap-3">
                      {/* Ini adalah tombol bookmark per forum. Hanya warna latar belakang yang berubah. */}
                      <button
                        type="button"
                        onClick={() => handleBookmark(forum.uuid)}
                        className={`rounded-full p-4 ${savedForumIds.has(forum.uuid) ? 'bg-orange-400 hover:bg-orange-500' : 'bg-gray-200 hover:bg-gray-300'}`}
                      >
                        {/* Ikon bookmark selalu bookmark.svg (kosong) dan warnanya PUTIH */}
                        <img src="/img/educonnect/bookmark.svg" alt="Bookmark" className="h-4 scale-110" />
                      </button>

                      {forum.isOwner ? (
                        <>
                          {/* Tombol Edit Forum */}
                          <button
                            onClick={() => handleEditClick(forum)}
                            className="flex items-center justify-center gap-2 px-3 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg text-sm font-bold"
                          >
                            <img src="/img/educonnect/edit.svg" alt="Edit" className="h-4" />
                            Edit
                          </button>
                          {/* Tombol Hapus Forum */}
                          <button
                            onClick={() => {
                              setSelectedForum(forum);
                              setShowHapusModal(true);
                            }}
                            className="flex items-center justify-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white text-sm font-bold"
                          >
                            <i className="fas fa-trash text-sm"></i>
                            Hapus
                          </button>
                          <div className="flex items-center gap-2 text-gray-500">
                            <img src="/img/educonnect/check.svg" alt="Created" />
                            <span className="text-sm">Anda membuat forum ini</span>
                          </div>
                        </>
                      ) : (
                        <a
                          href={forum.discordLink || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="no-underline flex flex-row items-center justify-center p-3 bg-blue-500 hover:bg-blue-600 gap-2 text-white rounded-xl"
                        >
                          <img src="/img/educonnect/plus-circle.svg" alt="" />
                          Gabung Forum
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {showTambahModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl py-6 px-8 w-full max-w-lg">
              <h1 className="text-2xl font-semibold text-center text-black">Tambah Forum</h1>
              <form onSubmit={handleAddForumSubmit} className="mt-4 flex flex-col gap-2">
                <label className="text-sm">Judul Forum</label>
                <input
                  type="text"
                  name="judul"
                  value={newForum.judul}
                  onChange={handleNewForumChange}
                  placeholder="Judul Forum"
                  className="mt-1 px-4 py-3 border shadow-sm bg-blue-50 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full rounded-lg sm:text-sm focus:ring-1"
                  required
                />
                <label className="text-sm">Kategori Forum</label>
                <select
                  name="kategori"
                  value={newForum.kategori}
                  onChange={handleNewForumChange}
                  className="mt-1 px-4 py-3 border shadow-sm bg-blue-50 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full rounded-lg sm:text-sm focus:ring-1 pl-4 pr-0"
                  required
                >
                  <option value="">Pilih Kategori</option>
                  {availableCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <label className="text-sm">Link Eksternal (Discord/Telegram, opsional)</label>
                <input
                  type="url"
                  name="discordLink"
                  value={newForum.discordLink}
                  onChange={handleNewForumChange}
                  placeholder="Contoh: https://discord.gg/abcd atau https://t.me/forum"
                  className="mt-1 px-4 py-3 border shadow-sm bg-blue-50 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full rounded-lg sm:text-sm focus:ring-1"
                />
                <label htmlFor="konten" className="text-sm">Deskripsi Forum</label>
                <textarea
                  name="konten"
                  value={newForum.konten}
                  onChange={handleNewForumChange}
                  placeholder="Masukkan deskripsi lengkap tentang forum ini, tujuannya, dan siapa yang cocok bergabung."
                  className="px-4 py-3 border shadow-sm bg-blue-50 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full rounded-lg sm:text-sm focus:ring-1"
                  rows="4"
                  required
                />
                <div className="flex justify-center gap-3 mt-3">
                    <button type="button" onClick={() => setShowTambahModal(false)} className="bg-gray-600 hover:bg-gray-700 text-white rounded-lg px-5 py-2 text-sm font-semibold">Batal</button>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-5 py-2 text-sm font-semibold">Tambah Forum</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showEditModal && selectedForum && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl py-6 px-8 w-full max-w-lg">
              <h1 className="text-2xl font-semibold text-center text-black">Edit Forum</h1>
              <form onSubmit={handleEditForumSubmit} className="mt-4 flex flex-col gap-2">
                <label className="text-sm">Judul Forum</label>
                <input
                  type="text"
                  name="judul"
                  value={editForumData.judul}
                  onChange={handleEditForumChange}
                  placeholder="Judul Forum"
                  className="mt-1 px-4 py-3 border shadow-sm bg-blue-50 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full rounded-lg sm:text-sm focus:ring-1"
                  required
                />
                <label className="text-sm">Kategori Forum</label>
                <select
                  name="kategori"
                  value={editForumData.kategori}
                  onChange={handleEditForumChange}
                  className="mt-1 px-4 py-3 border shadow-sm bg-blue-50 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full rounded-lg sm:text-sm focus:ring-1 pl-4 pr-0"
                  required
                >
                  <option value="">Pilih Kategori</option>
                  {availableCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <label className="text-sm">Link Eksternal (Discord/Telegram)</label>
                <input
                  type="url"
                  name="discordLink"
                  value={editForumData.discordLink}
                  onChange={handleEditForumChange}
                  placeholder="Contoh: https://discord.gg/abcd"
                  className="mt-1 px-4 py-3 border shadow-sm bg-blue-50 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full rounded-lg sm:text-sm focus:ring-1"
                />
                <label htmlFor="konten" className="text-sm">Deskripsi Forum</label>
                <textarea
                  name="konten"
                  value={editForumData.konten}
                  onChange={handleEditForumChange}
                  placeholder="Deskripsi"
                  className="px-4 py-3 border shadow-sm bg-blue-50 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full rounded-lg sm:text-sm focus:ring-1"
                  rows="4"
                  required
                />
                <div className="flex justify-center gap-3 mt-3">
                    <button type="button" onClick={() => setShowEditModal(false)} className="bg-gray-600 hover:bg-gray-700 text-white rounded-lg px-5 py-2 text-sm font-semibold">Batal</button>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-5 py-2 text-sm font-semibold">Simpan Perubahan</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showHapusModal && selectedForum && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
              <h1 className="text-xl font-semibold text-center text-black">Konfirmasi Hapus Forum</h1>
              <p className="text-center text-gray-600 mb-4">
                Apakah Anda yakin ingin menghapus <strong>{selectedForum.judul}</strong>? Tindakan ini tidak dapat dibatalkan.
              </p>
              <div className="flex justify-center gap-4">
                <button onClick={handleDeleteForum} className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md">Ya, Hapus</button>
                <button onClick={() => setShowHapusModal(false)} className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-md">Batal</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Forum;