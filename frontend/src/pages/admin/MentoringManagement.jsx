import React, { useState, useEffect } from 'react';
import { Edit, Trash, Plus, Frown, Eye, LayoutDashboard, User } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// URL dasar API Anda
const API_BASE_URL = "http://localhost:5000"; // Pastikan ini sesuai dengan URL backend Anda

const MentoringManagement = () => {
    // State untuk menyimpan sesi mentoring
    const [mentoringSessions, setMentoringSessions] = useState([]);
    // State untuk data form
    const [formData, setFormData] = useState({
        title: '',
        mentorName: '',
        mentorExpertise: '',
        category: '',
        status: 'Tersedia',
        description: '',
        link: '',
        fotoMentor: null, // Akan menyimpan base64 string saat upload, atau path relatif dari backend saat edit
        jumlahPeserta: 0
    });
    // State untuk file foto mentor yang dipilih (objek File)
    const [mentorPhotoFile, setMentorPhotoFile] = useState(null);
    // State untuk pratinjau foto mentor (untuk ditampilkan di form)
    const [mentorPhotoPreview, setMentorPhotoPreview] = useState(null);

    // State untuk sesi yang sedang diedit/dihapus
    const [selectedSession, setSelectedSession] = useState(null);
    // State untuk menampilkan/menyembunyikan form
    const [showForm, setShowForm] = useState(false);
    // State untuk modal konfirmasi delete
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    // State untuk sesi yang akan dihapus
    const [sessionToDelete, setSessionToDelete] = useState(null);
    // State untuk pesan error atau sukses
    const [message, setMessage] = useState('');

    // Fungsi untuk mengambil data sesi mentoring dari backend
    const getMentoringSessions = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/mentoring`); // Gunakan API_BASE_URL
            // Mapping data dari respons backend ke format yang digunakan di frontend
            const mappedSessions = response.data.map(session => ({
                id: session.uuid, // ID di frontend kita gunakan uuid dari backend
                title: session.judul,
                mentorName: session.namaMentor,
                mentorExpertise: session.keahlianMentor,
                category: session.kategoriMentoring,
                status: session.statusMentoring,
                participantCount: session.jumlahPeserta,
                description: session.deskripsi,
                link: session.link,
                // MEMBUAT URL LENGKAP UNTUK FOTOMENTOR UNTUK TAMPILAN
                fotoMentor: session.fotoMentor ? `${API_BASE_URL}${session.fotoMentor}` : null, // <-- PERBAIKAN UTAMA DI SINI
                createdAt: session.createdAt ? new Date(session.createdAt).toISOString().split('T')[0] : '',
                updatedAt: session.updatedAt ? new Date(session.updatedAt).toISOString().split('T')[0] : ''
            }));
            setMentoringSessions(mappedSessions);
        } catch (error) {
            console.error("Error fetching mentoring sessions:", error);
            setMessage("Gagal mengambil data sesi mentoring.");
        }
    };

    // Panggil getMentoringSessions saat komponen pertama kali dimuat
    useEffect(() => {
        getMentoringSessions();
    }, []);

    // Handle perubahan input form teks dan angka
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'number' ? Number(value) : value
        });
    };

    // Handle perubahan input file untuk foto mentor
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setMentorPhotoFile(file); // Simpan objek file

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setMentorPhotoPreview(reader.result); // Tampilkan pratinjau gambar (base64)
                setFormData(prev => ({ ...prev, fotoMentor: reader.result })); // Simpan base64 di formData untuk dikirim ke backend
            };
            reader.readAsDataURL(file); // Baca file sebagai Data URL (base64)
        } else {
            setMentorPhotoPreview(null);
            setFormData(prev => ({ ...prev, fotoMentor: null }));
        }
    };

    // Handle form submission (Add/Update)
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Mapping data dari frontend (formData) ke nama field yang diharapkan backend
        const dataToSend = {
            judul: formData.title,
            deskripsi: formData.description,
            namaMentor: formData.mentorName,
            keahlianMentor: formData.mentorExpertise,
            kategoriMentoring: formData.category,
            statusMentoring: formData.status,
            link: formData.link,
            fotoMentor: formData.fotoMentor, // Kirim base64 string foto mentor
            jumlahPeserta: formData.jumlahPeserta
        };

        try {
            if (selectedSession) {
                // UPDATE existing session
                await axios.patch(`${API_BASE_URL}/mentoring/${selectedSession.id}`, dataToSend); // Gunakan API_BASE_URL
                setMessage("Sesi mentoring berhasil diperbarui!");
            } else {
                // ADD new session
                await axios.post(`${API_BASE_URL}/mentoring`, dataToSend); // Gunakan API_BASE_URL
                setMessage("Sesi mentoring berhasil ditambahkan!");
            }

            // Setelah operasi sukses, ambil ulang data terbaru dari backend
            getMentoringSessions();

            // Reset form dan state terkait foto
            setFormData({
                title: '',
                mentorName: '',
                mentorExpertise: '',
                category: '',
                status: 'Tersedia',
                description: '',
                link: '',
                fotoMentor: null,
                jumlahPeserta: 0
            });
            setSelectedSession(null);
            setShowForm(false);
            setMentorPhotoFile(null);
            setMentorPhotoPreview(null);
        } catch (error) {
            console.error("Error submitting form:", error.response ? error.response.data : error.message);
            setMessage(`Gagal menyimpan sesi: ${error.response?.data?.msg || error.message}`);
        }
    };

    // Handle Edit (mengisi form dengan data sesi yang akan diedit)
    const handleEdit = (session) => {
        setSelectedSession(session);
        // Isi form dengan data sesi yang dipilih (gunakan nama field frontend)
        setFormData({
            title: session.title,
            mentorName: session.mentorName,
            mentorExpertise: session.mentorExpertise,
            category: session.category,
            status: session.status,
            description: session.description,
            link: session.link,
            // Penting: Saat edit, set fotoMentor di formData sebagai *path relatif* jika itu yang backend simpan
            // Ini untuk memastikan jika user TIDAK mengunggah gambar baru, gambar lama tetap terkait.
            // Namun, untuk preview, kita perlu URL lengkap.
            fotoMentor: session.fotoMentor ? session.fotoMentor.replace(API_BASE_URL, '') : null, // Hapus API_BASE_URL untuk mendapatkan path relatif yang dikirim ke backend
            jumlahPeserta: session.participantCount
        });
        setMentorPhotoFile(null); // Reset file input state
        // Tampilkan pratinjau foto yang sudah ada (pastikan URL lengkap)
        setMentorPhotoPreview(session.fotoMentor || null); // <-- PERBAIKAN DI SINI UNTUK PREVIEW
        setShowForm(true);
    };

    // Handle Delete (membuka modal konfirmasi hapus)
    const handleDelete = (session) => {
        setSessionToDelete(session);
        setShowDeleteModal(true);
    };

    // Konfirmasi dan eksekusi penghapusan
    const confirmDelete = async () => {
        try {
            await axios.delete(`${API_BASE_URL}/mentoring/${sessionToDelete.id}`); // Gunakan API_BASE_URL
            setMessage("Sesi mentoring berhasil dihapus!");
            getMentoringSessions(); // Refresh data setelah hapus
            setShowDeleteModal(false);
            setSessionToDelete(null);
        } catch (error) {
            console.error("Error deleting session:", error);
            setMessage(`Gagal menghapus sesi: ${error.response?.data?.msg || error.message}`);
        }
    };

    // Hitung statistik sesi
    const totalSessions = mentoringSessions.length;
    const activeSessions = mentoringSessions.filter(session => session.status === 'Tersedia').length;
    const totalParticipants = mentoringSessions.reduce((sum, session) => sum + session.participantCount, 0);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header */}
            <header className="bg-white h-[60px] px-5 shadow-sm fixed top-0 left-0 right-0 z-50 flex items-center">
                <div className="w-full flex justify-between items-center">
                    <div className="flex items-center">
                        <Link to="/adminhome" className="flex items-center">
                            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-sm mr-3">
                                {/* Assuming this image path is correct */}
                                <img src="/img/eduriselanding/Ellipse 1.png" alt="EduRise Logo" className="w-[34px] h-[34px] object-contain" />
                            </div>
                        </Link>
                        <h4 className="m-0 italic font-bold ml-2">EDURISE ADMIN</h4>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/adminhome" className="text-gray-700 hover:text-[#3375CC]">Dashboard</Link>
                        <Link to="/data-admin" className="w-10 h-10 rounded-full bg-[#3375CC] text-white flex items-center justify-center">
                            <User size={24} />
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="mt-[100px] p-5">
                <div className="max-w-[1400px] mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Manajemen Sesi Mentoring</h1>

                    {/* Statistik */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Total Sesi</p>
                                <h2 className="text-2xl font-bold text-gray-800">{totalSessions}</h2>
                            </div>
                            <LayoutDashboard className="text-blue-500 w-8 h-8" />
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Sesi Tersedia</p>
                                <h2 className="text-2xl font-bold text-gray-800">{activeSessions}</h2>
                            </div>
                            <Eye className="text-green-500 w-8 h-8" />
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Total Peserta</p>
                                <h2 className="text-2xl font-bold text-gray-800">{totalParticipants}</h2>
                            </div>
                            <User className="text-purple-500 w-8 h-8" />
                        </div>
                    </div>

                    {/* Pesan status */}
                    {message && (
                        <div className={`p-4 mb-4 rounded-md ${message.includes('Gagal') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                            {message}
                        </div>
                    )}

                    {/* Tombol Tambah Sesi */}
                    <div className="mb-6 flex justify-end">
                        <button
                            onClick={() => {
                                setShowForm(true);
                                setSelectedSession(null); // Pastikan tidak ada sesi yang terpilih saat menambah baru
                                setFormData({ // Reset form data
                                    title: '',
                                    mentorName: '',
                                    mentorExpertise: '',
                                    category: '',
                                    status: 'Tersedia',
                                    description: '',
                                    link: '',
                                    fotoMentor: null, // Reset fotoMentor
                                    jumlahPeserta: 0
                                });
                                setMentorPhotoFile(null); // Reset file input
                                setMentorPhotoPreview(null); // Reset pratinjau
                            }}
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 flex items-center"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Tambah Sesi Mentoring
                        </button>
                    </div>

                    {/* Form Tambah/Edit Sesi (Modal) */}
                    {showForm && (
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-8 w-full max-w-md overflow-y-auto max-h-[90vh]">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                    {selectedSession ? 'Edit Sesi Mentoring' : 'Tambah Sesi Mentoring Baru'}
                                </h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Judul Sesi</label>
                                            <input
                                                type="text"
                                                id="title"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="mentorName" className="block text-sm font-medium text-gray-700">Nama Mentor</label>
                                            <input
                                                type="text"
                                                id="mentorName"
                                                name="mentorName"
                                                value={formData.mentorName}
                                                onChange={handleChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="mentorExpertise" className="block text-sm font-medium text-gray-700">Keahlian Mentor</label>
                                            <input
                                                type="text"
                                                id="mentorExpertise"
                                                name="mentorExpertise"
                                                value={formData.mentorExpertise}
                                                onChange={handleChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Kategori</label>
                                            <input
                                                type="text"
                                                id="category"
                                                name="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                                            <select
                                                id="status"
                                                name="status"
                                                value={formData.status}
                                                onChange={handleChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                                required
                                            >
                                                <option value="Tersedia">Tersedia</option>
                                                <option value="Penuh">Penuh</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="link" className="block text-sm font-medium text-gray-700">Link Sesi</label>
                                            <input
                                                type="url"
                                                id="link"
                                                name="link"
                                                value={formData.link}
                                                onChange={handleChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                                required
                                            />
                                        </div>
                                        {/* Input untuk Foto Mentor */}
                                        <div>
                                            <label htmlFor="fotoMentor" className="block text-sm font-medium text-gray-700">Foto Mentor</label>
                                            <input
                                                type="file"
                                                id="fotoMentor"
                                                name="fotoMentor"
                                                accept="image/*"
                                                onChange={handlePhotoChange}
                                                className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                            />
                                            {/* Pratinjau gambar yang baru dipilih atau gambar yang sudah ada */}
                                            {/* Perbaiki src untuk pratinjau agar menampilkan URL lengkap */}
                                            {(mentorPhotoPreview) && ( // Hanya tampilkan jika ada preview
                                                <img
                                                    src={mentorPhotoPreview} // Ini akan menjadi base64 jika baru upload, atau URL lengkap jika edit
                                                    alt="Pratinjau Mentor"
                                                    className="mt-2 w-20 h-20 object-cover rounded-full border border-gray-200 shadow-sm"
                                                />
                                            )}
                                        </div>
                                        {/* Input untuk Jumlah Peserta */}
                                        <div>
                                            <label htmlFor="jumlahPeserta" className="block text-sm font-medium text-gray-700">Jumlah Peserta</label>
                                            <input
                                                type="number"
                                                id="jumlahPeserta"
                                                name="jumlahPeserta"
                                                value={formData.jumlahPeserta}
                                                onChange={handleChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                                min="0"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Deskripsi</label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows="3"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="mt-6 flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowForm(false);
                                                setSelectedSession(null);
                                                setFormData({
                                                    title: '',
                                                    mentorName: '',
                                                    mentorExpertise: '',
                                                    category: '',
                                                    status: 'Tersedia',
                                                    description: '',
                                                    link: '',
                                                    fotoMentor: null,
                                                    jumlahPeserta: 0
                                                });
                                                setMentorPhotoFile(null);
                                                setMentorPhotoPreview(null);
                                            }}
                                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
                                        >
                                            {selectedSession ? 'Perbarui Sesi' : 'Tambah Sesi'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Tabel Sesi Mentoring */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Foto</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mentor</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keahlian</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peserta</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {mentoringSessions.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                                            <div className="flex flex-col items-center justify-center py-8">
                                                <Frown className="w-12 h-12 text-gray-400 mb-3" />
                                                Tidak ada sesi mentoring yang ditemukan.
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    mentoringSessions.map((session) => (
                                        <tr key={session.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {session.fotoMentor ? (
                                                    <img
                                                        src={session.fotoMentor} // Ini sudah URL lengkap karena di-map di getMentoringSessions
                                                        alt={session.mentorName}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                                                        No Photo
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{session.title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{session.mentorName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{session.mentorExpertise}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{session.category}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    session.status === 'Tersedia'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {session.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{session.participantCount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => handleEdit(session)}
                                                    className="text-blue-600 hover:text-blue-900 mr-3"
                                                    title="Edit Sesi"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(session)}
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Hapus Sesi"
                                                >
                                                    <Trash className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Modal Konfirmasi Hapus */}
                    {showDeleteModal && sessionToDelete && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">Konfirmasi Hapus</h2>
                                <p className="text-gray-600 mb-6">
                                    Apakah Anda yakin ingin menghapus sesi mentoring "<span className="font-bold">{sessionToDelete.title}</span>"?
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
            </main>
        </div>
    );
};

export default MentoringManagement;