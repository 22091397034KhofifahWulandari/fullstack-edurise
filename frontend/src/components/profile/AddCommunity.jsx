import { useState, useEffect } from "react";
import axios from "axios";
// import { FiUsers } from "react-icons/fi"; // Already removed as per previous request

const ForumCard = ({
  title,
  name,
  timeAgo,
  categories,
  description,
  profileImage,
  isOwner, // New prop to check if the current user is the owner
  onEdit,   // New prop for edit action
  onDelete, // New prop for delete action
  // Prop baru untuk fungsionalitas simpan
  forumId,        // Perlu ID forum untuk disimpan/dihapus dari daftar simpanan
  isForumSaved,   // Status apakah forum ini sudah disimpan
  onToggleSave,   // Fungsi untuk mengubah status simpan
}) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md mb-4">
      {/* Title */}
      <h3 className="text-base font-bold text-[#17355c] mb-3">{title}</h3>

      {/* Header */}
      <div className="flex items-start justify-between">
        {/* Profile section */}
        <div className="flex items-start">
          <img
            src={profileImage}
            alt={name}
            className="w-10 h-10 object-cover rounded-md mr-3"
          />
          <div>
            <p className="text-sm font-semibold text-[#17355c]">{name}</p>
            <p className="text-xs text-gray-500">{timeAgo} yang lalu</p>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 flex-wrap">
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((cat, idx) => (
              <span
                key={idx}
                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-lg font-medium"
              >
                {cat}
              </span>
            ))
          ) : (
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-lg font-medium">
              No Category
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="mt-2 pl-13 sm:pl-[0px]">
        <p className="text-sm text-[#5e5a5a]">{description}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center mt-4 gap-3">
        {/* Save Button - Diperbarui untuk warna */}
        <button
          onClick={() => onToggleSave(forumId)} // Panggil fungsi dari prop
          className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold
            ${isForumSaved ? 'bg-orange-400 hover:bg-orange-500' : 'bg-gray-400 hover:bg-gray-500'}
            transition-colors duration-200 ease-in-out
          `}
          title={isForumSaved ? 'Tersimpan' : 'Simpan'}
        >
          <img src="/img/educonnect/bookmark.svg" alt="Save" className="h-4 w-4" />
        </button>

        {/* CRUD Buttons for owner */}
        {isOwner && (
          <>
            <button
              onClick={onEdit}
              className="flex items-center justify-center gap-1 px-3 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg text-sm font-bold"
            >
              <img src="/img/educonnect/edit.svg" alt="Edit" className="h-4 w-4" />
              Edit
            </button>
            <button
              onClick={onDelete}
              className="flex items-center justify-center gap-1 px-3 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white text-sm font-bold"
            >
              <i className="fas fa-trash text-sm"></i>
              Hapus
            </button>
            {/* "Anda membuat forum ini" moved next to Hapus button */}
            <div className="flex items-center gap-2 text-gray-500">
              <img src="/img/educonnect/check.svg" alt="Created" className="h-4 w-4" />
              <span className="text-sm">Anda membuat forum ini</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const ForumCommunity = () => {
  const [userForums, setUserForums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States for Modals
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedForum, setSelectedForum] = useState(null); // Forum being edited/deleted
  const [editForumData, setEditForumData] = useState({
    judul: "",
    kategori: "",
    discordLink: "",
    konten: "",
  });
  const [savedForumIds, setSavedForumIds] = useState(new Set()); // Tambahkan state untuk forum yang disimpan

  // Kategori yang Tersedia (Sesuaikan dengan ENUM di database Anda)
  const availableCategories = [
    'Computer','Desain UI/UX','Digital Marketing','Sains','Bisnis'
  ];

  const fetchUserForums = async () => {
    try {
      setLoading(true);
      // Fetch all forums and filter on the client-side based on isOwner
      const response = await axios.get("http://localhost:5000/forums", { withCredentials: true });
      const currentUserForums = response.data.filter(forum => forum.isOwner);
      setUserForums(currentUserForums);
      setError(null);
    } catch (err) {
      console.error("Error fetching user forums:", err);
      setError("Gagal memuat forum yang Anda tambahkan.");
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
    fetchUserForums();
    fetchSavedForums(); // Panggil juga saat komponen dimuat
  }, []);

  // Function to format time ago
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " tahun";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " bulan";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " hari";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " jam";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " menit";
    return Math.floor(seconds) + " detik";
  };

  // Fungsi untuk menangani bookmark/unbookmark (sama seperti di Forum.jsx)
  const handleBookmark = async (forumId) => {
    try {
      if (savedForumIds.has(forumId)) {
        await axios.delete(`http://localhost:5000/me/saved-forum/${forumId}`, { withCredentials: true });
        setSavedForumIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(forumId);
          return newSet;
        });
        alert("Forum berhasil dihapus dari daftar simpanan!");
      } else {
        await axios.post("http://localhost:5000/me/saved-forum", { forumId }, { withCredentials: true });
        setSavedForumIds(prev => new Set(prev).add(forumId));
        alert("Forum berhasil disimpan!");
      }
    } catch (err) {
      console.error("Error bookmarking forum:", err);
      alert(err.response?.data?.msg || "Gagal mengubah status simpan forum. Silakan login terlebih dahulu.");
    }
  };


  // --- CRUD Operations for Forums ---

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
      fetchUserForums(); // Re-fetch forums after successful update
      alert("Forum berhasil diperbarui!");
    } catch (err) {
      console.error("Error updating forum:", err);
      alert(err.response?.data?.msg || "Gagal memperbarui forum. Pastikan Anda pemilik forum ini dan memilih kategori.");
    }
  };

  const handleDeleteClick = (forum) => {
    setSelectedForum(forum);
    setShowDeleteModal(true);
  };

  const handleDeleteForum = async () => {
    try {
      if (!selectedForum) return;

      await axios.delete(`http://localhost:5000/forums/${selectedForum.uuid}`, { withCredentials: true });
      setShowDeleteModal(false);
      setSelectedForum(null);
      fetchUserForums(); // Re-fetch forums after successful delete
      alert("Forum berhasil dihapus!");
    } catch (err) {
      console.error("Error deleting forum:", err);
      alert(err.response?.data?.msg || "Gagal menghapus forum. Pastikan Anda pemilik forum ini.");
    }
  };


  return (
    <div className="bg-white rounded-[15px] p-6 mb-5">
      <h2 className="text-2xl font-semibold text-[#17355c] mb-6">
        Komunitas Ditambahkan
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Memuat komunitas...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : userForums.length === 0 ? (
        <p className="text-center text-gray-500">Anda belum menambahkan forum apapun.</p>
      ) : (
        <div>
          {userForums.map((item) => (
            <ForumCard
              key={item.uuid}
              title={item.judul}
              name={item.creator.name}
              timeAgo={formatTimeAgo(item.createdAt)}
              categories={[item.kategori]}
              description={item.konten}
              profileImage="/img/educonnect/modell.png" // Static for now, update if user profile images are available
              isOwner={item.isOwner} // Pass the isOwner prop
              onEdit={() => handleEditClick(item)} // Pass edit handler
              onDelete={() => handleDeleteClick(item)} // Pass delete handler
              // Meneruskan prop untuk fungsionalitas simpan
              forumId={item.uuid}
              isForumSaved={savedForumIds.has(item.uuid)} // Tentukan status simpan
              onToggleSave={handleBookmark} // Meneruskan fungsi handleBookmark
            />
          ))}
        </div>
      )}

      {/* Modal Edit Forum */}
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
              <label className="text-sm">Link Eksternal (Discord/Telegram, opsional)</label>
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

      {/* Modal Hapus Forum */}
      {showDeleteModal && selectedForum && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h1 className="text-xl font-semibold text-center text-black">Konfirmasi Hapus Forum</h1>
            <p className="text-center text-gray-600 mb-4">
              Apakah Anda yakin ingin menghapus <strong>{selectedForum.judul}</strong>? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-center gap-4">
              <button onClick={handleDeleteForum} className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md">Ya, Hapus</button>
              <button onClick={() => setShowDeleteModal(false)} className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-md">Batal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumCommunity;