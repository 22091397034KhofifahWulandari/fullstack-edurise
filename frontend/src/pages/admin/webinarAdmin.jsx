import React, { useState, useRef, useEffect } from 'react';
import { Plus, Edit, Trash, ArrowLeft, Filter } from 'lucide-react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// --- Konfigurasi Axios ---
axios.defaults.baseURL = 'http://localhost:5000'; // Sesuaikan dengan alamat backend Anda

const WebinarAdmin = () => {
    const [webinars, setWebinars] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedWebinar, setSelectedWebinar] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [previewImg, setPreviewImg] = useState(null);
    const formRef = useRef(null);
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    // State untuk filter (hanya status yang tersisa)
    const [filterStatus, setFilterStatus] = useState("");

    // State untuk data form, disesuaikan dengan nama kolom BE
    const [formData, setFormData] = useState({
        judul: '',
        deskripsi: '',
        gambar: '', // Akan disimpan sebagai string (URL atau Base64)
        link_webinar: '',
        penyelenggara: '',
        kategori: '',
        tanggal_pelaksanaan: '', // Format YYYY-MM-DD
        jam_pelaksanaan: '', // Format HH:MM
        narasumber: '',
        link_rekaman: '',
        link_sertifikat: '',
        status: '', // upcoming, completed, cancelled
    });

    // Mengambil data webinar setiap kali komponen di-mount atau filter berubah
    // Hanya filterStatus yang menjadi dependency
    useEffect(() => {
        getWebinars();
    }, [filterStatus]);

    const getWebinars = async () => {
        setLoading(true);
        try {
            const params = {};
            if (filterStatus) params.status = filterStatus; // Hanya mengirim filter status

            const response = await axios.get('/webinars', { params });
            // Menyesuaikan penamaan data dari BE ke FE jika diperlukan untuk tampilan
            const formattedData = response.data.map(w => ({
                id: w.uuid, // Menggunakan uuid sebagai id unik di FE
                judul: w.judul,
                deskripsi: w.deskripsi,
                gambar: w.gambar,
                linkWebinar: w.link_webinar,
                penyelenggara: w.penyelenggara,
                kategori: w.kategori,
                tanggalWebinar: w.tanggal_pelaksanaan, // Tanggal dari BE
                waktuWebinar: w.jam_pelaksanaan, // Jam dari BE
                namaPJ: w.narasumber, // Di FE sebelumnya namaPJ, sekarang narasumber
                linkSertifikat: w.link_sertifikat,
                linkRekaman: w.link_rekaman,
                status: w.status,
                createdAt: w.createdAt,
                updatedAt: w.updatedAt,
            }));
            setWebinars(formattedData);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            const errorMessage = error.response?.data?.msg || "Terjadi kesalahan saat mengambil data webinar.";
            setMsg(errorMessage);
            toast.error(errorMessage);
            console.error("Error fetching webinars:", error);
        }
    };

    // Fungsi untuk menangani perubahan input form
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        // Penyesuaian khusus untuk jam: jika jam_pelaksanaan menggunakan HH:MM:SS di BE
        // dan input FE adalah HH:MM, kita bisa menambahkan :00
        const newValue = id === 'jam_pelaksanaan' && value.length === 5 ? `${value}:00` : value;
        setFormData((prev) => ({ ...prev, [id]: newValue }));
    };

    // Fungsi untuk menangani perubahan gambar (mengkonversi ke Base64)
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({ ...prev, gambar: reader.result })); // Simpan Base64 string
                setPreviewImg(reader.result);
            };
            reader.readAsDataURL(file); // Membaca file sebagai Data URL (Base64)
        } else {
            setFormData((prev) => ({ ...prev, gambar: '' }));
            setPreviewImg(null);
        }
    };

    // Fungsi untuk menampilkan form tambah webinar
    const handleAddWebinar = () => {
        setSelectedWebinar(null);
        setFormData({
            judul: '',
            deskripsi: '',
            gambar: '',
            link_webinar: '',
            penyelenggara: '',
            kategori: '',
            tanggal_pelaksanaan: '',
            jam_pelaksanaan: '',
            narasumber: '',
            link_rekaman: '',
            link_sertifikat: '',
            status: '',
        });
        setPreviewImg(null);
        setIsEditMode(false);
        setShowForm(true);
        setMsg("");
    };

    // Fungsi untuk menampilkan form edit webinar dengan data yang sudah ada
    const handleEditWebinar = (webinar) => {
        setSelectedWebinar(webinar);
        setFormData({
            judul: webinar.judul,
            deskripsi: webinar.deskripsi,
            gambar: webinar.gambar, // Gambar dari BE (mungkin URL)
            link_webinar: webinar.linkWebinar, // Sesuaikan dengan BE
            penyelenggara: webinar.penyelenggara,
            kategori: webinar.kategori,
            tanggal_pelaksanaan: formatDateForInput(webinar.tanggalWebinar), // Format ke YYYY-MM-DD
            jam_pelaksanaan: formatTimeForInput(webinar.waktuWebinar), // Format ke HH:MM
            narasumber: webinar.namaPJ, // Sesuaikan dengan BE
            link_rekaman: webinar.linkRekaman,
            link_sertifikat: webinar.linkSertifikat,
            status: webinar.status,
        });
        setPreviewImg(webinar.gambar);
        setIsEditMode(true);
        setShowForm(true);
        setMsg("");
    };

    // Fungsi untuk menampilkan modal konfirmasi hapus webinar
    const handleDeleteWebinar = (webinar) => {
        setSelectedWebinar(webinar);
        setShowDeleteModal(true);
        setMsg("");
    };

    // Fungsi untuk mengkonfirmasi dan menghapus webinar
    const confirmDelete = async () => {
        setLoading(true);
        try {
            await axios.delete(`/webinars/${selectedWebinar.id}`);
            setMsg("Webinar berhasil dihapus!");
            toast.success("Webinar berhasil dihapus!");
            setShowDeleteModal(false);
            setSelectedWebinar(null);
            getWebinars(); // Refresh data setelah dihapus
        } catch (error) {
            const errorMessage = error.response?.data?.msg || "Terjadi kesalahan saat menghapus webinar.";
            setMsg(errorMessage);
            toast.error(errorMessage);
            console.error("Error deleting webinar:", error);
            setLoading(false);
        }
    };

    // Fungsi untuk submit form (tambah/edit webinar)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg("");

        // Pastikan format jam adalah HH:MM:SS (jika BE membutuhkannya)
        const jamPelaksanaan = formData.jam_pelaksanaan.length === 5
            ? `${formData.jam_pelaksanaan}:00`
            : formData.jam_pelaksanaan;

        const payload = {
            judul: formData.judul,
            deskripsi: formData.deskripsi,
            gambar: formData.gambar,
            link_webinar: formData.link_webinar,
            penyelenggara: formData.penyelenggara,
            kategori: formData.kategori,
            tanggal_pelaksanaan: formData.tanggal_pelaksanaan,
            jam_pelaksanaan: jamPelaksanaan, // Gunakan format yang sesuai
            narasumber: formData.narasumber,
            link_rekaman: formData.link_rekaman,
            link_sertifikat: formData.link_sertifikat,
            status: formData.status,
        };

        try {
            if (isEditMode) {
                await axios.patch(`/webinars/${selectedWebinar.id}`, payload);
                setMsg("Webinar berhasil diperbarui!");
                toast.success("Webinar berhasil diperbarui!");
            } else {
                await axios.post('/webinars', payload);
                setMsg("Webinar berhasil ditambahkan!");
                toast.success("Webinar berhasil ditambahkan!");
            }
            setShowForm(false);
            setIsEditMode(false);
            setPreviewImg(null);
            getWebinars(); // Refresh data setelah submit
        } catch (error) {
            const errorMessage = error.response?.data?.msg || "Terjadi kesalahan. Pastikan semua kolom terisi dengan benar.";
            setMsg(errorMessage);
            toast.error(errorMessage);
            console.error("Error submitting form:", error);
            setLoading(false);
        }
    };

    // Helper function untuk memformat tanggal ke YYYY-MM-DD untuk input type="date"
    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    // Helper function untuk memformat jam ke HH:MM untuk input type="time"
    const formatTimeForInput = (timeString) => {
        if (!timeString) return '';
        // Asumsi timeString dari BE adalah HH:MM:SS atau HH:MM
        return timeString.substring(0, 5); // Ambil hanya HH:MM
    };

    return (
        <div className="min-h-screen bg-[#f9fafb]">
            <header className="bg-white h-[60px] px-5 shadow-sm fixed top-0 left-0 right-0 z-50 flex items-center">
                <div className="w-full flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-sm mr-3">
                            <img src="/img/eduriselanding/Ellipse 1.png" alt="EduRise Logo" className="w-[34px] h-[34px] object-contain" />
                        </div>
                        <h4 className="m-0 italic font-bold ml-2">EDURISE ADMIN</h4>
                    </div>
                </div>
            </header>
            <main className="pt-[80px] px-6 pb-[30px] min-h-screen bg-[#f9fafb] max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Daftar Webinar</h2>
                        <div className="flex space-x-2">
                            {/* Filter Section - Kategori Dihapus */}
                            <div className="flex gap-2">
                                <select
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25"
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                    <option value="">Semua Status</option>
                                    <option value="upcoming">Upcoming</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                            <button
                                onClick={handleAddWebinar}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
                            >
                                <Plus size={20} />
                                Tambah Webinar
                            </button>
                        </div>
                    </div>
                    {msg && !showForm && ( // Hanya tampilkan pesan jika form tidak aktif
                        <div className={`p-3 mb-4 rounded-md text-sm ${msg.includes("berhasil") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                            {msg}
                        </div>
                    )}
                    {loading && (
                        <div className="text-center py-4">
                            <p>Loading data...</p>
                        </div>
                    )}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Penyelenggara</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {webinars.length === 0 && !loading ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">Tidak ada data webinar.</td>
                                    </tr>
                                ) : (
                                    webinars.map((w) => (
                                        <tr key={w.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{w.judul}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{w.penyelenggara}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDateForInput(w.tanggalWebinar)} {formatTimeForInput(w.waktuWebinar)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{w.status}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleEditWebinar(w)}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        <Edit size={20} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteWebinar(w)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        <Trash size={20} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Form Section */}
                {showForm && (
                    <div className="bg-white rounded-lg shadow-md mx-auto my-5">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h4 className="m-0 font-medium text-lg">{isEditMode ? 'Edit Webinar' : 'Tambah Webinar'}</h4>
                            <button
                                onClick={() => {
                                    setShowForm(false);
                                    setIsEditMode(false);
                                    setPreviewImg(null);
                                    setFormData({
                                        judul: '', deskripsi: '', gambar: '', link_webinar: '', penyelenggara: '',
                                        kategori: '', tanggal_pelaksanaan: '', jam_pelaksanaan: '', narasumber: '',
                                        link_rekaman: '', link_sertifikat: '', status: '',
                                    });
                                    setMsg("");
                                }}
                                className="px-4 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-100 inline-flex items-center"
                            >
                                <ArrowLeft size={16} className="mr-1" /> Kembali
                            </button>
                        </div>
                        <div className="p-5">
                            <form className="w-full" onSubmit={handleSubmit} ref={formRef}>
                                {msg && showForm && (
                                    <div className={`p-3 mb-4 rounded-md text-sm ${msg.includes("berhasil") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                        {msg}
                                    </div>
                                )}
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="mb-4">
                                        <label htmlFor="judul" className="block mb-1 font-medium">Judul Webinar</label>
                                        <input
                                            type="text"
                                            id="judul"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                            placeholder="Masukkan judul webinar"
                                            value={formData.judul}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="deskripsi" className="block mb-1 font-medium">Deskripsi Singkat</label>
                                        <textarea
                                            id="deskripsi"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                            placeholder="Masukkan deskripsi singkat webinar"
                                            rows="2"
                                            value={formData.deskripsi}
                                            onChange={handleInputChange}
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="penyelenggara" className="block mb-1 font-medium">Penyelenggara</label>
                                        <input
                                            type="text"
                                            id="penyelenggara"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                            placeholder="Masukkan nama penyelenggara"
                                            value={formData.penyelenggara}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="narasumber" className="block mb-1 font-medium">Narasumber</label>
                                        <input
                                            type="text"
                                            id="narasumber"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                            placeholder="Masukkan nama narasumber"
                                            value={formData.narasumber}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="kategori" className="block mb-1 font-medium">Kategori</label>
                                        <select
                                            id="kategori"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                            value={formData.kategori}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Pilih Kategori</option>
                                            <option value="Karir">Karir</option>
                                            <option value="Beasiswa">Beasiswa</option>
                                            <option value="Pengembangan Diri">Pengembangan Diri</option>
                                            {/* Tambahkan kategori lain sesuai BE Anda */}
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="mb-4">
                                            <label htmlFor="tanggal_pelaksanaan" className="block mb-1 font-medium">Tanggal Pelaksanaan</label>
                                            <input
                                                type="date"
                                                id="tanggal_pelaksanaan"
                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                                value={formatDateForInput(formData.tanggal_pelaksanaan)}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="jam_pelaksanaan" className="block mb-1 font-medium">Jam Pelaksanaan</label>
                                            <input
                                                type="time"
                                                id="jam_pelaksanaan"
                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                                value={formatTimeForInput(formData.jam_pelaksanaan)}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="link_webinar" className="block mb-1 font-medium">Link Webinar</label>
                                        <input
                                            type="url"
                                            id="link_webinar"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                            placeholder="https://meet.google.com/..."
                                            value={formData.link_webinar}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="link_rekaman" className="block mb-1 font-medium">Link Rekaman (Opsional)</label>
                                        <input
                                            type="url"
                                            id="link_rekaman"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                            placeholder="https://drive.google.com/..."
                                            value={formData.link_rekaman}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="link_sertifikat" className="block mb-1 font-medium">Link Sertifikat (Opsional)</label>
                                        <input
                                            type="url"
                                            id="link_sertifikat"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                            placeholder="https://drive.google.com/..."
                                            value={formData.link_sertifikat}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="status" className="block mb-1 font-medium">Status Webinar</label>
                                        <select
                                            id="status"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                            value={formData.status}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Pilih Status</option>
                                            <option value="upcoming">Upcoming</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="gambar" className="block mb-1 font-medium">Upload Gambar Thumbnail</label>
                                        <div className="border-2 border-dashed border-gray-300 p-5 text-center rounded-lg bg-white">
                                            <input
                                                type="file"
                                                id="gambar"
                                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                                onChange={handleImageChange}
                                                // Gambar bersifat opsional untuk edit jika sudah ada, wajib untuk tambah
                                                required={!isEditMode && !formData.gambar}
                                            />
                                            <div className="mt-3 min-h-[100px] flex flex-col justify-center items-center bg-gray-100 rounded p-2.5">
                                                {previewImg ? (
                                                    <img
                                                        src={previewImg}
                                                        alt="Preview gambar"
                                                        className="max-w-full max-h-[200px] object-contain"
                                                    />
                                                ) : (
                                                    <p className="text-gray-500 m-0">Preview gambar akan muncul di sini</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-[#3375CC] hover:bg-[#295ea3] text-white font-medium rounded transition-colors"
                                        disabled={loading}
                                    >
                                        {loading ? 'Memproses...' : (isEditMode ? 'Update Webinar' : 'Tambah Webinar')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[999]">
                        <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                            <h3 className="text-lg font-medium mb-4">Konfirmasi Hapus</h3>
                            <p className="text-gray-500 mb-4">
                                Apakah Anda yakin ingin menghapus webinar "<span className="font-semibold">{selectedWebinar?.judul}</span>"?
                            </p>
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 modal-delete-btn"
                                    disabled={loading}
                                >
                                    {loading ? 'Menghapus...' : 'Hapus'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <ToastContainer position="top-right" />
            </main>
        </div>
    );
};

export default WebinarAdmin;