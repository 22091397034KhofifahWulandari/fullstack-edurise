import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit, Trash, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const BeasiswaManagement = () => {
    const [beasiswas, setBeasiswas] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedBeasiswa, setSelectedBeasiswa] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [previewImg, setPreviewImg] = useState(null);
    const formRef = useRef(null);
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        penyelenggara: '',
        description: '',
        detail: '',
        kategori: '',
        jenjang: '',
        lokasi: '',
        link: '',
        deadline: '',
        img: '',
    });

    useEffect(() => {
        getBeasiswas();
    }, []);

    const getBeasiswas = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/beasiswa');
            const formattedData = response.data.map(b => ({
                id: b.uuid,
                nama: b.title,
                penyelenggara: b.penyelenggara,
                deskripsi: b.description,
                detail: b.detail,
                kategori: b.kategori,
                jenjang: b.jenjang,
                lokasi: b.lokasi,
                link: b.link,
                deadline: b.deadline, // Pastikan ini adalah string tanggal yang valid dari backend
                gambar: b.img,
                createdAt: b.createdAt,
                updatedAt: b.updatedAt,
            }));
            setBeasiswas(formattedData);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setMsg(error.response?.data?.msg || "Terjadi kesalahan saat mengambil data beasiswa.");
            console.error("Error fetching beasiswas:", error);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        const newId = id === 'nama' ? 'title' : id === 'deskripsi' ? 'description' : id === 'gambar' ? 'img' : id;
        setFormData((prev) => ({ ...prev, [newId]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFormData((prev) => ({ ...prev, img: e.target.result }));
                setPreviewImg(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddBeasiswa = () => {
        setSelectedBeasiswa(null);
        setFormData({
            title: '',
            penyelenggara: '',
            description: '',
            detail: '',
            kategori: '',
            jenjang: '',
            lokasi: '',
            link: '',
            deadline: '',
            img: '',
        });
        setPreviewImg(null);
        setIsEditMode(false);
        setShowForm(true);
        setMsg("");
    };

    const handleEditBeasiswa = (beasiswa) => {
        setSelectedBeasiswa(beasiswa);
        setFormData({
            title: beasiswa.nama,
            penyelenggara: beasiswa.penyelenggara,
            description: beasiswa.deskripsi,
            detail: beasiswa.detail,
            kategori: beasiswa.kategori,
            jenjang: beasiswa.jenjang,
            lokasi: beasiswa.lokasi,
            link: beasiswa.link,
            deadline: beasiswa.deadline,
            img: beasiswa.gambar,
        });
        setPreviewImg(beasiswa.gambar);
        setIsEditMode(true);
        setShowForm(true);
        setMsg("");
    };

    const handleDeleteBeasiswa = (beasiswa) => {
        setSelectedBeasiswa(beasiswa);
        setShowDeleteModal(true);
        setMsg("");
    };

    const confirmDelete = async () => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:5000/beasiswa/${selectedBeasiswa.id}`);
            setMsg("Beasiswa berhasil dihapus!");
            setShowDeleteModal(false);
            setSelectedBeasiswa(null);
            getBeasiswas();
        } catch (error) {
            setMsg(error.response?.data?.msg || "Terjadi kesalahan saat menghapus beasiswa.");
            console.error("Error deleting beasiswa:", error);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg("");

        const payload = {
            img: formData.img,
            title: formData.title,
            description: formData.description,
            detail: formData.detail,
            kategori: formData.kategori,
            jenjang: formData.jenjang,
            lokasi: formData.lokasi,
            deadline: formData.deadline,
            penyelenggara: formData.penyelenggara,
            link: formData.link,
        };

        try {
            if (isEditMode) {
                await axios.patch(`http://localhost:5000/beasiswa/${selectedBeasiswa.id}`, payload);
                setMsg("Beasiswa berhasil diperbarui!");
            } else {
                await axios.post('http://localhost:5000/beasiswa', payload);
                setMsg("Beasiswa berhasil ditambahkan!");
            }
            setShowForm(false);
            setIsEditMode(false);
            setPreviewImg(null);
            getBeasiswas();
        } catch (error) {
            setMsg(error.response?.data?.msg || "Terjadi kesalahan. Pastikan semua kolom terisi dengan benar.");
            console.error("Error submitting form:", error);
            setLoading(false);
        }
    };

    // FUNGSI INI YANG AKAN KITA PERBAIKI
    const formatDateForInput = (dateString) => {
        if (!dateString || dateString === '0000-00-00') {
            return ''; // Return string kosong jika tanggal tidak valid atau '0000-00-00'
        }
        try {
            // Pastikan format dateString sudah ISO 8601 (YYYY-MM-DD)
            const date = new Date(dateString);
            return date.toISOString().split('T')[0];
        } catch (e) {
            console.error("Error formatting date:", e, "Original string:", dateString);
            return ''; // Tangani error parsing
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
                        <h2 className="text-xl font-semibold">Daftar Beasiswa</h2>
                        <button
                            onClick={handleAddBeasiswa}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                        >
                            <Plus size={20} />
                            Tambah Beasiswa
                        </button>
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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Penyelenggara</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {beasiswas.length === 0 && !loading ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-4 text-center text-gray-500">Tidak ada data beasiswa.</td>
                                    </tr>
                                ) : (
                                    beasiswas.map((b) => (
                                        <tr key={b.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{b.nama}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{b.penyelenggara}</td>
                                            {/* BARIS INI YANG MEMICU ERROR SEBELUMNYA */}
                                            <td className="px-6 py-4 whitespace-nowrap">{formatDateForInput(b.deadline)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleEditBeasiswa(b)}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        <Edit size={20} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteBeasiswa(b)}
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
                            <h4 className="m-0 font-medium text-lg">{isEditMode ? 'Edit Beasiswa' : 'Tambah Beasiswa'}</h4>
                            <button
                                onClick={() => {
                                    setShowForm(false);
                                    setIsEditMode(false);
                                    setPreviewImg(null);
                                    setFormData({
                                        title: '', penyelenggara: '', description: '', detail: '',
                                        kategori: '', jenjang: '', lokasi: '', link: '', deadline: '', img: '',
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
                                        <label htmlFor="nama" className="block mb-1 font-medium">Nama Beasiswa</label>
                                        <input
                                            type="text"
                                            id="nama"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                            placeholder="Masukkan nama beasiswa"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            required
                                        />
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
                                        <label htmlFor="deskripsi" className="block mb-1 font-medium">Deskripsi Singkat</label>
                                        <textarea
                                            id="deskripsi"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                            placeholder="Masukkan deskripsi singkat beasiswa"
                                            rows="2"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="detail" className="block mb-1 font-medium">Detail Lengkap</label>
                                        <textarea
                                            id="detail"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                            placeholder="Masukkan detail lengkap beasiswa (persyaratan, keuntungan, dll.)"
                                            rows="5"
                                            value={formData.detail}
                                            onChange={handleInputChange}
                                            required
                                        ></textarea>
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
                                            <option value="Beasiswa">Beasiswa</option>
                                            <option value="Pelatihan">Pelatihan</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="jenjang" className="block mb-1 font-medium">Jenjang</label>
                                        <select
                                            id="jenjang"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                            value={formData.jenjang}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="D3">D3</option>
                                            <option value="S1/D4">S1/D4</option>
                                            <option value="S2">S2</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="lokasi" className="block mb-1 font-medium">Lokasi</label>
                                        <select
                                            id="lokasi"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                            value={formData.lokasi}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Pilih Lokasi</option>
                                            <option value="DKI Jakarta">DKI Jakarta</option>
                                            <option value="Jawa Barat">Jawa Barat</option>
                                            <option value="Jawa Timur">Jawa Timur</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="link" className="block mb-1 font-medium">Link Pendaftaran</label>
                                        <input
                                            type="url"
                                            id="link"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                            placeholder="https://..."
                                            value={formData.link}
                                            onChange={handleInputChange}
                                            // required - Atribut 'required' dihapus karena 'link' bisa nullable di model Anda
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="deadline" className="block mb-1 font-medium">Deadline</label>
                                        <input
                                            type="date"
                                            id="deadline"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                            value={formatDateForInput(formData.deadline)}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="gambar" className="block mb-1 font-medium">Upload Gambar</label>
                                        <div className="border-2 border-dashed border-gray-300 p-5 text-center rounded-lg bg-white">
                                            <input
                                                type="file"
                                                id="gambar"
                                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                                onChange={handleImageChange}
                                                required={!isEditMode && !formData.img}
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
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-[#3375CC] hover:bg-[#295ea3] text-white font-medium rounded transition-colors"
                                            disabled={loading}
                                        >
                                            {loading ? 'Memproses...' : (isEditMode ? 'Update Beasiswa' : 'Tambah Beasiswa')}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                            <h3 className="text-lg font-medium mb-4">Konfirmasi Hapus</h3>
                            <p className="text-gray-500 mb-4">
                                Apakah Anda yakin ingin menghapus beasiswa "{selectedBeasiswa?.nama}"?
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
            </main>
        </div>
    );
};

export default BeasiswaManagement;