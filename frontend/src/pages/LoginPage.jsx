// components/LoginPage.jsx (atau di mana pun file login Anda berada)
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

const LoginPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setRegPassword] = useState(""); // Pastikan Anda punya state untuk password
    const [msg, setMsg] = useState("");

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const Auth = async (e) => {
        e.preventDefault();
        setMsg(""); // Reset pesan error/sukses sebelumnya

        try {
            // Mengirim permintaan POST ke endpoint login di backend
            // Penting: tambahkan { withCredentials: true } untuk mengirim dan menerima cookie sesi
            await axios.post("http://localhost:5000/login", { // SESUAIKAN URL BACKEND DAN PORT-NYA!
                email: email,
                password: password,
            }, { withCredentials: true }); // <<< PENTING UNTUK SESSION-BASED AUTH

            setMsg("Login berhasil! Mengalihkan..."); // Pesan sebelum redirect
            navigate("/landingpage");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            } else {
                console.error("Login error:", error);
                setMsg("Terjadi kesalahan koneksi. Silakan coba lagi.");
            }
        }
    };

    return (
        <>
            <header>
                <nav className="bg-white shadow-md h-[100px] fixed top-0 left-0 right-0 z-50">
                    <div className="container mx-auto px-4 h-full flex items-center justify-between">
                        <div className="flex items-center">
                            <Link className="flex items-center" to="/">
                                <div className="w-[84px] h-[84px] rounded-full overflow-hidden flex items-center justify-center bg-white shadow-sm">
                                    <img src="/img/eduriselanding/Ellipse 1.png" alt="EduRise Logo" className="w-[70px] h-[70px] object-contain" />
                                </div>
                            </Link>
                            <div className="hidden lg:flex ml-8">
                                <ul className="flex space-x-6">
                                    <li><Link className="font-bold" to="/">HOME</Link></li>
                                    <li><Link className="font-bold text-[#3375CC] !text-[#3375CC] !underline underline" to="/login">LOGIN PAGE</Link></li>
                                </ul>
                            </div>
                        </div>
                        <Link to="/loginadmin" className="w-10 h-10 rounded-full bg-[#3375CC] text-white flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        </Link>
                    </div>
                </nav>
            </header>

            <main>
                <section className="flex justify-center items-center min-h-[calc(100vh-76px)] px-5 mt-20 mb-20">
                    <div className="w-full max-w-[1130px] h-[720px] bg-white rounded-lg overflow-hidden shadow-md mx-auto">
                        <div className="flex flex-col md:flex-row h-full">
                            <div className="w-full md:w-1/2 flex items-start justify-center p-10 pt-20">
                                <div className="w-full max-w-[400px]">
                                    <div className="text-center mb-[85px]">
                                        <h2 className="text-2xl font-bold">
                                            <span>WELCOME BACK TO </span>
                                            <span className="text-[#3375cc] italic">EDU</span>
                                            <span className="text-[#dda853] italic">RISE</span>
                                        </h2>
                                        <p className="text-gray-500 mb-5">
                                            Lengkapi Data Login Anda Untuk Melanjutkan
                                        </p>
                                    </div>
                                    {msg && (
                                        <p className="text-center text-red-500 mb-4">{msg}</p>
                                    )}
                                    <form onSubmit={Auth}>
                                        <div className="mb-4">
                                            <label htmlFor="email" className="block font-bold mt-5 mb-2">Email</label>
                                            <div className="flex">
                                                <input
                                                    type="email"
                                                    className="w-full border border-gray-300 rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-[#3375cc] focus:border-transparent"
                                                    id="email"
                                                    placeholder="Masukkan email Anda"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                                <span className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-md p-2 flex items-center">
                                                    <img src="/img/eduriselanding/li_user.png" alt="User Icon" width="24" height="24" />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="block font-bold mb-2">Password</label>
                                            <div className="flex">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    className="w-full border border-gray-300 rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-[#3375cc] focus:border-transparent"
                                                    id="password"
                                                    placeholder="Masukkan password Anda"
                                                    value={password}
                                                    onChange={(e) => setRegPassword(e.target.value)} // Menggunakan setRegPassword
                                                    required
                                                />
                                                <button type="button" className="bg-gray-100 border border-gray-300 border-l-0 rounded-r-md px-3 flex items-center" onClick={togglePasswordVisibility}>
                                                    {showPassword ? (<EyeOff size={20} className="text-gray-600" />) : (<Eye size={20} className="text-gray-600" />)}
                                                </button>
                                            </div>
                                            <div className="flex justify-end mt-2">
                                                <Link to="/forgot-password" className="text-xs text-black hover:text-[#3375cc] hover:underline">Lupa Password?</Link>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <button type="submit" className="block w-full bg-[#3375cc] hover:bg-[#295ea3] text-white font-bold py-2 px-4 rounded text-center transition duration-200">Login</button>
                                        </div>
                                        <p className="text-center mt-4">
                                            Belum punya akun? {" "}
                                            <Link to="/registerpage" className="!text-[#DDA853] font-medium hover:underline">Daftar di sini!</Link>
                                        </p>
                                    </form>
                                </div>
                            </div>
                            <div className="hidden md:block md:w-1/2 h-full overflow-hidden">
                                <img src="/img/eduriselanding/Rectangle 2.png" alt="Login Illustration" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default LoginPage;