import React, { useState } from 'react';
import { User, LayoutDashboard, Edit, Trash, Eye, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const DataPendaftar = () => {
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [pendaftarToDelete, setPendaftarToDelete] = useState(null);

    // Sample data
    const [pendaftarList, setPendaftarList] = useState([
        {
            id: 1,
            namaLengkap: "John Doe",
            email: "john@example.com",
            noTelepon: "08123456789",
            institusi: "Universitas Indonesia",
            programStudi: "Teknik Informatika",
            ipk: "3.85",
            status: "Pending",
            // Data detail
            ttl: "Jakarta, 15 Januari 2000",
            jenisKelamin: "Laki-laki",
            alamat: "Jl. Example No. 123",
            fakultas: "Fakultas Teknik",
            semester: "6",
            // Data orang tua
            dataAyah: {
                nama: "James Doe",
                ttl: "London, 10 Juni 1970",
                alamat: "Jl. Example No. 123",
                noTelepon: "08111222333",
                pendidikan: "S1",
                pekerjaan: "Wiraswasta",
                penghasilan: "10.000.000",
            },
            dataIbu: {
                nama: "Jane Doe",
                ttl: "Paris, 15 Juli 1975",
                alamat: "Jl. Example No. 123",
                noTelepon: "08444555666",
                pendidikan: "S1",
                pekerjaan: "Guru",
                penghasilan: "8.000.000",
            },
            // Data tambahan
            bidangMinat: "Machine Learning, Web Development",
            rencanaJangkaPendek: "Melanjutkan studi S2",
            motivasi: "Ingin mengembangkan karir di bidang IT",
            cvUrl: "https://example.com/cv.pdf",
        },
        // ...tambahkan data dummy lainnya
    ]);

    const handleViewDetail = (user) => {
        setSelectedUser(user);
        setShowDetailModal(true);
    };

    const handleDeleteClick = (pendaftar) => {
        setPendaftarToDelete(pendaftar);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        try {
            // Simulasi API call
            // await fetch(`/api/pendaftar/${pendaftarToDelete.id}`, {
            //     method: 'DELETE'
            // });

            // Update local state
            const newList = pendaftarList.filter(p => p.id !== pendaftarToDelete.id);
            setPendaftarList(newList);
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    return (
        <div className="grid grid-cols-[250px_1fr] min-h-screen bg-[#f9fafb]">
            <header className="col-span-2 bg-white h-[60px] px-5 shadow-sm fixed top-0 left-0 right-0 z-50">
                <div className="w-full flex justify-between items-center h-full">
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-sm mr-3">
                            <img src="/img/eduriselanding/Ellipse 1.png" alt="EduRise Logo" className="w-[34px] h-[34px] object-contain" />
                        </div>
                        <h4 className="m-0 italic font-bold ml-2">EDURISE ADMIN</h4>
                    </div>
                    <Link to="/data-admin" className="w-10 h-10 rounded-full bg-[#3375CC] text-white flex items-center justify-center">
                        <User size={24} />
                    </Link>
                </div>
            </header>

            {/* Sidebar - fixed position */}
            <nav className="bg-[#1e3a8a] text-white p-6 fixed top-0 left-0 h-screen w-[250px] overflow-y-auto z-40">
                <div className="space-y-6 text-white">
                    {/* Main Menu Group */}
                    <div>
                        <h5 className="text-sm uppercase font-bold !text-white mb-3 px-2">Dashboard</h5>
                        <ul className="space-y-1.5">
                            <li>
                                {/* DIHUBUNGKAN KE dataAdminpage.jsx jika ditekan */}
                                <Link to="/adminhome" className="flex items-center !text-white py-2.5 px-3">
                                    <LayoutDashboard className="w-5 h-5 mr-3 text-white" />
                                    <span className="!text-white">Dashboard</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services Group */}
                    <div>
                        <h5 className="text-sm uppercase font-bold !text-white mb-3 px-2">Layanan</h5>
                        <ul className="space-y-1.5">
                            <li>
                                <a href="#" className="flex items-center !text-white py-2.5 px-3 rounded-lg hover:bg-[#2d4fc7] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                        <path d="M2 17l10 5 10-5" />
                                        <path d="M2 12l10 5 10-5" />
                                    </svg>
                                    <span className="!text-white">Scholarship Hub</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center !text-white py-2.5 px-3 rounded-lg hover:bg-[#2d4fc7] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                                    </svg>
                                    <span className="!text-white">Eduprep Tools</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center !text-white py-2.5 px-3 rounded-lg hover:bg-[#2d4fc7] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                                    </svg>
                                    <span className="!text-white">Edu Academy</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center !text-white py-2.5 px-3 rounded-lg hover:bg-[#2d4fc7] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                        <line x1="16" y1="2" x2="16" y2="6" />
                                        <line x1="8" y1="2" x2="8" y2="6" />
                                        <line x1="3" y1="10" x2="21" y2="10" />
                                    </svg>
                                    <span className="!text-white">Edu Event</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center !text-white py-2.5 px-3 rounded-lg hover:bg-[#2d4fc7] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                    <span className="!text-white">Edu Connect</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Settings Group */}
                    <div>
                        <h5 className="text-sm uppercase font-bold !text-white mb-3 px-2">Pengaturan</h5>
                        <ul className="space-y-1.5">
                            <li>
                                <a href="#" className="flex items-center !text-white py-2.5 px-3 rounded-lg bg-[#3375CC] hover:bg-[#2d4fc7] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                    <span className="!text-white">User Settings</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center !text-white py-2.5 px-3 rounded-lg hover:bg-[#2d4fc7] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="3" />
                                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                    </svg>
                                    <span className="!text-white">Settings</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Main content - takes remaining space */}
            <main className="col-start-2 mt-[60px] p-6 min-h-[calc(100vh-60px)]">
                <div className="bg-white rounded-lg shadow-md">
                    <div className="flex justify-between items-center p-4 border-b">
                        <h4 className="m-0 font-medium text-lg">Data Pendaftar Beasiswa</h4>
                    </div>

                    {/* Table content */}
                    <div className="p-4">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="border border-gray-300 p-3 text-left">Nama Lengkap</th>
                                        <th className="border border-gray-300 p-3 text-left">Email</th>
                                        <th className="border border-gray-300 p-3 text-left">No. Telepon</th>
                                        <th className="border border-gray-300 p-3 text-left">Institusi</th>
                                        <th className="border border-gray-300 p-3 text-left">Program Studi</th>
                                        <th className="border border-gray-300 p-3 text-left">IPK</th>
                                        <th className="border border-gray-300 p-3 text-left">Status</th>
                                        <th className="border border-gray-300 p-3 text-left">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendaftarList.map((pendaftar) => (
                                        <tr key={pendaftar.id} className="hover:bg-gray-50">
                                            <td className="border border-gray-300 p-3">{pendaftar.namaLengkap}</td>
                                            <td className="border border-gray-300 p-3">{pendaftar.email}</td>
                                            <td className="border border-gray-300 p-3">{pendaftar.noTelepon}</td>
                                            <td className="border border-gray-300 p-3">{pendaftar.institusi}</td>
                                            <td className="border border-gray-300 p-3">{pendaftar.programStudi}</td>
                                            <td className="border border-gray-300 p-3">{pendaftar.ipk}</td>
                                            <td className="border border-gray-300 p-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${pendaftar.status === 'Diterima' ? 'bg-green-100 text-green-800' :
                                                    pendaftar.status === 'Ditolak' ? 'bg-red-100 text-red-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {pendaftar.status}
                                                </span>
                                            </td>
                                            <td className="border border-gray-300 p-3">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleViewDetail(pendaftar)}
                                                        className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                                    >
                                                        <Eye size={16} />
                                                    </button>
                                                    <Link
                                                        to={`/edit-pendaftar/${pendaftar.id}`}
                                                        className="p-1 bg-[#3375CC] text-white rounded hover:bg-[#295ea3] inline-flex items-center"
                                                    >
                                                        <Edit size={16} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDeleteClick(pendaftar)}
                                                        className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                    >
                                                        <Trash size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>

            {/* Detail Modal */}
            {showDetailModal && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="text-lg font-semibold">Detail Pendaftar</h3>
                            <button
                                onClick={() => setShowDetailModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Data Pribadi */}
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-lg border-b pb-2">Data Pribadi</h4>
                                    <div className="space-y-2">
                                        <p><span className="font-medium">Nama Lengkap:</span> {selectedUser.namaLengkap}</p>
                                        <p><span className="font-medium">TTL:</span> {selectedUser.ttl}</p>
                                        <p><span className="font-medium">Jenis Kelamin:</span> {selectedUser.jenisKelamin}</p>
                                        <p><span className="font-medium">Alamat:</span> {selectedUser.alamat}</p>
                                        <p><span className="font-medium">Email:</span> {selectedUser.email}</p>
                                        <p><span className="font-medium">No. Telepon:</span> {selectedUser.noTelepon}</p>
                                    </div>
                                </div>

                                {/* Data Akademik */}
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-lg border-b pb-2">Data Akademik</h4>
                                    <div className="space-y-2">
                                        <p><span className="font-medium">Institusi:</span> {selectedUser.institusi}</p>
                                        <p><span className="font-medium">Fakultas:</span> {selectedUser.fakultas}</p>
                                        <p><span className="font-medium">Program Studi:</span> {selectedUser.programStudi}</p>
                                        <p><span className="font-medium">Semester:</span> {selectedUser.semester}</p>
                                        <p><span className="font-medium">IPK:</span> {selectedUser.ipk}</p>
                                    </div>
                                </div>

                                {/* Data Orang Tua */}
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-lg border-b pb-2">Data Ayah</h4>
                                    <div className="space-y-2">
                                        <p><span className="font-medium">Nama:</span> {selectedUser.dataAyah.nama}</p>
                                        <p><span className="font-medium">TTL:</span> {selectedUser.dataAyah.ttl}</p>
                                        <p><span className="font-medium">Pendidikan:</span> {selectedUser.dataAyah.pendidikan}</p>
                                        <p><span className="font-medium">Pekerjaan:</span> {selectedUser.dataAyah.pekerjaan}</p>
                                        <p><span className="font-medium">Penghasilan:</span> Rp {selectedUser.dataAyah.penghasilan}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-semibold text-lg border-b pb-2">Data Ibu</h4>
                                    <div className="space-y-2">
                                        <p><span className="font-medium">Nama:</span> {selectedUser.dataIbu.nama}</p>
                                        <p><span className="font-medium">TTL:</span> {selectedUser.dataIbu.ttl}</p>
                                        <p><span className="font-medium">Pendidikan:</span> {selectedUser.dataIbu.pendidikan}</p>
                                        <p><span className="font-medium">Pekerjaan:</span> {selectedUser.dataIbu.pekerjaan}</p>
                                        <p><span className="font-medium">Penghasilan:</span> Rp {selectedUser.dataIbu.penghasilan}</p>
                                    </div>
                                </div>

                                {/* Data Tambahan */}
                                <div className="col-span-2 space-y-4">
                                    <h4 className="font-semibold text-lg border-b pb-2">Data Tambahan</h4>
                                    <div className="space-y-2">
                                        <p><span className="font-medium">Bidang yang Diminati:</span> {selectedUser.bidangMinat}</p>
                                        <p><span className="font-medium">Rencana Jangka Pendek:</span> {selectedUser.rencanaJangkaPendek}</p>
                                        <p><span className="font-medium">Motivasi:</span> {selectedUser.motivasi}</p>
                                        <p><span className="font-medium">CV/Portfolio:</span> <a href={selectedUser.cvUrl} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Lihat CV</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 border-t flex justify-end">
                            <button
                                onClick={() => setShowDetailModal(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <h3 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h3>
                        <p className="mb-4">Apakah Anda yakin ingin menghapus data pendaftar ini?</p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataPendaftar;