import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Plus, Edit, Trash, ArrowLeft, Link as LinkIcon, Calendar, User, ExternalLink } from 'lucide-react';
// import { v4 as uuidv4 } from 'uuid'; // Diimpor tapi tidak digunakan di FE, bisa dihapus jika tidak ada kebutuhan
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// --- Konfigurasi Axios ---
axios.defaults.baseURL = 'http://localhost:5000'; // Pastikan ini mengarah ke backend Anda yang benar

const ArtikelManagement = () => {
    const [articles, setArticles] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [previewImg, setPreviewImg] = useState(null);

    const [loading, setLoading] = useState(false); // Untuk indikator loading data artikel
    const [formSubmitting, setFormSubmitting] = useState(false); // Untuk indikator saat submit form
    const [deleteLoading, setDeleteLoading] = useState(false); // Untuk indikator saat delete

    // Menggunakan useCallback untuk fungsi yang tidak berubah antar render
    const formatDate = useCallback((dateString) => {
        if (!dateString) return 'Tanggal Tidak Tersedia';
        try {
            const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' };
            return new Date(dateString).toLocaleDateString('id-ID', options);
        } catch (e) {
            console.error("Error formatting date:", dateString, e);
            return dateString; // Fallback jika format tanggal tidak valid
        }
    }, []);

    const isValidUrl = useCallback((string) => {
        try {
            new URL(string);
            return true;
        } catch (error) {
            return false;
        }
    }, []);

    const showMessage = useCallback((message, type = 'success') => {
        if (type === 'success') {
            toast.success(message);
        } else if (type === 'error') {
            toast.error(message);
        } else if (type === 'warning') {
            toast.warning(message);
        } else {
            toast.info(message);
        }
    }, []);

    const fetchArticles = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get('/articles');
            console.log('API Response Data for GET /articles:', response.data);

            let fetchedData = response.data;
            if (fetchedData && typeof fetchedData === 'object' && !Array.isArray(fetchedData) && fetchedData.data && Array.isArray(fetchedData.data)) {
                fetchedData = fetchedData.data;
            } else if (!Array.isArray(fetchedData)) {
                console.warn("API did not return an array for articles. Received:", fetchedData);
                fetchedData = [];
            }
            setArticles(fetchedData);
        } catch (err) {
            const errorMessage = err.response?.data?.msg || err.message || 'Terjadi kesalahan saat memuat artikel.';
            console.error("Error fetching articles:", err.response?.data || err);
            showMessage(`Gagal memuat artikel: ${errorMessage}`, "error");
            setArticles([]); // Pastikan state tetap array kosong jika gagal
        } finally {
            setLoading(false);
        }
    }, [showMessage]);

    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);

    const [formData, setFormData] = useState({
        judul: '',
        deskripsi: '',
        gambar: '', // Ini akan menyimpan base64 atau URL gambar dari database
        link: '',
        penulis: '',
        kategori: 'Beasiswa & Pendidikan',
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                showMessage("Ukuran file terlalu besar (maksimal 5MB)", "warning");
                e.target.value = ''; // Clear the input
                setPreviewImg(null); // Clear preview
                setFormData(prev => ({ ...prev, gambar: '' })); // Clear formData.gambar
                return;
            }
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                showMessage("Tipe file tidak didukung. Silakan unggah gambar (JPG, PNG, GIF, atau WEBP)", "warning");
                e.target.value = ''; // Clear the input
                setPreviewImg(null); // Clear preview
                setFormData(prev => ({ ...prev, gambar: '' })); // Clear formData.gambar
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const base64Image = e.target.result;
                setPreviewImg(base64Image);
                setFormData((prev) => ({ ...prev, gambar: base64Image })); // Simpan base64 ke formData
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImg(null);
            setFormData(prev => ({ ...prev, gambar: '' })); // Clear gambar if no file selected
        }
    };

    const resetForm = useCallback(() => {
        setFormData({
            judul: '',
            deskripsi: '',
            gambar: '',
            link: '',
            penulis: '',
            kategori: 'Beasiswa & Pendidikan',
        });
        setPreviewImg(null);
        setSelectedArticle(null);
        setIsEditMode(false);
        // Pastikan input file dikosongkan secara manual jika ada
        const fileInput = document.getElementById('gambar');
        if (fileInput) fileInput.value = '';
    }, []);

    const handleAddArticle = useCallback(() => {
        console.log("handleAddArticle dipanggil"); // DEBUG
        resetForm();
        setShowForm(true);
    }, [resetForm]);

    const handleEditArticle = useCallback((article) => {
        console.log("handleEditArticle dipanggil dengan artikel:", article); // DEBUG
        setSelectedArticle(article);
        setFormData({
            judul: article.judul,
            deskripsi: article.deskripsi,
            gambar: article.gambar, // Gunakan gambar yang ada jika tidak diubah
            link: article.link,
            penulis: article.penulis,
            kategori: article.kategori,
        });
        setPreviewImg(article.gambar); // Tampilkan gambar yang ada sebagai preview
        setIsEditMode(true);
        setShowForm(true);
    }, []);

    const handleDeleteArticle = useCallback((article) => {
        console.log("handleDeleteArticle dipanggil dengan artikel:", article); // DEBUG
        setSelectedArticle(article);
        setShowDeleteModal(true);
    }, []);

    const confirmDelete = async () => {
        if (!selectedArticle) return;

        setDeleteLoading(true); // Mulai loading untuk delete
        try {
            await axios.delete(`/articles/${selectedArticle.uuid}`);
            showMessage("Artikel berhasil dihapus.", "success");
            await fetchArticles(); // Refresh daftar artikel
        } catch (err) {
            const errorMessage = err.response?.data?.msg || err.message || 'Gagal menghapus artikel.';
            console.error("Error deleting article:", err.response?.data || err);
            showMessage(`Terjadi kesalahan saat menghapus artikel: ${errorMessage}`, "error");
        } finally {
            setDeleteLoading(false); // Selesai loading untuk delete
            setShowDeleteModal(false);
            setSelectedArticle(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Sangat penting untuk mencegah refresh halaman

        console.log("handleSubmit dipanggil"); // DEBUG
        setFormSubmitting(true); // Mulai loading untuk submit form

        try {
            if (!formData.judul || !formData.deskripsi || !formData.link || !formData.penulis || !formData.kategori) {
                showMessage("Mohon lengkapi semua field yang diperlukan.", "warning");
                return; // Berhenti di sini jika validasi gagal
            }

            if (!isValidUrl(formData.link)) {
                showMessage("Format URL tidak valid. Pastikan URL dimulai dengan http:// atau https://.", "warning");
                return; // Berhenti di sini jika validasi gagal
            }

            // Validasi gambar:
            // Jika mode "tambah" (bukan edit) DAN tidak ada gambar yang diunggah
            if (!isEditMode && !formData.gambar) {
                showMessage("Mohon unggah gambar untuk artikel baru.", "warning");
                return; // Berhenti di sini jika validasi gagal
            }

            const payload = {
                ...formData,
                // Gunakan base64 dari previewImg jika ada, jika tidak gunakan gambar yang sudah ada (formData.gambar),
                // fallback ke placeholder jika keduanya kosong.
                gambar: previewImg || formData.gambar || 'https://via.placeholder.com/400x300?text=No+Image',
            };

            console.log('Payload to send:', payload); // DEBUG: Lihat payload yang akan dikirim

            if (isEditMode) {
                console.log('Mengirim PUT ke:', `/articles/${selectedArticle.uuid}`, payload); // DEBUG
                await axios.patch(`/articles/${selectedArticle.uuid}`, payload);
                showMessage("Artikel berhasil diperbarui!", "success");
            } else {
                console.log('Mengirim POST ke:', '/articles', payload); // DEBUG
                await axios.post('/articles', payload);
                showMessage("Artikel berhasil ditambahkan!", "success");
            }

            await fetchArticles(); // Refresh daftar artikel setelah submit
            setShowForm(false); // Sembunyikan form setelah sukses
            resetForm(); // Reset semua state form

        } catch (err) {
            const errorMessage = err.response?.data?.msg || err.message || 'Terjadi kesalahan saat menyimpan artikel.';
            console.error("Error submitting form:", err.response?.data || err); // Log error yang lebih detail

            // Penanganan spesifik untuk error 404 pada PUT (misal: UUID tidak ditemukan)
            if (isEditMode && err.response && err.response.status === 404) {
                 showMessage("Artikel tidak ditemukan. Mungkin sudah dihapus atau URL tidak valid.", "error");
            } else if (err.response?.data?.msg && err.response.data.msg.includes('Link artikel sudah ada')) {
                 showMessage("Link artikel sudah ada. Mohon gunakan link lain.", "warning");
            } else {
                 showMessage(`Gagal ${isEditMode ? 'memperbarui' : 'menambahkan'} artikel: ${errorMessage}`, "error");
            }
        } finally {
            setFormSubmitting(false); // Selesai loading untuk submit form
        }
    };

    return (
        <div className="min-h-screen bg-[#f9fafb] relative">
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
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <h2 className="text-xl font-semibold">Manajemen Artikel</h2>
                        <button
                            onClick={handleAddArticle}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
                            disabled={loading || formSubmitting || deleteLoading} // Disable jika sedang memuat atau submit/delete
                        >
                            <Plus size={20} />
                            Tambah Artikel
                        </button>
                    </div>

                    {loading ? (
                        <div className="py-10 text-center">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                            <p className="mt-2 text-gray-500">Memuat data artikel...</p>
                        </div>
                    ) : articles.length === 0 ? (
                        <div className="py-10 text-center">
                            <p className="text-gray-500">
                                Belum ada artikel. Silakan tambahkan yang baru.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {articles.map((article) => (
                                <div
                                    key={article.uuid}
                                    className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={article.gambar || 'https://via.placeholder.com/400x300?text=No+Image'}
                                            alt={article.judul}
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/400x300?text=Image+Error" }} // Fallback jika gambar error
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-start justify-between">
                                            <h3 className="text-lg font-semibold line-clamp-2 pr-2">{article.judul}</h3>
                                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                                                {article.kategori}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 mt-2 line-clamp-3 text-sm">
                                            {article.deskripsi}
                                        </p>

                                        <div className="mt-3 flex items-center text-gray-500 text-sm">
                                            <User size={14} className="mr-1" />
                                            <span>{article.penulis}</span>
                                        </div>

                                        <div className="mt-2 text-xs text-gray-500">
                                            <div className="flex items-center">
                                                <Calendar size={14} className="mr-1" />
                                                <span>Dibuat: {formatDate(article.createdAt)}</span>
                                            </div>
                                            {article.updatedAt && article.createdAt !== article.updatedAt && (
                                                <div className="flex items-center mt-1">
                                                    <Calendar size={14} className="mr-1" />
                                                    <span>Diperbarui: {formatDate(article.updatedAt)}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex justify-between items-center mt-4">
                                            <a
                                                href={isValidUrl(article.link) ? article.link : '#'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                                            >
                                                <ExternalLink size={14} className="mr-1" />
                                                Lihat Sumber
                                            </a>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleEditArticle(article)}
                                                    className="text-blue-600 hover:text-blue-900 bg-blue-50 p-1 rounded"
                                                    title="Edit artikel"
                                                    disabled={formSubmitting || deleteLoading} // Disable saat form lain aktif
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteArticle(article)}
                                                    className="text-red-600 hover:text-red-900 bg-red-50 p-1 rounded"
                                                    title="Hapus artikel"
                                                    disabled={formSubmitting || deleteLoading} // Disable saat form lain aktif
                                                >
                                                    <Trash size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Form Section */}
                {showForm && (
                    // Overlay untuk form, memastikan form di atas segalanya
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[100]">
                        <div className="bg-white rounded-lg shadow-xl mx-auto w-full max-w-2xl overflow-y-auto max-h-[90vh]">
                            <div className="flex justify-between items-center p-4 border-b">
                                <h4 className="m-0 font-medium text-lg">{isEditMode ? 'Edit Artikel' : 'Tambah Artikel'}</h4>
                                <button
                                    onClick={() => { setShowForm(false); resetForm(); }}
                                    className="px-4 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-100 inline-flex items-center"
                                    disabled={formSubmitting}
                                >
                                    <ArrowLeft size={16} className="mr-1" /> Kembali
                                </button>
                            </div>
                            <div className="p-5">
                                <form className="w-full" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="mb-4">
                                            <label htmlFor="judul" className="block mb-1 font-medium">
                                                Judul Artikel <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="judul"
                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500"
                                                placeholder="Masukkan judul artikel"
                                                value={formData.judul}
                                                onChange={handleInputChange}
                                                required
                                                minLength={10}
                                                maxLength={100}
                                            />
                                            <small className="text-gray-500">Judul artikel (10-100 karakter)</small>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="deskripsi" className="block mb-1 font-medium">
                                                Deskripsi <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                id="deskripsi"
                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500"
                                                placeholder="Masukkan deskripsi singkat artikel"
                                                rows="4"
                                                value={formData.deskripsi}
                                                onChange={handleInputChange}
                                                required
                                                minLength={20}
                                                maxLength={500}
                                            ></textarea>
                                            <small className="text-gray-500">Deskripsi artikel (20-500 karakter)</small>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="link" className="block mb-1 font-medium">
                                                Link Artikel <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <LinkIcon size={16} className="text-gray-400" />
                                                </div>
                                                <input
                                                    type="url"
                                                    id="link"
                                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500"
                                                    placeholder="https://..."
                                                    value={formData.link}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <small className="text-gray-500">URL artikel yang akan ditautkan</small>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="penulis" className="block mb-1 font-medium">
                                                Penulis <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="penulis"
                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500"
                                                placeholder="Masukkan nama penulis/sumber"
                                                value={formData.penulis}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="kategori" className="block mb-1 font-medium">
                                                Kategori <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                id="kategori"
                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500"
                                                value={formData.kategori}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="Beasiswa & Pendidikan">Beasiswa & Pendidikan</option>
                                                <option value="Pengembangan Diri & Karir">Pengembangan Diri & Karir</option>
                                                <option value="Tips Belajar & Produktivitas">Tips Belajar & Produktivitas</option>
                                            </select>
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="gambar" className="block mb-1 font-medium">
                                                Upload Gambar {!isEditMode && <span className="text-red-500">*</span>}
                                            </label>
                                            <div className="border-2 border-dashed border-gray-300 p-5 text-center rounded-lg bg-white">
                                                <input
                                                    type="file"
                                                    id="gambar"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded"
                                                    onChange={handleImageChange}
                                                    accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                                                    required={!isEditMode && (!previewImg && !formData.gambar)}
                                                />
                                                <small className="block text-gray-500 mt-1">Format yang didukung: JPG, PNG, GIF, WEBP. Maks: 5MB</small>
                                                <div className="mt-3 min-h-[100px] flex flex-col justify-center items-center bg-gray-100 rounded p-2.5">
                                                    {previewImg || formData.gambar ? (
                                                        <div className="relative w-full">
                                                            <img
                                                                src={previewImg || formData.gambar}
                                                                alt="Preview gambar"
                                                                className="max-w-full max-h-[200px] mx-auto object-contain"
                                                                onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/150x100?text=Error+Loading+Image" }}
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setPreviewImg(null);
                                                                    setFormData(prev => ({ ...prev, gambar: '' }));
                                                                    const fileInput = document.getElementById('gambar');
                                                                    if (fileInput) fileInput.value = ''; // Reset input file
                                                                }}
                                                                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                                                                title="Hapus gambar"
                                                                disabled={formSubmitting}
                                                            >
                                                                <Trash size={14} />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <p className="text-gray-500 m-0">Preview gambar akan muncul di sini</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2 mt-4">
                                        <button
                                            type="button"
                                            onClick={() => { setShowForm(false); resetForm(); }}
                                            className="px-4 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-100"
                                            disabled={formSubmitting}
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded transition-colors flex items-center justify-center gap-2"
                                            disabled={formSubmitting} // Menonaktifkan tombol saat submit
                                        >
                                            {formSubmitting && (
                                                <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                                            )}
                                            {isEditMode ? (formSubmitting ? 'Memperbarui...' : 'Update Artikel') : (formSubmitting ? 'Menambahkan...' : 'Tambah Artikel')}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[101]">
                        <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                            <h3 className="text-lg font-medium mb-4">Konfirmasi Hapus</h3>
                            <p className="text-gray-500 mb-4">
                                Apakah Anda yakin ingin menghapus artikel "<span className="font-semibold">{selectedArticle?.judul}</span>"?
                            </p>
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                    disabled={deleteLoading}
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center justify-center gap-2"
                                    disabled={deleteLoading}
                                >
                                    {deleteLoading && (
                                        <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                                    )}
                                    {deleteLoading ? 'Menghapus...' : 'Hapus'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            </main>
        </div>
    );
};

export default ArtikelManagement;