import React, { useState, useEffect } from 'react';
import { Edit, Trash, Plus, User, LayoutDashboard, Frown } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// URL dasar API Anda
const API_BASE_URL = "http://localhost:5000";

const ForumManagement = () => {
    const [forums, setForums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // State untuk form tambah/edit
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        uuid: null, // Untuk menyimpan UUID saat edit
        judul: '',
        konten: '',
        kategori: '',
        discordLink: ''
    });
    const [selectedForum, setSelectedForum] = useState(null); // Untuk menyimpan forum yang sedang diedit

    // State untuk modal konfirmasi delete
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [forumToDelete, setForumToDelete] = useState(null);

    // Kategori yang Tersedia (Diambil dari Forum.jsx)
    const availableCategories = [
        'Computer', 'Desain UI/UX', 'Digital Marketing', 'Sains', 'Bisnis'
    ];

    // Fungsi untuk memformat waktu (Diambil dari Forum.jsx)
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

    // Fungsi untuk mengambil data forum dari backend
    const fetchForums = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get("http://localhost:5000/forums", { withCredentials: true });
        console.log("Data forum dari API:", response.data); // Tambahkan ini
        setForums(response.data);
            setForums(response.data);
        } catch (err) {
            console.error("Error fetching forums:", err);
            setError(`Gagal memuat data forum: ${err.response?.data?.msg || err.message}`);
            toast.error(`Gagal memuat data forum: ${err.response?.data?.msg || err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Panggil fetchForums saat komponen pertama kali dimuat
    useEffect(() => {
        fetchForums();
    }, []);

    // Handle perubahan input form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle submit form (Tambah/Edit)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const dataToSend = {
            judul: formData.judul,
            konten: formData.konten,
            kategori: formData.kategori,
            discordLink: formData.discordLink || null // Pastikan null jika kosong
        };

        try {
            if (selectedForum) {
                // Mode Edit
                await axios.patch(`${API_BASE_URL}/forums/${selectedForum.uuid}`, dataToSend, { withCredentials: true });
                toast.success("Forum berhasil diperbarui!");
            } else {
                // Mode Tambah
                await axios.post(`${API_BASE_URL}/forums`, dataToSend, { withCredentials: true });
                toast.success("Forum berhasil ditambahkan!");
            }
            fetchForums(); // Refresh data
            closeForm(); // Tutup form dan reset state
        } catch (err) {
            console.error("Error submitting forum:", err);
            setError(`Gagal menyimpan forum: ${err.response?.data?.msg || err.message}`);
            toast.error(`Gagal menyimpan forum: ${err.response?.data?.msg || err.message}`);
        }
    };

    // Handle Edit
    const handleEdit = (forum) => {
        setSelectedForum(forum);
        setFormData({
            uuid: forum.uuid, // Simpan UUID untuk update
            judul: forum.judul,
            konten: forum.konten,
            kategori: forum.kategori,
            discordLink: forum.discordLink || ''
        });
        setShowForm(true);
    };

    // Handle Delete (membuka modal konfirmasi)
    const handleDelete = (forum) => {
        setForumToDelete(forum);
        setShowDeleteModal(true);
    };

    // Konfirmasi dan eksekusi penghapusan
    const confirmDelete = async () => {
        setError('');
        try {
            await axios.delete(`${API_BASE_URL}/forums/${forumToDelete.uuid}`, { withCredentials: true });
            toast.success("Forum berhasil dihapus!");
            fetchForums(); // Refresh data
            setShowDeleteModal(false);
            setForumToDelete(null);
        } catch (err) {
            console.error("Error deleting forum:", err);
            setError(`Gagal menghapus forum: ${err.response?.data?.msg || err.message}`);
            toast.error(`Gagal menghapus forum: ${err.response?.data?.msg || err.message}`);
        }
    };

    // Fungsi untuk menutup form dan mereset state
    const closeForm = () => {
        setShowForm(false);
        setSelectedForum(null);
        setFormData({
            uuid: null,
            judul: '',
            konten: '',
            kategori: '',
            discordLink: ''
        });
    };

    // Statistik (tidak ada di data Forum.jsx, jadi ini tetap default)
    const totalForums = forums.length;
    const activeForums = forums.length; // Asumsi semua yang diambil active
    const totalParticipants = 0; // Tidak ada di backend, default 0

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header */}
            <header className="bg-white h-[60px] px-5 shadow-sm fixed top-0 left-0 right-0 z-50 flex items-center">
                <div className="w-full flex justify-between items-center">
                    <div className="flex items-center">
                        <Link to="/adminhome" className="flex items-center">
                            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-sm mr-3">
                                <img src="/img/eduriselanding/Ellipse 1.png" alt="EduRise Logo" className="w-[34px] h-[34px] object-contain" />
                            </div>
                        </Link>
                        <h4 className="m-0 italic font-bold ml-2">EDURISE ADMIN</h4>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/adminhome" className="text-gray-700 hover:text-[#3375CC]">Dashboard</Link>
                        <Link to="/data-admin" className="w-10 h-10 rounded-full bg-[#3375CC] text-white !text-white flex items-center justify-center">
                            <User size={24} />
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="mt-[100px] p-5">
                <div className="max-w-[1400px] mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Manajemen Forum Diskusi</h1>

                    {/* Statistik */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Total Forum</p>
                                <h2 className="text-2xl font-bold text-gray-800">{totalForums}</h2>
                            </div>
                            <LayoutDashboard className="text-blue-500 w-8 h-8" />
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Forum Aktif</p>
                                <h2 className="text-2xl font-bold text-gray-800">{activeForums}</h2>
                            </div>
                            <User className="text-green-500 w-8 h-8" />
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Total Peserta</p>
                                <h2 className="text-2xl font-bold text-gray-800">{totalParticipants}</h2>
                            </div>
                            <Plus className="text-purple-500 w-8 h-8" />
                        </div>
                    </div>

                    {/* Pesan Error */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <strong className="font-bold">Error!</strong>
                            <span className="block sm:inline"> {error}</span>
                        </div>
                    )}

                    {/* Tombol Tambah Forum */}
                    <div className="mb-6 flex justify-end">
                        <button
                            onClick={() => {
                                setShowForm(true);
                                setSelectedForum(null); // Reset selected forum saat menambah baru
                                setFormData({ // Reset form data
                                    uuid: null,
                                    judul: '',
                                    konten: '',
                                    kategori: '',
                                    discordLink: ''
                                });
                            }}
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 flex items-center"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Tambah Forum Diskusi
                        </button>
                    </div>

                    {/* Form Tambah/Edit Forum (Modal) */}
                    {showForm && (
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-8 w-full max-w-md overflow-y-auto max-h-[90vh]">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                    {selectedForum ? 'Edit Forum Diskusi' : 'Tambah Forum Diskusi Baru'}
                                </h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="judul" className="block text-sm font-medium text-gray-700">Judul Forum</label>
                                        <input
                                            type="text"
                                            id="judul"
                                            name="judul"
                                            value={formData.judul}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="kategori" className="block text-sm font-medium text-gray-700">Kategori</label>
                                        <select
                                            id="kategori"
                                            name="kategori"
                                            value={formData.kategori}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            required
                                        >
                                            <option value="">Pilih Kategori</option>
                                            {availableCategories.map((category) => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="discordLink" className="block text-sm font-medium text-gray-700">Link Eksternal (Discord/Telegram, opsional)</label>
                                        <input
                                            type="url"
                                            id="discordLink"
                                            name="discordLink"
                                            value={formData.discordLink}
                                            onChange={handleChange}
                                            placeholder="Contoh: https://discord.gg/abcd"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="konten" className="block text-sm font-medium text-gray-700">Konten / Deskripsi</label>
                                        <textarea
                                            id="konten"
                                            name="konten"
                                            value={formData.konten}
                                            onChange={handleChange}
                                            rows="4"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            onClick={closeForm}
                                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
                                        >
                                            {selectedForum ? 'Perbarui Forum' : 'Tambah Forum'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Tabel Forum Diskusi */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden overflow-x-auto">
                        {loading ? (
                            <div className="p-8 text-center text-gray-500">Memuat data forum...</div>
                        ) : forums.length === 0 ? (
                            <div className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                                <div className="flex flex-col items-center justify-center py-8">
                                    <Frown className="w-12 h-12 text-gray-400 mb-3" />
                                    Tidak ada forum diskusi yang ditemukan.
                                </div>
                            </div>
                        ) : (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kreator</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keahlian Kreator</th> {/* Ini tidak ada di BE */}
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th> {/* Ini tidak ada di BE */}
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peserta</th> {/* Ini tidak ada di BE */}
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Dibuat</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {forums.map((forum) => (
                                        <tr key={forum.uuid}> {/* Menggunakan forum.uuid sebagai key */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{forum.judul}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{forum.creator ? forum.creator.name : 'Unknown User'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                N/A {/* Tidak ada di backend */}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{forum.kategori}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800`}>
                                                    Active {/* Asumsi semua yang diambil 'Active' */}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0</td> {/* Tidak ada di backend */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatTimeAgo(forum.createdAt)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => handleEdit(forum)}
                                                    className="text-blue-600 hover:text-blue-900 mr-3"
                                                    title="Edit Forum"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(forum)}
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Hapus Forum"
                                                >
                                                    <Trash className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {/* Modal Konfirmasi Hapus */}
                    {showDeleteModal && forumToDelete && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">Konfirmasi Hapus</h2>
                                <p className="text-gray-600 mb-6">
                                    Apakah Anda yakin ingin menghapus forum "<span className="font-bold">{forumToDelete.judul}</span>"?
                                    Tindakan ini tidak bisa dibatalkan.
                                </p>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        onClick={() => setShowDeleteModal(false)}
                                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-150 ease-in-out"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={confirmDelete}
                                        className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-150 ease-in-out"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            </main>
        </div>
    );
};

export default ForumManagement;