import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Plus, Edit, Trash, ArrowLeft, ExternalLink } from 'lucide-react';
import axios from 'axios'; // Import axios

const KompetisiManagement = () => {
    const [kompetisiList, setKompetisiList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedKompetisi, setSelectedKompetisi] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [previewImg, setPreviewImg] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state
    const formRef = useRef(null);

    const [formData, setFormData] = useState({
        judul: '',
        tanggal_mulai_pendaftaran: '',
        tanggal_akhir_pendaftaran: '',
        biaya_pendaftaran: '',
        tingkat_kompetisi: '',
        tentang_kompetisi: '',
        syarat_ketentuan: '', // Renamed from 'syarat'
        ketentuan_penilaian: '', // Renamed from 'ketentuan_kompetisi'
        manfaat_partisipasi: '', // Renamed from 'benefit'
        bantuan_didapat: '', // New field from BE
        url_pendaftaran: '', // Assuming this is derived from a BE field, or handled separately
        gambar: '' // Renamed from 'poster_gambar'
    });

    // Function to fetch data from BE
    const fetchKompetisis = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:5000/kompetisi'); // Adjust API endpoint as needed
            setKompetisiList(response.data);
        } catch (err) {
            console.error("Error fetching kompetisis:", err);
            setError("Gagal memuat data kompetisi. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchKompetisis();
    }, [fetchKompetisis]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFormData((prev) => ({ ...prev, gambar: e.target.result }));
                setPreviewImg(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddKompetisi = () => {
        setSelectedKompetisi(null);
        setFormData({
            judul: '',
            tanggal_mulai_pendaftaran: '',
            tanggal_akhir_pendaftaran: '',
            biaya_pendaftaran: '',
            tingkat_kompetisi: '',
            tentang_kompetisi: '',
            syarat_ketentuan: '',
            ketentuan_penilaian: '',
            manfaat_partisipasi: '',
            bantuan_didapat: '',
            url_pendaftaran: '', // Assuming this is still used for the external link
            gambar: ''
        });
        setPreviewImg(null);
        setIsEditMode(false);
        setShowForm(true);
    };

    const handleEditKompetisi = async (kompetisi) => {
        try {
            // Fetch full details of the competition using its UUID
            const response = await axios.get(`http://localhost:5000/kompetisi/${kompetisi.uuid}`);
            const fullKompetisiDetails = response.data;

            setSelectedKompetisi(fullKompetisiDetails);
            setFormData({
                judul: fullKompetisiDetails.judul,
                tanggal_mulai_pendaftaran: fullKompetisiDetails.tanggal_mulai_pendaftaran,
                tanggal_akhir_pendaftaran: fullKompetisiDetails.tanggal_akhir_pendaftaran,
                biaya_pendaftaran: fullKompetisiDetails.biaya_pendaftaran,
                tingkat_kompetisi: fullKompetisiDetails.tingkat_kompetisi,
                tentang_kompetisi: fullKompetisiDetails.tentang_kompetisi,
                syarat_ketentuan: fullKompetisiDetails.syarat_ketentuan,
                ketentuan_penilaian: fullKompetisiDetails.ketentuan_penilaian,
                manfaat_partisipasi: fullKompetisiDetails.manfaat_partisipasi,
                bantuan_didapat: fullKompetisiDetails.bantuan_didapat,
                url_pendaftaran: fullKompetisiDetails.url_pendaftaran || '', // Make sure this field exists in your BE or handle accordingly
                gambar: fullKompetisiDetails.gambar
            });
            setPreviewImg(fullKompetisiDetails.gambar);
            setIsEditMode(true);
            setShowForm(true);
        } catch (err) {
            console.error("Error fetching kompetisi for edit:", err);
            alert("Gagal memuat detail kompetisi untuk diedit.");
        }
    };

    const handleDeleteKompetisi = (kompetisi) => {
        setSelectedKompetisi(kompetisi);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (selectedKompetisi) {
            try {
                await axios.delete(`http://localhost:5000/kompetisi/${selectedKompetisi.uuid}`);
                alert("Kompetisi berhasil dihapus!");
                setShowDeleteModal(false);
                setSelectedKompetisi(null);
                fetchKompetisis(); // Refresh the list
            } catch (err) {
                console.error("Error deleting kompetisi:", err);
                alert("Gagal menghapus kompetisi. Silakan coba lagi.");
            }
        }
    };

    const validateForm = () => {
        // Basic validation for URL, adjust if 'url_pendaftaran' isn't in BE model explicitly
        if (formData.url_pendaftaran) {
            try {
                new URL(formData.url_pendaftaran);
            } catch (e) {
                alert('Format URL pendaftaran tidak valid');
                return false;
            }
        }

        if (!formData.judul || !formData.tanggal_mulai_pendaftaran || !formData.tanggal_akhir_pendaftaran || !formData.biaya_pendaftaran || !formData.tingkat_kompetisi) {
            alert('Harap lengkapi semua bidang yang wajib diisi (Judul, Tanggal Mulai Pendaftaran, Tanggal Akhir Pendaftaran, Biaya, Tingkat Kompetisi).');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const kompetisiData = {
            judul: formData.judul,
            gambar: formData.gambar,
            tanggal_mulai_pendaftaran: formData.tanggal_mulai_pendaftaran,
            tanggal_akhir_pendaftaran: formData.tanggal_akhir_pendaftaran,
            biaya_pendaftaran: formData.biaya_pendaftaran,
            tingkat_kompetisi: formData.tingkat_kompetisi,
            tentang_kompetisi: formData.tentang_kompetisi,
            syarat_ketentuan: formData.syarat_ketentuan,
            ketentuan_penilaian: formData.ketentuan_penilaian,
            manfaat_partisipasi: formData.manfaat_partisipasi,
            bantuan_didapat: formData.bantuan_didapat,
            // Assuming url_pendaftaran is a temporary FE field or mapped to something on BE
            // You might need to add a corresponding field in your BE model if 'url_pendaftaran' is to be stored.
            url_pendaftaran: formData.url_pendaftaran
        };

        try {
            if (isEditMode) {
                await axios.patch(`http://localhost:5000/kompetisi/${selectedKompetisi.uuid}`, kompetisiData);
                alert("Kompetisi berhasil diperbarui!");
            } else {
                await axios.post('http://localhost:5000/kompetisi', kompetisiData);
                alert("Kompetisi berhasil ditambahkan!");
            }
            setShowForm(false);
            setIsEditMode(false);
            setPreviewImg(null);
            setFormData({
                judul: '',
                tanggal_mulai_pendaftaran: '',
                tanggal_akhir_pendaftaran: '',
                biaya_pendaftaran: '',
                tingkat_kompetisi: '',
                tentang_kompetisi: '',
                syarat_ketentuan: '',
                ketentuan_penilaian: '',
                manfaat_partisipasi: '',
                bantuan_didapat: '',
                url_pendaftaran: '',
                gambar: ''
            });
            fetchKompetisis(); // Refresh the list
        } catch (err) {
            console.error("Error submitting kompetisi:", err);
            alert("Gagal menyimpan kompetisi. Silakan coba lagi.");
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
                        <h2 className="text-xl font-semibold">Daftar Kompetisi</h2>
                        <button
                            onClick={handleAddKompetisi}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                        >
                            <Plus size={20} />
                            Tambah Kompetisi
                        </button>
                    </div>
                    {loading ? (
                        <p className="text-center text-gray-500">Memuat data kompetisi...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Pendaftaran</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Biaya</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tingkat</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {kompetisiList.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-center text-gray-500">Tidak ada data kompetisi.</td>
                                        </tr>
                                    ) : (
                                        kompetisiList.map((kompetisi) => (
                                            <tr key={kompetisi.uuid}> {/* Use uuid for key */}
                                                <td className="px-6 py-4 whitespace-nowrap">{kompetisi.judul}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {kompetisi.tanggal_mulai_pendaftaran} - {kompetisi.tanggal_akhir_pendaftaran}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">{kompetisi.biaya_pendaftaran}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${kompetisi.tingkat_kompetisi === 'Nasional' ? 'bg-purple-100 text-purple-800' :
                                                            kompetisi.tingkat_kompetisi === 'Internasional' ? 'bg-blue-100 text-blue-800' :
                                                                'bg-green-100 text-green-800'
                                                        }`}>
                                                        {kompetisi.tingkat_kompetisi}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => handleEditKompetisi(kompetisi)}
                                                            className="text-blue-600 hover:text-blue-900"
                                                            title="Edit kompetisi"
                                                        >
                                                            <Edit size={20} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteKompetisi(kompetisi)}
                                                            className="text-red-600 hover:text-red-900"
                                                            title="Hapus kompetisi"
                                                        >
                                                            <Trash size={20} />
                                                        </button>
                                                        {/* Assuming url_pendaftaran is available from BE or is a client-side only field */}
                                                        {kompetisi.url_pendaftaran && (
                                                            <a
                                                                href={kompetisi.url_pendaftaran}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-green-600 hover:text-green-900"
                                                                title="Buka link pendaftaran"
                                                            >
                                                                <ExternalLink size={20} />
                                                            </a>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Form Section */}
                {showForm && (
                    <div className="bg-white rounded-lg shadow-md mx-auto my-5">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h4 className="m-0 font-medium text-lg">{isEditMode ? 'Edit Kompetisi' : 'Tambah Kompetisi'}</h4>
                            <button
                                onClick={() => {
                                    setShowForm(false);
                                    setIsEditMode(false);
                                    setPreviewImg(null);
                                    setFormData({
                                        judul: '',
                                        tanggal_mulai_pendaftaran: '',
                                        tanggal_akhir_pendaftaran: '',
                                        biaya_pendaftaran: '',
                                        tingkat_kompetisi: '',
                                        tentang_kompetisi: '',
                                        syarat_ketentuan: '',
                                        ketentuan_penilaian: '',
                                        manfaat_partisipasi: '',
                                        bantuan_didapat: '',
                                        url_pendaftaran: '',
                                        gambar: ''
                                    });
                                }}
                                className="px-4 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-100 inline-flex items-center"
                            >
                                <ArrowLeft size={16} className="mr-1" /> Kembali
                            </button>
                        </div>
                        <div className="p-5">
                            <form className="w-full" onSubmit={handleSubmit} ref={formRef}>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="mb-4">
                                        <label htmlFor="judul" className="block mb-1 font-medium">Judul Kompetisi</label>
                                        <input
                                            type="text"
                                            id="judul"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                            placeholder="Masukkan judul kompetisi"
                                            value={formData.judul}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="tanggal_mulai_pendaftaran" className="block mb-1 font-medium">Tanggal Mulai Pendaftaran</label>
                                            <input
                                                type="date" // Use type date for date inputs
                                                id="tanggal_mulai_pendaftaran"
                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                                value={formData.tanggal_mulai_pendaftaran}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="tanggal_akhir_pendaftaran" className="block mb-1 font-medium">Tanggal Akhir Pendaftaran</label>
                                            <input
                                                type="date" // Use type date for date inputs
                                                id="tanggal_akhir_pendaftaran"
                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                                value={formData.tanggal_akhir_pendaftaran}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="biaya_pendaftaran" className="block mb-1 font-medium">Biaya Pendaftaran</label>
                                        <input
                                            type="text"
                                            id="biaya_pendaftaran"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                            placeholder="Contoh: Rp 150.000 atau Gratis"
                                            value={formData.biaya_pendaftaran}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="tingkat_kompetisi" className="block mb-1 font-medium">Tingkat Kompetisi</label>
                                        <select
                                            id="tingkat_kompetisi"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                            value={formData.tingkat_kompetisi}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Pilih Tingkat Kompetisi</option>
                                            <option value="Lokal">Lokal</option>
                                            <option value="Regional">Regional</option>
                                            <option value="Nasional">Nasional</option>
                                            <option value="Internasional">Internasional</option>
                                        </select>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="tentang_kompetisi" className="block mb-1 font-medium">Tentang Kompetisi</label>
                                        <textarea
                                            id="tentang_kompetisi"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                            placeholder="Deskripsi tentang kompetisi ini"
                                            rows="3"
                                            value={formData.tentang_kompetisi}
                                            onChange={handleInputChange}
                                        ></textarea>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="syarat_ketentuan" className="block mb-1 font-medium">Syarat Kompetisi</label>
                                        <textarea
                                            id="syarat_ketentuan" // Renamed
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                            placeholder="Daftar syarat untuk mengikuti kompetisi (gunakan format bullet points)"
                                            rows="3"
                                            value={formData.syarat_ketentuan}
                                            onChange={handleInputChange}
                                        ></textarea>
                                        <p className="text-xs text-gray-500 mt-1">Tips: Gunakan format bullet point (-) untuk setiap poin</p>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="ketentuan_penilaian" className="block mb-1 font-medium">Ketentuan Penilaian</label>
                                        <textarea
                                            id="ketentuan_penilaian" // Renamed
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                            placeholder="Daftar ketentuan penilaian (gunakan format bullet points)"
                                            rows="3"
                                            value={formData.ketentuan_penilaian}
                                            onChange={handleInputChange}
                                        ></textarea>
                                        <p className="text-xs text-gray-500 mt-1">Tips: Gunakan format bullet point (-) untuk setiap poin</p>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="manfaat_partisipasi" className="block mb-1 font-medium">Manfaat Partisipasi</label>
                                        <textarea
                                            id="manfaat_partisipasi" // Renamed
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                            placeholder="Daftar benefit atau hadiah yang didapatkan (gunakan format bullet points)"
                                            rows="3"
                                            value={formData.manfaat_partisipasi}
                                            onChange={handleInputChange}
                                        ></textarea>
                                        <p className="text-xs text-gray-500 mt-1">Tips: Gunakan format bullet point (-) untuk setiap poin</p>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="bantuan_didapat" className="block mb-1 font-medium">Bantuan yang Didapat</label>
                                        <textarea
                                            id="bantuan_didapat" // New field
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                            placeholder="Daftar bantuan yang akan didapatkan peserta (gunakan format bullet points)"
                                            rows="3"
                                            value={formData.bantuan_didapat}
                                            onChange={handleInputChange}
                                        ></textarea>
                                        <p className="text-xs text-gray-500 mt-1">Tips: Gunakan format bullet point (-) untuk setiap poin</p>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="url_pendaftaran" className="block mb-1 font-medium">URL Pendaftaran</label>
                                        <input
                                            type="url"
                                            id="url_pendaftaran"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                            placeholder="https://..."
                                            value={formData.url_pendaftaran}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="mb-5">
                                        <label htmlFor="gambar" className="block mb-1 font-medium">Upload Poster</label>
                                        <div className="border-2 border-dashed border-gray-300 p-5 text-center rounded-lg bg-white">
                                            <input
                                                type="file"
                                                id="gambar" // Renamed
                                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                                onChange={handleImageChange}
                                                accept="image/*"
                                            />
                                            <div className="mt-3 min-h-[100px] flex flex-col justify-center items-center bg-gray-100 rounded p-2.5">
                                                {previewImg ? (
                                                    <img
                                                        src={previewImg}
                                                        alt="Preview poster"
                                                        className="max-w-full max-h-[200px]"
                                                    />
                                                ) : (
                                                    <p className="text-gray-500 m-0">Preview poster akan muncul di sini</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-[#3375CC] hover:bg-[#295ea3] text-white font-medium rounded transition-colors"
                                        >
                                            {isEditMode ? 'Perbarui Kompetisi' : 'Tambah Kompetisi'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                            <h3 className="text-lg font-medium mb-4">Konfirmasi Hapus</h3>
                            <p className="text-gray-500 mb-4">
                                Apakah Anda yakin ingin menghapus kompetisi "{selectedKompetisi?.judul}"?
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
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default KompetisiManagement;