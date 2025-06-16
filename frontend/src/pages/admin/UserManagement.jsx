import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Plus, Edit, Trash, ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';
import axios from 'axios';

// Base URL untuk API Back-End Anda
const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:5000';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedUserUuid, setSelectedUserUuid] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const formRef = useRef(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confPassword: '',
        role: 'user',
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleAddUser = () => {
        setSelectedUserUuid(null);
        setFormData({
            name: '',
            email: '',
            password: '',
            confPassword: '',
            role: 'user',
        });
        setIsEditMode(false);
        setShowForm(true);
    };

    const handleEditUser = (user) => {
        setSelectedUserUuid(user.uuid);
        setFormData({
            name: user.name,
            email: user.email,
            password: '',
            confPassword: '',
            role: user.role,
        });
        setIsEditMode(true);
        setShowForm(true);
    };

    const handleDeleteUser = (user) => {
        setSelectedUserUuid(user.uuid);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!selectedUserUuid) return;

        try {
            await axios.delete(`${API_BASE_URL}/users/${selectedUserUuid}`);
            setShowDeleteModal(false);
            setSelectedUserUuid(null);
            fetchUsers();
            alert("Pengguna berhasil dihapus!");
        } catch (err) {
            console.error("Failed to delete user:", err);
            alert(`Gagal menghapus pengguna: ${err.response?.data?.msg || err.message}`);
        }
    };

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Format email tidak valid');
            return false;
        }

        if (!isEditMode || (isEditMode && formData.password)) {
            if (formData.password.length < 8) {
                alert('Password harus minimal 8 karakter');
                return false;
            }

            if (formData.password !== formData.confPassword) {
                alert('Password dan konfirmasi password tidak cocok');
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            if (isEditMode) {
                const updateData = {
                    name: formData.name,
                    email: formData.email,
                    role: formData.role,
                };
                if (formData.password) {
                    updateData.password = formData.password;
                    updateData.confPassword = formData.confPassword;
                }
                await axios.patch(`${API_BASE_URL}/users/${selectedUserUuid}`, updateData);
                alert("Pengguna berhasil diperbarui!");
            } else {
                await axios.post(`${API_BASE_URL}/users`, formData);
                alert("Pengguna berhasil ditambahkan!");
            }
            setShowForm(false);
            setIsEditMode(false);
            setFormData({
                name: '',
                email: '',
                password: '',
                confPassword: '',
                role: 'user',
            });
            fetchUsers();
        } catch (err) {
            console.error("Failed to save user:", err);
            // Tambahkan penanganan pesan error dari BE jika email sudah terdaftar
            if (err.response && err.response.data && err.response.data.msg) {
                alert(`Gagal menyimpan pengguna: ${err.response.data.msg}`);
            } else {
                alert(`Gagal menyimpan pengguna: ${err.message}`);
            }
        }
    };

    // Mengambil data pengguna dari API
    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_BASE_URL}/users`);
            setUsers(response.data);
        } catch (err) {
            console.error("Failed to fetch users:", err);
            setError("Gagal memuat data pengguna. Silakan coba lagi.");
            if (err.response && err.response.data && err.response.data.msg) {
                setError(err.response.data.msg);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);


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
                        <h2 className="text-xl font-semibold">Daftar Pengguna</h2>
                        <button
                            onClick={handleAddUser}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                        >
                            <Plus size={20} />
                            Tambah Pengguna
                        </button>
                    </div>
                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            <Loader2 className="animate-spin text-blue-500" size={32} />
                            <span className="ml-2 text-gray-600">Memuat data...</span>
                        </div>
                    ) : error ? (
                        <div className="text-red-600 text-center py-4">
                            <p>{error}</p>
                            <button onClick={fetchUsers} className="mt-2 text-blue-500 hover:underline">
                                Coba lagi
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Total User Count - Bagian baru yang ditambahkan */}
                            <div className="text-right mb-4">
                                <p className="text-md font-medium text-gray-700">Total Pengguna: <span className="font-semibold">{users.length}</span></p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UUID</th> */} {/* Dihapus */}
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tgl Dibuat</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {users.length > 0 ? (
                                            users.map((user) => (
                                                <tr key={user.uuid}>
                                                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.uuid}</td> */} {/* Dihapus */}
                                                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                                                            }`}>
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString('id-ID', { // Periksa keberadaan createdAt
                                                            year: 'numeric', month: 'long', day: 'numeric',
                                                            hour: '2-digit', minute: '2-digit'
                                                        }) : 'N/A'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex space-x-2">
                                                            <button
                                                                onClick={() => handleEditUser(user)}
                                                                className="text-blue-600 hover:text-blue-900"
                                                                title="Edit user"
                                                            >
                                                                <Edit size={20} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteUser(user)}
                                                                className="text-red-600 hover:text-red-900"
                                                                title="Delete user"
                                                            >
                                                                <Trash size={20} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500"> {/* colspan disesuaikan */}
                                                    Tidak ada pengguna yang tersedia.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>

                {/* Form Section */}
                {showForm && (
                    <div className="bg-white rounded-lg shadow-md mx-auto my-5">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h4 className="m-0 font-medium text-lg">{isEditMode ? 'Edit Pengguna' : 'Tambah Pengguna'}</h4>
                            <button
                                onClick={() => {
                                    setShowForm(false);
                                    setIsEditMode(false);
                                    setFormData({
                                        name: '',
                                        email: '',
                                        password: '',
                                        confPassword: '',
                                        role: 'user',
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
                                        <label htmlFor="name" className="block mb-1 font-medium">Nama Lengkap</label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                            placeholder="Masukkan nama lengkap"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                            placeholder="email@example.com"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-4 relative">
                                        <label htmlFor="password" className="block mb-1 font-medium">
                                            Password {isEditMode && "(Kosongkan jika tidak ingin mengubah)"}
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                id="password"
                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC] pr-10"
                                                placeholder="Masukkan password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                required={!isEditMode}
                                                minLength={8}
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                                onClick={togglePasswordVisibility}
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="confPassword" className="block mb-1 font-medium">
                                            Konfirmasi Password
                                        </label>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="confPassword"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                            placeholder="Konfirmasi password"
                                            value={formData.confPassword}
                                            onChange={handleInputChange}
                                            required={!isEditMode || (isEditMode && formData.password !== '')}
                                        />
                                    </div>

                                    <div className="mb-5">
                                        <label htmlFor="role" className="block mb-1 font-medium">Role</label>
                                        <select
                                            id="role"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                            value={formData.role}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-[#3375CC] hover:bg-[#295ea3] text-white font-medium rounded transition-colors"
                                        >
                                            {isEditMode ? 'Perbarui Pengguna' : 'Tambah Pengguna'}
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
                                Apakah Anda yakin ingin menghapus pengguna ini?
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

export default UserManagement;