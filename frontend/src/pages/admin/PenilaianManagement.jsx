import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Edit, Trash, Eye, CheckCircle, Clock, AlertCircle, ArrowLeft, BarChart2, FileText, CircleCheck, BookOpen, Pen, X, LayoutDashboard } from 'lucide-react'; // Tambahkan LayoutDashboard jika belum ada

// UNCOMMENT INI UNTUK INTEGRASI BACKEND
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PenilaianManagement = () => {
    const [essays, setEssays] = useState([]); // Akan menyimpan daftar esai dari backend
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all'); // 'all', '0' (pending), '1' (dinilai)

    // State untuk form penilaian
    const [showPenilaianForm, setShowPenilaianForm] = useState(false);
    const [selectedEssayForPenilaian, setSelectedEssayForPenilaian] = useState(null);
    const [penilaianFormData, setPenilaianFormData] = useState({
        skor_struktur: 0, feedback_struktur: '',
        skor_topik: 0, feedback_topik: '',
        skor_grammar: 0, feedback_grammar: '',
        skor_gaya: 0, feedback_gaya: '',
        skor_panjang: 0, feedback_panjang: ''
    });
    const [editingPenilaianId, setEditingPenilaianId] = useState(null); // ID penilaian jika sedang mode edit

    // State untuk modal detail esai
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [detailEssay, setDetailEssay] = useState(null);

    // State untuk modal konfirmasi delete penilaian
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [penilaianToDelete, setPenilaianToDelete] = useState(null);

    // BASE_URL for API calls
    const API_BASE_URL = 'http://localhost:5000'; // Sesuaikan dengan URL backend Anda

    // Fungsi untuk mengambil data esai
    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            // **PENYESUAIAN URL: Gunakan /admin/essays sesuai rute backend**
            let url = `${API_BASE_URL}/admin/essays`;
            if (filterStatus !== 'all') {
                url += `?feedbackReady=${filterStatus}`;
            }
            const essayResponse = await axios.get(url, { withCredentials: true });
            console.log("Fetched Essays:", essayResponse.data);
            setEssays(essayResponse.data);

        } catch (err) {
            setError(err.response?.data?.msg || 'Gagal memuat data esai dan penilaian.');
            toast.error(err.response?.data?.msg || 'Gagal memuat data!');
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filterStatus]); // Re-fetch data saat filterStatus berubah

    // Filter dan pencarian
    const filteredEssays = essays.filter(essay => {
        const matchesSearch = searchTerm === '' ||
            essay.userSubmitter?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            essay.isi_essay.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesSearch;
    });

    // Handle score change in form
    const handleScoreChange = (e) => {
        const { name, value } = e.target;
        // Pastikan skor adalah angka antara 0 dan 20
        const score = Math.min(20, Math.max(0, parseInt(value, 10) || 0));
        setPenilaianFormData(prev => ({
            ...prev,
            [name]: score
        }));
    };

    // Handle feedback change in form
    const handleFeedbackChange = (e) => {
        const { name, value } = e.target;
        setPenilaianFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Open penilaian form/modal
    const handlePenilaiClick = (essay) => {
        setSelectedEssayForPenilaian(essay);
        // Ambil penilaian pertama jika ada (asumsi 1 penilaian per esai oleh 1 admin)
        const existingPenilaian = essay.penilaianEssays?.[0]; 
        if (existingPenilaian) {
            // Jika sudah ada penilaian, isi form dengan data yang ada
            setEditingPenilaianId(existingPenilaian.id);
            setPenilaianFormData({
                skor_struktur: existingPenilaian.skor_struktur, feedback_struktur: existingPenilaian.feedback_struktur,
                skor_topik: existingPenilaian.skor_topik, feedback_topik: existingPenilaian.feedback_topik,
                skor_grammar: existingPenilaian.skor_grammar, feedback_grammar: existingPenilaian.feedback_grammar,
                skor_gaya: existingPenilaian.skor_gaya, feedback_gaya: existingPenilaian.feedback_gaya,
                skor_panjang: existingPenilaian.skor_panjang, feedback_panjang: existingPenilaian.feedback_panjang
            });
        } else {
            // Jika belum ada penilaian, reset form
            setEditingPenilaianId(null);
            setPenilaianFormData({
                skor_struktur: 0, feedback_struktur: '',
                skor_topik: 0, feedback_topik: '',
                skor_grammar: 0, feedback_grammar: '',
                skor_gaya: 0, feedback_gaya: '',
                skor_panjang: 0, feedback_panjang: ''
            });
        }
        setShowPenilaianForm(true);
    };

    // Submit penilaian form
    const handleSubmitPenilaian = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                essayId: selectedEssayForPenilaian.id,
                ...penilaianFormData
            };
            let response;
            if (editingPenilaianId) {
                // **PENYESUAIAN METHOD/URL: Gunakan PATCH atau PUT sesuai rute update /penilaian/:id**
                response = await axios.patch(`${API_BASE_URL}/penilaian/${editingPenilaianId}`, payload, { withCredentials: true });
                toast.success('Penilaian berhasil diperbarui!');
            } else {
                // CREATE penilaian
                response = await axios.post(`${API_BASE_URL}/penilaian`, payload, { withCredentials: true });
                toast.success('Penilaian berhasil ditambahkan!');
            }
            console.log(response.data);
            setShowPenilaianForm(false);
            fetchData(); // Refresh data setelah submit
        } catch (err) {
            toast.error(err.response?.data?.msg || 'Gagal menyimpan penilaian!');
            console.error("Error submitting penilaian:", err);
        }
    };

    // Handle view detail click
    const handleViewDetail = (essay) => {
        setDetailEssay(essay);
        setShowDetailModal(true);
    };

    // Handle delete penilaian click
    const handleDeletePenilaianClick = (penilaian) => {
        setPenilaianToDelete(penilaian);
        setShowDeleteConfirmation(true);
    };

    // Confirm delete penilaian
    const confirmDeletePenilaian = async () => {
        try {
            await axios.delete(`${API_BASE_URL}/penilaian/${penilaianToDelete.id}`, { withCredentials: true });
            toast.success('Penilaian berhasil dihapus!');
            setShowDeleteConfirmation(false);
            setPenilaianToDelete(null);
            fetchData(); // Refresh data setelah delete
        } catch (err) {
            toast.error(err.response?.data?.msg || 'Gagal menghapus penilaian!');
            console.error("Error deleting penilaian:", err);
        }
    };

    // Fungsi untuk menghapus esai
    const handleDeleteEssay = async (essayId) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus esai ini secara permanen? Ini akan menghapus semua penilaian terkait.")) {
            try {
                // **PENYESUAIAN URL: Gunakan /admin/essays/:id sesuai rute backend**
                await axios.delete(`${API_BASE_URL}/admin/essays/${essayId}`, { withCredentials: true });
                toast.success('Esai berhasil dihapus!');
                fetchData(); // Refresh data setelah penghapusan
            } catch (err) {
                toast.error(err.response?.data?.msg || 'Gagal menghapus esai!');
                console.error("Error deleting essay:", err);
            }
        }
    };

    if (loading) return <div className="text-center py-10">Memuat data...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-white shadow-sm p-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Link to="/admin/dashboard" className="text-gray-600 hover:text-gray-800">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-2xl font-semibold text-gray-800">Manajemen Penilaian Esai</h1>
                </div>
            </header>

            <main className="flex-1 p-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-700">Daftar Esai yang Dikirim</h2>
                        <div className="flex items-center space-x-3">
                            <div className="relative flex items-center">
                            <Search
                                className="absolute left-3 text-gray-400 pointer-events-none"
                                size={18}
                            />
                            <input
                                type="text"
                                placeholder="Cari esai atau nama pengirim..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            </div>
                            <select
                                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="all">Semua Esai</option>
                                <option value="0">Belum Dinilai</option>
                                <option value="1">Sudah Dinilai</option>
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Esai</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pengirim</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Isi Esai (Ringkasan)</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Kirim</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status Penilaian</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skor Total</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredEssays.length > 0 ? (
                                    filteredEssays.map(essay => (
                                        <tr key={essay.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{essay.id}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                                {essay.userSubmitter?.name || 'N/A'}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-900 max-w-xs truncate">
                                                {essay.isi_essay.substring(0, 100)}...
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(essay.tanggal_submit).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                {essay.feedback_ready ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        <CheckCircle size={14} className="mr-1" /> Dinilai
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                        <Clock size={14} className="mr-1" /> Belum Dinilai
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                                {essay.total_skor !== null ? essay.total_skor : '-'}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleViewDetail(essay)}
                                                        className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-100 transition-colors"
                                                        title="Lihat Detail Esai"
                                                    >
                                                        <Eye size={20} />
                                                    </button>
                                                    <button
                                                        onClick={() => handlePenilaiClick(essay)}
                                                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-100 transition-colors"
                                                        title="Berikan Penilaian"
                                                    >
                                                        <Pen size={20} />
                                                    </button>
                                                    {essay.penilaianEssays && essay.penilaianEssays.length > 0 && (
                                                        <button
                                                            onClick={() => handleDeletePenilaianClick(essay.penilaianEssays[0])} // Asumsi 1 penilaian per esai
                                                            className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100 transition-colors"
                                                            title="Hapus Penilaian"
                                                        >
                                                            <Trash size={20} />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDeleteEssay(essay.id)}
                                                        className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100 transition-colors"
                                                        title="Hapus Esai"
                                                    >
                                                        <X size={20} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-4 py-3 text-center text-sm text-gray-500">
                                            Tidak ada esai yang ditemukan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Penilaian Form Modal */}
                {showPenilaianForm && selectedEssayForPenilaian && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[999]">
                        <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <h3 className="text-xl font-bold mb-4">
                                {editingPenilaianId ? 'Edit Penilaian Esai' : 'Berikan Penilaian Esai'}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Esai dari: <span className="font-semibold">{selectedEssayForPenilaian.userSubmitter?.name}</span>
                            </p>
                            <div className="bg-gray-50 p-4 rounded-md mb-4 border border-gray-200">
                                <h4 className="font-semibold mb-2">Isi Esai:</h4>
                                <p className="text-gray-700 whitespace-pre-wrap">{selectedEssayForPenilaian.isi_essay}</p>
                            </div>

                            <form onSubmit={handleSubmitPenilaian}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    {/* Kriteria Struktur */}
                                    <div>
                                        <label htmlFor="skor_struktur" className="block text-sm font-medium text-gray-700 mb-1">
                                            Skor Struktur (0-20)
                                        </label>
                                        <input
                                            type="number"
                                            id="skor_struktur"
                                            name="skor_struktur"
                                            min="0"
                                            max="20"
                                            value={penilaianFormData.skor_struktur}
                                            onChange={handleScoreChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                        <label htmlFor="feedback_struktur" className="block text-sm font-medium text-gray-700 mt-3 mb-1">
                                            Feedback Struktur
                                        </label>
                                        <textarea
                                            id="feedback_struktur"
                                            name="feedback_struktur"
                                            rows="3"
                                            value={penilaianFormData.feedback_struktur}
                                            onChange={handleFeedbackChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Berikan feedback tentang struktur esai..."
                                        ></textarea>
                                    </div>

                                    {/* Kriteria Topik */}
                                    <div>
                                        <label htmlFor="skor_topik" className="block text-sm font-medium text-gray-700 mb-1">
                                            Skor Topik (0-20)
                                        </label>
                                        <input
                                            type="number"
                                            id="skor_topik"
                                            name="skor_topik"
                                            min="0"
                                            max="20"
                                            value={penilaianFormData.skor_topik}
                                            onChange={handleScoreChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                        <label htmlFor="feedback_topik" className="block text-sm font-medium text-gray-700 mt-3 mb-1">
                                            Feedback Topik
                                        </label>
                                        <textarea
                                            id="feedback_topik"
                                            name="feedback_topik"
                                            rows="3"
                                            value={penilaianFormData.feedback_topik}
                                            onChange={handleFeedbackChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Berikan feedback tentang pengembangan topik..."
                                        ></textarea>
                                    </div>

                                    {/* Kriteria Grammar */}
                                    <div>
                                        <label htmlFor="skor_grammar" className="block text-sm font-medium text-gray-700 mb-1">
                                            Skor Grammar (0-20)
                                        </label>
                                        <input
                                            type="number"
                                            id="skor_grammar"
                                            name="skor_grammar"
                                            min="0"
                                            max="20"
                                            value={penilaianFormData.skor_grammar}
                                            onChange={handleScoreChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                        <label htmlFor="feedback_grammar" className="block text-sm font-medium text-gray-700 mt-3 mb-1">
                                            Feedback Grammar
                                        </label>
                                        <textarea
                                            id="feedback_grammar"
                                            name="feedback_grammar"
                                            rows="3"
                                            value={penilaianFormData.feedback_grammar}
                                            onChange={handleFeedbackChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Berikan feedback tentang tata bahasa..."
                                        ></textarea>
                                    </div>

                                    {/* Kriteria Gaya Bahasa */}
                                    <div>
                                        <label htmlFor="skor_gaya" className="block text-sm font-medium text-gray-700 mb-1">
                                            Skor Gaya Bahasa (0-20)
                                        </label>
                                        <input
                                            type="number"
                                            id="skor_gaya"
                                            name="skor_gaya"
                                            min="0"
                                            max="20"
                                            value={penilaianFormData.skor_gaya}
                                            onChange={handleScoreChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                        <label htmlFor="feedback_gaya" className="block text-sm font-medium text-gray-700 mt-3 mb-1">
                                            Feedback Gaya Bahasa
                                        </label>
                                        <textarea
                                            id="feedback_gaya"
                                            name="feedback_gaya"
                                            rows="3"
                                            value={penilaianFormData.feedback_gaya}
                                            onChange={handleFeedbackChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Berikan feedback tentang gaya penulisan..."
                                        ></textarea>
                                    </div>

                                    {/* Kriteria Panjang */}
                                    <div>
                                        <label htmlFor="skor_panjang" className="block text-sm font-medium text-gray-700 mb-1">
                                            Skor Panjang (0-20)
                                        </label>
                                        <input
                                            type="number"
                                            id="skor_panjang"
                                            name="skor_panjang"
                                            min="0"
                                            max="20"
                                            value={penilaianFormData.skor_panjang}
                                            onChange={handleScoreChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                        <label htmlFor="feedback_panjang" className="block text-sm font-medium text-gray-700 mt-3 mb-1">
                                            Feedback Panjang
                                        </label>
                                        <textarea
                                            id="feedback_panjang"
                                            name="feedback_panjang"
                                            rows="3"
                                            value={penilaianFormData.feedback_panjang}
                                            onChange={handleFeedbackChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Berikan feedback tentang panjang esai..."
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setShowPenilaianForm(false)}
                                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-150 ease-in-out"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-150 ease-in-out"
                                    >
                                        {editingPenilaianId ? 'Perbarui Penilaian' : 'Simpan Penilaian'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Detail Essay Modal */}
                {showDetailModal && detailEssay && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[999]">
                        <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                            <h3 className="text-xl font-bold mb-4">Detail Esai</h3>
                            <div className="mb-4">
                                <p className="text-gray-600">
                                    **Pengirim:** <span className="font-semibold">{detailEssay.userSubmitter?.name || 'N/A'}</span>
                                </p>
                                <p className="text-gray-600">
                                    **Email Pengirim:** <span className="font-semibold">{detailEssay.userSubmitter?.email || 'N/A'}</span>
                                </p>
                                <p className="text-gray-600">
                                    **Tanggal Kirim:** {new Date(detailEssay.tanggal_submit).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                </p>
                                <p className="text-gray-600">
                                    **Skor Total:** {detailEssay.total_skor !== null ? detailEssay.total_skor : 'Belum Dinilai'} / 100
                                </p>
                                <p className="text-gray-600">
                                    **Status:** {detailEssay.feedback_ready ?
                                        <span className="font-semibold text-green-600">Sudah Dinilai</span> :
                                        <span className="font-semibold text-yellow-600">Belum Dinilai</span>
                                    }
                                </p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-md mb-4 border border-gray-200">
                                <h4 className="font-semibold mb-2 flex items-center">
                                    <FileText size={20} className="mr-2" /> Isi Esai Lengkap:
                                </h4>
                                <p className="text-gray-700 whitespace-pre-wrap">{detailEssay.isi_essay}</p>
                            </div>

                            {detailEssay.penilaianEssays && detailEssay.penilaianEssays.length > 0 ? (
                                <div className="mt-6">
                                    <h4 className="text-lg font-bold mb-3 flex items-center">
                                        <BookOpen size={20} className="mr-2" /> Detail Penilaian:
                                    </h4>
                                    {detailEssay.penilaianEssays.map((p, index) => (
                                        <div key={p.id || index} className="bg-blue-50 p-4 rounded-md mb-4 border border-blue-200">
                                            <p className="text-blue-800 font-semibold mb-2">
                                                Dinilai oleh: {p.adminPenilai?.name || 'Admin tidak dikenal'} pada {new Date(p.tanggal_review).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <p className="font-medium text-gray-800">Struktur: {p.skor_struktur}/20</p>
                                                    <p className="text-gray-700 text-sm">Feedback: {p.feedback_struktur || '-'}</p>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800">Topik: {p.skor_topik}/20</p>
                                                    <p className="text-gray-700 text-sm">Feedback: {p.feedback_topik || '-'}</p>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800">Grammar: {p.skor_grammar}/20</p>
                                                    <p className="text-gray-700 text-sm">Feedback: {p.feedback_grammar || '-'}</p>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800">Gaya Bahasa: {p.skor_gaya}/20</p>
                                                    <p className="text-gray-700 text-sm">Feedback: {p.feedback_gaya || '-'}</p>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800">Panjang: {p.skor_panjang}/20</p>
                                                    <p className="text-gray-700 text-sm">Feedback: {p.feedback_panjang || '-'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-600 italic mt-4">Belum ada penilaian untuk esai ini.</p>
                            )}

                            <div className="flex justify-end mt-6">
                                <button
                                    onClick={() => setShowDetailModal(false)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-150 ease-in-out"
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal for Penilaian */}
                {showDeleteConfirmation && penilaianToDelete && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[999]">
                        <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                            <h3 className="text-lg font-medium mb-4">Konfirmasi Hapus Penilaian</h3>
                            <p className="text-gray-500 mb-4">
                                Apakah Anda yakin ingin menghapus penilaian ini?
                            </p>
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => setShowDeleteConfirmation(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={confirmDeletePenilaian}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 modal-delete-btn"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            </main>
        </div>
    );
};

export default PenilaianManagement;