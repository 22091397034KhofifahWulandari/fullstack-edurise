// KompetisiRegistrationsManagement.jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ChevronDown, FileText, CheckCircle, XCircle, Search, RefreshCcw, Trash } from 'lucide-react'; // Added Trash icon for clarity

const KompetisiRegistrationsManagement = () => {
    const [kompetisiList, setKompetisiList] = useState([]);
    const [selectedKompetisiUuid, setSelectedKompetisiUuid] = useState('');
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'diproses', 'seleksi berkas', 'diterima', 'ditolak'

    const statusOptions = ['diproses', 'seleksi berkas', 'diterima', 'ditolak'];

    // 1. Fetch available competitions for dropdown
    const fetchKompetisiList = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Assuming this endpoint returns a list of all competitions
            const response = await axios.get('http://localhost:5000/kompetisi');
            setKompetisiList(response.data);
            // Optionally, if there's a default competition you want to load registrations for
            // on initial render, you can set it here.
            // For example, select the first competition if the list is not empty
            if (response.data.length > 0 && !selectedKompetisiUuid) {
                setSelectedKompetisiUuid(response.data[0].uuid);
            }
        } catch (err) {
            console.error("Error fetching kompetisi list:", err);
            setError("Gagal memuat daftar kompetisi.");
        } finally {
            setLoading(false);
        }
    }, [selectedKompetisiUuid]); // Added selectedKompetisiUuid to dependency array to avoid setting it multiple times

    // 2. Fetch registrations for selected competition (or all if a general endpoint existed)
    const fetchRegistrations = useCallback(async (uuid) => {
        // If uuid is empty, it means no specific competition is selected.
        // To fetch *all* registrations across *all* competitions, you would need
        // a new backend endpoint (e.g., `http://localhost:5000/admin/kompetisi-registrasi/all`).
        // As per your current backend routes, fetching all without a specific competition UUID
        // is not directly supported by `getRegistrationsByKompetisiUuid`.
        // So, this function will only fetch for a specific UUID.
        if (!uuid) {
            setRegistrations([]);
            // You might want to set an error or a message here if no competition is selected.
            // setError("Pilih kompetisi untuk melihat daftar pendaftar.");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            // Corrected endpoint based on your backend route: /admin/kompetisi-registrasi/:kompetisiUuid
            const response = await axios.get(`http://localhost:5000/admin/kompetisi-registrasi/${uuid}`);
            setRegistrations(response.data);
        } catch (err) {
            console.error(`Error fetching registrations for ${uuid}:`, err);
            setError("Gagal memuat daftar pendaftar.");
        } finally {
            setLoading(false);
        }
    }, []);

    // Effect to fetch initial list of competitions
    useEffect(() => {
        fetchKompetisiList();
    }, [fetchKompetisiList]);

    // Effect to fetch registrations when a competition is selected or changes
    useEffect(() => {
        if (selectedKompetisiUuid) {
            fetchRegistrations(selectedKompetisiUuid);
        }
    }, [selectedKompetisiUuid, fetchRegistrations]);

    const handleKompetisiChange = (e) => {
        setSelectedKompetisiUuid(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterStatusChange = (e) => {
        setFilterStatus(e.target.value);
    };

    const handleUpdateStatus = async (registrationUuid, newStatus) => {
        setLoading(true);
        setError(null);
        try {
            // Corrected endpoint based on your backend route: /admin/kompetisi-registrasi/:uuid (PATCH)
            await axios.patch(`http://localhost:5000/admin/kompetisi-registrasi/${registrationUuid}`, { status_pendaftaran: newStatus });
            alert('Status pendaftaran berhasil diperbarui!');
            fetchRegistrations(selectedKompetisiUuid); // Refresh current list
        } catch (err) {
            console.error("Error updating status:", err);
            setError("Gagal memperbarui status pendaftaran.");
            alert('Gagal memperbarui status pendaftaran.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteRegistration = async (registrationUuid, registrantName) => {
        if (window.confirm(`Apakah Anda yakin ingin menghapus pendaftaran ${registrantName}?`)) {
            setLoading(true);
            setError(null);
            try {
                // Corrected endpoint based on your backend route: /admin/kompetisi-registrasi/:uuid (DELETE)
                await axios.delete(`http://localhost:5000/admin/kompetisi-registrasi/${registrationUuid}`);
                alert('Pendaftaran berhasil dihapus!');
                fetchRegistrations(selectedKompetisiUuid); // Refresh current list
            } catch (err) {
                console.error("Error deleting registration:", err);
                setError("Gagal menghapus pendaftaran.");
                alert('Gagal menghapus pendaftaran.');
            } finally {
                setLoading(false);
            }
        }
    };

    const filteredRegistrations = registrations.filter(reg => {
        const matchesSearch = searchTerm === '' ||
            reg.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reg.instansi_pendidikan.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || reg.status_pendaftaran === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case 'diproses': return 'bg-yellow-100 text-yellow-800';
            case 'seleksi berkas': return 'bg-blue-100 text-blue-800';
            case 'diterima': return 'bg-green-100 text-green-800';
            case 'ditolak': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
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
                    <h2 className="text-xl font-semibold mb-4">Manajemen Pendaftaran Kompetisi</h2>

                    <div className="mb-4">
                        <label htmlFor="select-kompetisi" className="block mb-1 font-medium">Pilih Kompetisi:</label>
                        <select
                            id="select-kompetisi"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                            value={selectedKompetisiUuid}
                            onChange={handleKompetisiChange}
                            disabled={loading}
                        >
                            <option value="">-- Pilih Kompetisi --</option>
                            {kompetisiList.map((kompetisi) => (
                                <option key={kompetisi.uuid} value={kompetisi.uuid}>
                                    {kompetisi.judul} ({kompetisi.tingkat_kompetisi})
                                </option>
                            ))}
                        </select>
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>

                    {/* Only display the table if a competition is selected or if you have a way to fetch all initially */}
                    {(selectedKompetisiUuid || (kompetisiList.length === 0 && !loading && !error)) && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-3">
                                Pendaftar Kompetisi: {selectedKompetisiUuid ? kompetisiList.find(k => k.uuid === selectedKompetisiUuid)?.judul : "Pilih kompetisi di atas"}
                            </h3>

                            <div className="flex flex-col md:flex-row gap-4 mb-4">
                                <div className="relative flex-grow">
                                    <input
                                        type="text"
                                        placeholder="Cari nama, email, atau instansi..."
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                </div>
                                <select
                                    className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                    value={filterStatus}
                                    onChange={handleFilterStatusChange}
                                >
                                    <option value="all">Semua Status</option>
                                    {statusOptions.map(status => (
                                        <option key={status} value={status}>
                                            {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    onClick={() => fetchRegistrations(selectedKompetisiUuid)} // Re-fetch for current selected
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-300 transition-colors"
                                    disabled={loading || !selectedKompetisiUuid} // Disable if no competition selected
                                >
                                    <RefreshCcw size={18} /> Refresh
                                </button>
                            </div>

                            {loading ? (
                                <p className="text-center text-gray-500 mt-4">Memuat data pendaftar...</p>
                            ) : error ? (
                                <p className="text-center text-red-500 mt-4">{error}</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Lengkap</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instansi</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detail & Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredRegistrations.length === 0 ? (
                                                <tr>
                                                    <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-center text-gray-500">Tidak ada pendaftar ditemukan.</td>
                                                </tr>
                                            ) : (
                                                filteredRegistrations.map((reg) => (
                                                    <tr key={reg.uuid}>
                                                        <td className="px-6 py-4 whitespace-nowrap">{reg.nama_lengkap}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{reg.email}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{reg.instansi_pendidikan}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(reg.status_pendaftaran)}`}>
                                                                {reg.status_pendaftaran}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center space-x-2">
                                                                {/* Dropdown for status update */}
                                                                <div className="relative inline-block text-left">
                                                                    <select
                                                                        className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                                        value={reg.status_pendaftaran}
                                                                        onChange={(e) => handleUpdateStatus(reg.uuid, e.target.value)}
                                                                        title="Ubah Status"
                                                                    >
                                                                        {statusOptions.map(status => (
                                                                            <option key={status} value={status}>
                                                                                {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                                        <ChevronDown size={16} />
                                                                    </div>
                                                                </div>

                                                                {/* View Details Button (e.g., in a modal) */}
                                                                <button
                                                                    onClick={() => alert(`Detail Pendaftar:\n\nNama: ${reg.nama_lengkap}\nEmail: ${reg.email}\nNo. Telp: ${reg.no_telp}\nJenjang Pendidikan: ${reg.jenjang_pendidikan}\nInstansi: ${reg.instansi_pendidikan}\nJurusan: ${reg.jurusan}\nAlasan Mengikuti: ${reg.alasan_mengikuti}\nTanggal Pendaftaran: ${new Date(reg.tanggal_pendaftaran).toLocaleDateString()}`)}
                                                                    className="text-gray-600 hover:text-gray-900"
                                                                    title="Lihat Detail Pendaftaran"
                                                                >
                                                                    <FileText size={20} />
                                                                </button>

                                                                {/* Delete Button */}
                                                                <button
                                                                    onClick={() => handleDeleteRegistration(reg.uuid, reg.nama_lengkap)}
                                                                    className="text-red-600 hover:text-red-900"
                                                                    title="Hapus Pendaftaran"
                                                                >
                                                                    <Trash size={20} /> {/* Menggunakan ikon Trash */}
                                                                </button>
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
                    )}
                </div>
            </main>
        </div>
    );
};

export default KompetisiRegistrationsManagement;