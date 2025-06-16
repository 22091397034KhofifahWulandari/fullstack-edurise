import React, { useState, useEffect } from 'react';
import { Edit, Trash, Plus, User, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls

const DiskusiManagement = () => {
    const [diskusi, setDiskusi] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedDiskusi, setSelectedDiskusi] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [diskusiToDelete, setDiskusiToDelete] = useState(null);
    const [imageFile, setImageFile] = useState(null); // State untuk file gambar yang dipilih
    const [loading, setLoading] = useState(false); // State untuk indikator loading
    const [error, setError] = useState(null); // State untuk error

    const [formData, setFormData] = useState({
        judul: '',
        deskripsi: '', // Sesuaikan dengan nama field BE: 'deskripsi'
        keahlian: '', // Sesuaikan dengan nama field BE: 'keahlian'
        link: '', // Sesuaikan dengan nama field BE: 'link'
        // 'status' dan 'authorName' tidak ada di model BE diskusi,
        // 'status' bisa dipakai untuk logika UI FE, 'authorName' akan diambil dari 'creator.name' dari BE
        status: 'Active',
        authorName: '', // Ini akan diisi dari data BE untuk tampilan, bukan dikirim ke BE saat create/update diskusi
        diskusiPicture: null, // Untuk menampilkan URL gambar yang sudah ada dari BE
    });

    useEffect(() => {
        fetchDiskusi();
    }, []);

    const fetchDiskusi = async () => {
        setLoading(true);
        setError(null);
        try {
            // URL backend Anda harus http://localhost:5000 jika backend berjalan di port itu
            const response = await axios.get('http://localhost:5000/diskusi'); //
            const mappedDiskusi = response.data.map(item => ({
                id: item.uuid, // Backend menggunakan uuid sebagai ID
                judul: item.judul,
                authorId: item.creator?.uuid, // Gunakan optional chaining karena 'creator' mungkin belum ada
                authorName: item.creator?.name, // Gunakan optional chaining
                authorExpertise: item.keahlian, // Mapping ke 'keahlian' dari BE
                kategori: item.keahlian, // Menggunakan keahlian sebagai kategori untuk tampilan
                status: 'Active', // Asumsi semua aktif jika BE tidak menyediakan status
                participantCount: 0, // BE tidak melacak ini, set ke 0
                description: item.deskripsi, // Mapping ke 'deskripsi' dari BE
                platformLink: item.link, // Mapping ke 'link' dari BE
                diskusiPicture: item.diskusiPicture ? `http://localhost:5000${item.diskusiPicture}` : null, // URL Lengkap untuk gambar
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
            }));
            setDiskusi(mappedDiskusi);
        } catch (err) {
            console.error("Error fetching diskusi:", err);
            setError("Gagal memuat daftar diskusi.");
        } finally {
            setLoading(false);
        }
    };

    // Handle input changes untuk form teks
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle perubahan file gambar
    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]); // Ambil file pertama yang dipilih
    };

    // Validasi link platform (tetap sama)
    const validatePlatformLink = (link) => {
        if (!link) return true;
        try {
            const url = new URL(link);
            if (url.hostname === 'discord.gg' || url.hostname === 'discord.com') {
                return url.pathname.length > 1;
            }
            // Izinkan URL lain asalkan valid
            return true;
        } catch {
            return false;
        }
    };

    // Handle form submission (Add/Edit)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Validasi link platform
        if (!validatePlatformLink(formData.link)) { // Menggunakan formData.link
            alert('Link platform tidak valid. Pastikan format URL sudah benar.');
            return;
        }

        const data = new FormData(); // Gunakan FormData untuk mengirim file dan data teks
        data.append('judul', formData.judul);
        data.append('deskripsi', formData.deskripsi); // Nama field harus sesuai BE
        data.append('keahlian', formData.keahlian); // Nama field harus sesuai BE
        data.append('link', formData.link); // Nama field harus sesuai BE

        if (imageFile) {
            data.append('diskusiPicture', imageFile); // 'diskusiPicture' harus sesuai dengan nama field di multer middleware Anda
        } else if (selectedDiskusi && !formData.diskusiPicture && !imageFile) {
            // Jika ada diskusi yang dipilih (mode edit), tidak ada gambar baru, dan tidak ada gambar sebelumnya,
            // beri tahu backend untuk menghapus gambar lama jika ada.
            // Backend Anda sudah memiliki logic untuk `removePicture === 'true'`,
            // tapi kita tidak akan mengirim `removePicture` dari FE karena sekarang langsung patch/ganti
            // Jika tidak ada file baru dan diskusiPicture di formData adalah null (misal jika sebelumnya ada gambar tapi kita ingin menghapus),
            // maka backend harus memahami ini sebagai permintaan untuk menghapus gambar.
            // Solusi paling sederhana adalah jika tidak ada file baru, dan formData.diskusiPicture null,
            // biarkan backend tahu itu. Backend sudah menginterpretasikan jika req.file tidak ada, itu berarti tidak ada update gambar.
            // Untuk kasus menghapus gambar tanpa upload baru, backend Anda memiliki `req.body.removePicture === 'true'`.
            // Jika Anda ingin mengimplementasikan tombol "Hapus Gambar" di FE, Anda harus mengirim `data.append('removePicture', 'true');`
            // Namun, permintaan Anda adalah "pada gambar tidak usah ada remove tapi langsung bisa patch untuk mengedit".
            // Ini berarti jika user tidak memilih gambar baru, gambar lama akan tetap ada.
            // Jika user memilih gambar baru, gambar lama akan diganti.
            // Backend sudah menangani ini dengan baik.
        }

        try {
            if (selectedDiskusi) {
                // Update diskusi yang sudah ada
                await axios.patch(`http://localhost:5000/diskusi/${selectedDiskusi.id}`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Penting untuk FormData
                    },
                });
                alert('Forum diskusi berhasil diperbarui!');
            } else {
                // Tambah diskusi baru
                await axios.post('http://localhost:5000/diskusi', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Penting untuk FormData
                    },
                });
                alert('Forum diskusi berhasil ditambahkan!');
            }
            fetchDiskusi(); // Refresh data setelah berhasil
            resetForm(); // Reset form dan state
            setShowForm(false);
        } catch (err) {
            console.error("Error submitting form:", err.response ? err.response.data : err.message);
            setError(`Gagal menyimpan forum diskusi: ${err.response?.data?.msg || err.message}`);
            alert(`Gagal menyimpan forum diskusi: ${err.response?.data?.msg || err.message}`); // Tampilkan pesan error ke user
        }
    };

    const resetForm = () => {
        setFormData({
            judul: '',
            deskripsi: '',
            keahlian: '',
            link: '',
            status: 'Active',
            authorName: '',
            diskusiPicture: null,
        });
        setSelectedDiskusi(null);
        setImageFile(null); // Penting: reset file gambar yang dipilih
    };

    // Handle edit diskusi
    const handleEditDiskusi = (diskusiItem) => {
        setSelectedDiskusi(diskusiItem);
        setFormData({
            judul: diskusiItem.judul,
            deskripsi: diskusiItem.description, // Mapping dari FE description ke BE deskripsi
            keahlian: diskusiItem.authorExpertise, // Mapping dari FE authorExpertise ke BE keahlian
            link: diskusiItem.platformLink, // Mapping dari FE platformLink ke BE link
            status: diskusiItem.status,
            authorName: diskusiItem.authorName,
            diskusiPicture: diskusiItem.diskusiPicture, // Set URL gambar yang sudah ada untuk ditampilkan
        });
        setImageFile(null); // Penting: Hapus file yang sudah dipilih saat edit dimulai, agar user bisa memilih ulang
        setShowForm(true);
    };

    // Handle delete diskusi
    const handleDeleteDiskusi = (diskusiItem) => {
        setDiskusiToDelete(diskusiItem);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        setError(null);
        try {
            await axios.delete(`http://localhost:5000/diskusi/${diskusiToDelete.id}`); // Menggunakan ID (UUID)
            alert('Forum diskusi berhasil dihapus!');
            fetchDiskusi(); // Refresh data
            setShowDeleteModal(false);
            setDiskusiToDelete(null);
        } catch (err) {
            console.error("Error deleting diskusi:", err.response ? err.response.data : err.message);
            setError(`Gagal menghapus forum diskusi: ${err.response?.data?.msg || err.message}`);
            alert(`Gagal menghapus forum diskusi: ${err.response?.data?.msg || err.message}`);
        }
    };

    // Get statistics (tetap sama)
    const getStats = () => {
        return {
            totalDiskusi: diskusi.length,
            activeDiskusi: diskusi.filter(d => d.status === 'Active').length,
            totalParticipants: diskusi.reduce((acc, curr) => acc + curr.participantCount, 0)
        };
    };

    const stats = getStats();

    return (
        <div className="min-h-screen">
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
            <main className="mt-[100px] p-5 bg-[#f9fafb] min-h-[calc(100vh-60px)]">
                <div className="max-w-[1400px] mx-auto">
                    <header className="mb-8">
                        <h1 className="text-2xl font-bold mb-2">Manajemen Forum Diskusi</h1>
                        <p className="text-gray-600">Kelola forum diskusi dan partisipan</p>
                    </header>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-gray-600 mb-2 text-sm">Total Forum</h3>
                            <p className="text-2xl font-bold">{stats.totalDiskusi}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-gray-600 mb-2 text-sm">Forum Aktif</h3>
                            <p className="text-2xl font-bold">{stats.activeDiskusi}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-gray-600 mb-2 text-sm">Total Partisipan</h3>
                            <p className="text-2xl font-bold">{stats.totalParticipants}</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mb-6">
                        <button
                            onClick={() => {
                                setShowForm(true);
                                resetForm(); // Pastikan form di-reset saat menambah baru
                            }}
                            className="bg-[#3375CC] text-white px-4 py-2 rounded-lg hover:bg-[#1a5cb3] flex items-center gap-2"
                        >
                            <Plus size={20} />
                            Tambah Forum Diskusi
                        </button>
                    </div>

                    {/* Loading/Error Indicators */}
                    {loading && <p className="text-center text-gray-600">Memuat data...</p>}
                    {error && <p className="text-center text-red-600">Error: {error}</p>}

                    {/* Diskusi Table */}
                    {!loading && !error && diskusi.length > 0 ? (
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Forum Diskusi</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gambar</th> {/* Tambahkan kolom gambar */}
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pembuat</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partisipan</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform Link</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {diskusi.map(item => (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">{item.judul}</div>
                                                <div className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.diskusiPicture ? (
                                                    <img src={item.diskusiPicture} alt={item.judul} className="w-16 h-16 object-cover rounded-md" />
                                                ) : (
                                                    <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-md text-gray-500 text-xs">No Image</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">{item.authorName}</div>
                                                <div className="text-sm text-gray-500">{item.authorExpertise}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                    {item.kategori}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === 'Active'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {item.participantCount}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {item.platformLink ? (
                                                    <a
                                                        href={item.platformLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        Link Forum
                                                    </a>
                                                ) : (
                                                    '-'
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium">
                                                <button
                                                    onClick={() => handleEditDiskusi(item)}
                                                    className="text-blue-600 hover:text-blue-900 mr-3"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteDiskusi(item)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    <Trash size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        !loading && !error && <p className="text-center text-gray-600">Tidak ada diskusi yang tersedia.</p>
                    )}


                    {/* Add/Edit Form Modal */}
                    {showForm && (
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-8 w-full max-w-md">
                                <h2 className="text-xl font-semibold mb-4">
                                    {selectedDiskusi ? 'Edit Forum Diskusi' : 'Tambah Forum Diskusi'}
                                </h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Judul Forum</label>
                                        <input
                                            type="text"
                                            name="judul"
                                            value={formData.judul}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                                        <textarea
                                            name="deskripsi" // Sesuaikan dengan BE
                                            value={formData.deskripsi} // Sesuaikan dengan BE
                                            onChange={handleChange}
                                            rows={3}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Keahlian Pembuat (Kategori)</label>
                                        <select
                                            name="keahlian" // Sesuaikan dengan BE
                                            value={formData.keahlian} // Sesuaikan dengan BE
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            required
                                        >
                                            <option value="">Pilih Keahlian</option>
                                            <option value="Computer">Computer</option>
                                            <option value="Desain UI/UX">Desain UI/UX</option>
                                            <option value="Digital Marketing">Digital Marketing</option>
                                            <option value="Sains">Sains</option>
                                            <option value="Bisnis">Bisnis</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Link Platform Diskusi</label>
                                        <input
                                            type="url"
                                            name="link" // Sesuaikan dengan BE
                                            value={formData.link} // Sesuaikan dengan BE
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            placeholder="https://discord.gg/your-invite-code"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Gambar Diskusi</label>
                                        {formData.diskusiPicture && !imageFile && ( // Tampilkan gambar yang sudah ada jika tidak ada file baru yang dipilih
                                            <div className="mb-2">
                                                <img src={formData.diskusiPicture} alt="Current Diskusi" className="w-32 h-32 object-cover rounded-md" />
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            name="diskusiPicture" // Nama ini harus sesuai dengan field di middleware multer
                                            onChange={handleImageChange}
                                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                        <p className="mt-1 text-sm text-gray-500">
                                            {selectedDiskusi ? "Biarkan kosong untuk mempertahankan gambar lama, atau pilih file baru untuk mengganti." : "Pilih gambar untuk forum diskusi."}
                                        </p>
                                    </div>

                                    <div className="flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowForm(false);
                                                resetForm(); // Reset form saat batal
                                            }}
                                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-[#3375CC] text-white px-4 py-2 rounded-lg hover:bg-[#1a5cb3]"
                                        >
                                            {selectedDiskusi ? 'Update' : 'Simpan'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Delete Confirmation Modal */}
                    {showDeleteModal && (
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-8 w-full max-w-md">
                                <h2 className="text-xl font-semibold mb-4">Konfirmasi Hapus</h2>
                                <p className="text-gray-600 mb-6">
                                    Apakah Anda yakin ingin menghapus forum diskusi "{diskusiToDelete.judul}"?
                                </p>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        onClick={() => setShowDeleteModal(false)}
                                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={confirmDelete}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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

export default DiskusiManagement;