import React, { useState, useEffect, useRef } from 'react';
import { Edit, Trash, Eye, Filter, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// --- Konfigurasi Axios ---
axios.defaults.baseURL = 'http://localhost:5000'; // Sesuaikan dengan alamat backend Anda

const WebinarPesertaAdmin = () => {
    const [peserta, setPeserta] = useState([]);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPeserta, setSelectedPeserta] = useState(null);
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    // Filter states
    const [filterStatusPeserta, setFilterStatusPeserta] = useState("");

    // Form data for editing (only status for simplicity, can expand if needed)
    const [editFormData, setEditFormData] = useState({
        status_pendaftaran: '',
    });

    // Fetch data on component mount and when filters change
    useEffect(() => {
        getWebinarPeserta();
    }, [filterStatusPeserta]);

    const getWebinarPeserta = async () => {
        setLoading(true);
        try {
            const params = {};
            if (filterStatusPeserta) params.status_pendaftaran = filterStatusPeserta;
            const response = await axios.get('/webinar-peserta', { params });
            setPeserta(response.data.map(p => ({
                ...p,
                webinarTitle: p.webinar ? p.webinar.judul : 'N/A', // Map nested webinar title
            })));
            setLoading(false);
        } catch (error) {
            setLoading(false);
            const errorMessage = error.response?.data?.msg || "Terjadi kesalahan saat mengambil data pendaftar webinar.";
            setMsg(errorMessage);
            toast.error(errorMessage);
            console.error("Error fetching webinar participants:", error);
            setPeserta([]); // Clear data on error or no results
        }
    };

    // --- Handlers for Modals and Actions ---

    const handleViewDetail = (pesertaItem) => {
        setSelectedPeserta(pesertaItem);
        setShowDetailModal(true);
    };

    const handleEditPeserta = (pesertaItem) => {
        setSelectedPeserta(pesertaItem);
        setEditFormData({
            status_pendaftaran: pesertaItem.status_pendaftaran,
        });
        setShowEditModal(true);
        setMsg("");
    };

    const handleDeletePeserta = (pesertaItem) => {
        setSelectedPeserta(pesertaItem);
        setShowDeleteModal(true);
        setMsg("");
    };

    // --- Form Input Change Handler ---
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setEditFormData((prev) => ({ ...prev, [id]: value }));
    };

    // --- API Calls ---

    const confirmEdit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg("");
        try {
            await axios.patch(`/webinar-peserta/${selectedPeserta.uuid}`, editFormData);
            setMsg("Status pendaftaran berhasil diperbarui!");
            toast.success("Status pendaftaran berhasil diperbarui!");
            setShowEditModal(false);
            setSelectedPeserta(null);
            getWebinarPeserta(); // Refresh data
        } catch (error) {
            const errorMessage = error.response?.data?.msg || "Terjadi kesalahan saat memperbarui pendaftaran.";
            setMsg(errorMessage);
            toast.error(errorMessage);
            console.error("Error updating participant:", error);
            setLoading(false);
        }
    };

    const confirmDelete = async () => {
        setLoading(true);
        try {
            await axios.delete(`/webinar-peserta/${selectedPeserta.uuid}`);
            setMsg("Pendaftar berhasil dihapus!");
            toast.success("Pendaftar berhasil dihapus!");
            setShowDeleteModal(false);
            setSelectedPeserta(null);
            getWebinarPeserta(); // Refresh data
        } catch (error) {
            const errorMessage = error.response?.data?.msg || "Terjadi kesalahan saat menghapus pendaftar.";
            setMsg(errorMessage);
            toast.error(errorMessage);
            console.error("Error deleting participant:", error);
            setLoading(false);
        }
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
                        <h2 className="text-xl font-semibold">Daftar Pendaftar Webinar</h2>
                        <div className="flex space-x-2">
                            {/* Filter Section */}
                            <select
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25"
                                value={filterStatusPeserta}
                                onChange={(e) => setFilterStatusPeserta(e.target.value)}
                            >
                                <option value="">Semua Status</option>
                                <option value="terdaftar">Terdaftar</option>
                                <option value="hadir">Hadir</option>
                                <option value="pending">Pending</option>
                                <option value="dibatalkan">Dibatalkan</option>
                            </select>
                        </div>
                    </div>
                    {msg && (
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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Peserta</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {peserta.length === 0 && !loading ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-4 text-center text-gray-500">Tidak ada data pendaftar webinar.</td>
                                    </tr>
                                ) : (
                                    peserta.map((p) => (
                                        <tr key={p.uuid}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.nama}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{p.status_pendaftaran}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleViewDetail(p)}
                                                        className="text-gray-600 hover:text-gray-900"
                                                        title="Lihat Detail"
                                                    >
                                                        <Eye size={20} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleEditPeserta(p)}
                                                        className="text-blue-600 hover:text-blue-900"
                                                        title="Edit Status"
                                                    >
                                                        <Edit size={20} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeletePeserta(p)}
                                                        className="text-red-600 hover:text-red-900"
                                                        title="Hapus Pendaftar"
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

                {/* Detail Modal */}
                {showDetailModal && selectedPeserta && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[999]">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full">
                            <h3 className="text-lg font-medium mb-4">Detail Pendaftar Webinar</h3>
                            <div className="space-y-2 text-sm text-gray-700">
                                <p><strong>Nama:</strong> {selectedPeserta.nama}</p>
                                <p><strong>Email:</strong> {selectedPeserta.email}</p>
                                <p><strong>Nomor HP:</strong> {selectedPeserta.nomor_hp}</p>
                                <p><strong>Jenjang Pendidikan:</strong> {selectedPeserta.jenjang_pendidikan}</p>
                                <p><strong>Instansi Pendidikan:</strong> {selectedPeserta.instansi_pendidikan}</p>
                                <p><strong>Jurusan:</strong> {selectedPeserta.jurusan || '-'}</p>
                                <p><strong>Alasan Mengikuti:</strong> {selectedPeserta.alasan_mengikuti_webinar}</p>
                                <p><strong>Status Pendaftaran:</strong> <span className="capitalize">{selectedPeserta.status_pendaftaran}</span></p>
                                <p><strong>Tanggal Daftar:</strong> {new Date(selectedPeserta.createdAt).toLocaleDateString()} {new Date(selectedPeserta.createdAt).toLocaleTimeString()}</p>
                            </div>
                            <div className="flex justify-end mt-6">
                                <button
                                    onClick={() => setShowDetailModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Status Modal */}
                {showEditModal && selectedPeserta && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[999]">
                        <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                            <h3 className="text-lg font-medium mb-4">Edit Status Pendaftaran</h3>
                            <form onSubmit={confirmEdit}>
                                <div className="mb-4">
                                    <label htmlFor="nama" className="block mb-1 font-medium">Nama Peserta</label>
                                    <input
                                        type="text"
                                        id="nama"
                                        className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
                                        value={selectedPeserta.nama}
                                        disabled
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="status_pendaftaran" className="block mb-1 font-medium">Status Pendaftaran</label>
                                    <select
                                        id="status_pendaftaran"
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                        value={editFormData.status_pendaftaran}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Pilih Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="terdaftar">Terdaftar</option>
                                        <option value="hadir">Hadir</option>
                                        <option value="dibatalkan">Dibatalkan</option>
                                    </select>
                                </div>
                                {msg && (
                                    <div className={`p-3 mb-4 rounded-md text-sm ${msg.includes("berhasil") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                        {msg}
                                    </div>
                                )}
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowEditModal(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                        disabled={loading}
                                    >
                                        {loading ? 'Memperbarui...' : 'Simpan Perubahan'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteModal && selectedPeserta && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[999]">
                        <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                            <h3 className="text-lg font-medium mb-4">Konfirmasi Hapus</h3>
                            <p className="text-gray-500 mb-4">
                                Apakah Anda yakin ingin menghapus pendaftar "<span className="font-semibold">{selectedPeserta?.nama}</span>" untuk webinar "<span className="font-semibold">{selectedPeserta?.webinarTitle}</span>"?
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
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
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

export default WebinarPesertaAdmin;