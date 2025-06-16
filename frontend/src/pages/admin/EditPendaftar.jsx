import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { User, ArrowLeft, LayoutDashboard } from 'lucide-react';

const EditPendaftar = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        namaLengkap: "",
        email: "",
        noTelepon: "",
        ttl: "",
        jenisKelamin: "",
        alamat: "",
        institusi: "",
        fakultas: "",
        programStudi: "",
        semester: "",
        ipk: "",
        dataAyah: {
            nama: "",
            ttl: "",
            alamat: "",
            noTelepon: "",
            pendidikan: "",
            pekerjaan: "",
            penghasilan: "",
        },
        dataIbu: {
            nama: "",
            ttl: "",
            alamat: "",
            noTelepon: "",
            pendidikan: "",
            pekerjaan: "",
            penghasilan: "",
        },
        bidangMinat: "",
        rencanaJangkaPendek: "",
        motivasi: "",
        status: "",
    });

    useEffect(() => {
        // Simulasi fetch data dari API
        // Nanti diganti dengan actual API call
        const fetchData = async () => {
            try {
                // const response = await fetch(`/api/pendaftar/${id}`);
                // const data = await response.json();
                // setFormData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e, section = null) => {
        const { name, value } = e.target;

        if (section) {
            setFormData(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [name]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Simulasi API call
            // await fetch(`/api/pendaftar/${id}`, {
            //     method: 'PUT',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData)
            // });
            navigate('/data-pendaftar');
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    return (
        <div className="min-h-screen bg-[#f9fafb]">
            {/* Header */}
            <header className="bg-white h-[60px] px-5 shadow-sm fixed top-0 left-0 right-0 z-50">
                <div className="w-full flex justify-between items-center h-full">
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-sm mr-3">
                            <img src="/img/eduriselanding/Ellipse 1.png" alt="EduRise Logo" className="w-[34px] h-[34px] object-contain" />
                        </div>
                        <h4 className="m-0 italic font-bold ml-2">EDURISE ADMIN</h4>
                    </div>
                    <Link to="/adminhome" className="w-10 h-10 rounded-full bg-[#3375CC] text-white flex items-center justify-center">
                        <User size={24} />
                    </Link>
                </div>
            </header>

            {/* Sidebar */}
            <nav className="bg-[#1e3a8a] text-white p-6 fixed top-0 left-0 h-screen w-[250px] overflow-y-auto z-40 pt-[80px]">
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

            {/* Main content */}
            <main className="ml-[250px] pt-[80px] px-6 pb-[30px] min-h-screen bg-[#f9fafb] w-[calc(100%-250px)]">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
                    <div className="flex justify-between items-center p-4 border-b">
                        <h4 className="text-lg font-medium">Edit Data Pendaftar</h4>
                        <Link to="/data-pendaftar" className="flex items-center text-gray-600 hover:text-gray-800">
                            <ArrowLeft className="w-4 h-4 mr-1" /> Kembali
                        </Link>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6">
                        {/* Data Pribadi */}
                        <div className="mb-6">
                            <h5 className="text-lg font-medium mb-4 pb-2 border-b">Data Pribadi</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-1">Nama Lengkap</label>
                                    <input
                                        type="text"
                                        name="namaLengkap"
                                        value={formData.namaLengkap}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1">TTL</label>
                                    <input
                                        type="text"
                                        name="ttl"
                                        value={formData.ttl}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1">Jenis Kelamin</label>
                                    <select
                                        name="jenisKelamin"
                                        value={formData.jenisKelamin}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                        required
                                    >
                                        <option value="">Pilih Jenis Kelamin</option>
                                        <option value="Laki-laki">Laki-laki</option>
                                        <option value="Perempuan">Perempuan</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1">No. Telepon</label>
                                    <input
                                        type="tel"
                                        name="noTelepon"
                                        value={formData.noTelepon}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block mb-1">Alamat</label>
                                    <textarea
                                        name="alamat"
                                        value={formData.alamat}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                        required
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Data Akademik */}
                        <div className="mb-6">
                            <h5 className="text-lg font-medium mb-4 pb-2 border-b">Data Akademik</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-1">Institusi</label>
                                    <input
                                        type="text"
                                        name="institusi"
                                        value={formData.institusi}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1">Fakultas</label>
                                    <input
                                        type="text"
                                        name="fakultas"
                                        value={formData.fakultas}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1">Program Studi</label>
                                    <input
                                        type="text"
                                        name="programStudi"
                                        value={formData.programStudi}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1">Semester</label>
                                    <input
                                        type="number"
                                        name="semester"
                                        value={formData.semester}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1">IPK</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        name="ipk"
                                        value={formData.ipk}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Data Orang Tua */}
                        <div className="mb-6">
                            <h5 className="text-lg font-medium mb-4 pb-2 border-b">Data Orang Tua</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Data Ayah */}
                                <div>
                                    <h6 className="font-medium mb-3">Data Ayah</h6>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block mb-1">Nama Ayah</label>
                                            <input
                                                type="text"
                                                name="nama"
                                                value={formData.dataAyah.nama}
                                                onChange={(e) => handleChange(e, 'dataAyah')}
                                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-1">TTL</label>
                                            <input
                                                type="text"
                                                name="ttl"
                                                value={formData.dataAyah.ttl}
                                                onChange={(e) => handleChange(e, 'dataAyah')}
                                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-1">Alamat</label>
                                            <input
                                                type="text"
                                                name="alamat"
                                                value={formData.dataAyah.alamat}
                                                onChange={(e) => handleChange(e, 'dataAyah')}
                                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-1">No. Telepon</label>
                                            <input
                                                type="tel"
                                                name="noTelepon"
                                                value={formData.dataAyah.noTelepon}
                                                onChange={(e) => handleChange(e, 'dataAyah')}
                                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-1">Pendidikan</label>
                                            <input
                                                type="text"
                                                name="pendidikan"
                                                value={formData.dataAyah.pendidikan}
                                                onChange={(e) => handleChange(e, 'dataAyah')}
                                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-1">Pekerjaan</label>
                                            <input
                                                type="text"
                                                name="pekerjaan"
                                                value={formData.dataAyah.pekerjaan}
                                                onChange={(e) => handleChange(e, 'dataAyah')}
                                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-1">Penghasilan</label>
                                            <input
                                                type="text"
                                                name="penghasilan"
                                                value={formData.dataAyah.penghasilan}
                                                onChange={(e) => handleChange(e, 'dataAyah')}
                                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Data Ibu */}
                                <div>
                                    <h6 className="font-medium mb-3">Data Ibu</h6>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block mb-1">Nama Ibu</label>
                                            <input
                                                type="text"
                                                name="nama"
                                                value={formData.dataIbu.nama}
                                                onChange={(e) => handleChange(e, 'dataIbu')}
                                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-1">TTL</label>
                                            <input
                                                type="text"
                                                name="ttl"
                                                value={formData.dataIbu.ttl}
                                                onChange={(e) => handleChange(e, 'dataIbu')}
                                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-1">Alamat</label>
                                            <input
                                                type="text"
                                                name="alamat"
                                                value={formData.dataIbu.alamat}
                                                onChange={(e) => handleChange(e, 'dataIbu')}
                                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-1">No. Telepon</label>
                                            <input
                                                type="tel"
                                                name="noTelepon"
                                                value={formData.dataIbu.noTelepon}
                                                onChange={(e) => handleChange(e, 'dataIbu')}
                                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-1">Pendidikan</label>
                                            <input
                                                type="text"
                                                name="pendidikan"
                                                value={formData.dataIbu.pendidikan}
                                                onChange={(e) => handleChange(e, 'dataIbu')}
                                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-1">Pekerjaan</label>
                                            <input
                                                type="text"
                                                name="pekerjaan"
                                                value={formData.dataIbu.pekerjaan}
                                                onChange={(e) => handleChange(e, 'dataIbu')}
                                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-1">Penghasilan</label>
                                            <input
                                                type="text"
                                                name="penghasilan"
                                                value={formData.dataIbu.penghasilan}
                                                onChange={(e) => handleChange(e, 'dataIbu')}
                                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Data Tambahan */}
                        <div className="mb-6">
                            <h5 className="text-lg font-medium mb-4 pb-2 border-b">Data Tambahan</h5>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block mb-1">Bidang yang Diminati</label>
                                    <input
                                        type="text"
                                        name="bidangMinat"
                                        value={formData.bidangMinat}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1">Rencana Jangka Pendek</label>
                                    <textarea
                                        name="rencanaJangkaPendek"
                                        value={formData.rencanaJangkaPendek}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                        required
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block mb-1">Motivasi</label>
                                    <textarea
                                        name="motivasi"
                                        value={formData.motivasi}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                        required
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block mb-1">Status</label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                        required
                                    >
                                        <option value="">Pilih Status</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Diterima">Diterima</option>
                                        <option value="Ditolak">Ditolak</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3">
                            <Link
                                to="/data-pendaftar"
                                className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-[#3375CC] text-white rounded hover:bg-[#295ea3]"
                            >
                                Simpan Perubahan
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default EditPendaftar;
