import React, { useState } from "react"; // Import useState
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // Import Eye dan EyeOff icons
import axios from "axios"; // Import Axios for API calls

const RegisterPage = () => {
  const navigate = useNavigate(); // Inisialisasi useNavigate

  // State untuk mengelola input form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState(""); // Konfirmasi password
  const [msg, setMsg] = useState(""); // Pesan error atau sukses dari backend

  // State untuk mengelola visibilitas password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false); // Untuk konfirmasi password

  // Fungsi untuk toggle visibilitas password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Fungsi untuk toggle visibilitas konfirmasi password
  const toggleConfPasswordVisibility = () => {
    setShowConfPassword(!showConfPassword);
  };

  // Fungsi untuk menangani proses registrasi
  const handleRegister = async (e) => {
    e.preventDefault(); // Mencegah reload halaman

    // Validasi sederhana di frontend (password harus sama)
    if (password !== confPassword) {
      setMsg("Password dan Konfirmasi Password tidak cocok!");
      return; // Hentikan eksekusi jika password tidak cocok
    }

    try {
      // Mengirim data registrasi ke endpoint backend
      await axios.post("http://localhost:5000/register", { // Pastikan URL dan port backend Anda benar
        name: name,
        email: email,
        password: password,
        confPassword: confPassword, // Pastikan nama ini sesuai dengan di backend
      });
      // Jika registrasi berhasil, arahkan ke halaman login
      navigate("/login");
    } catch (error) {
      // Menangani error dari backend
      if (error.response) {
        setMsg(error.response.data.msg); // Ambil pesan error dari data respons backend
      } else {
        setMsg("Terjadi kesalahan koneksi. Silakan coba lagi."); // Pesan error umum
      }
    }
  };

  return (
    <>
      <header>
        <nav className="bg-white shadow-md h-[100px] fixed top-0 left-0 right-0 z-50">
          <div className="container mx-auto px-4 h-full flex items-center justify-between">
            {/* Left side - Logo and Navigation Links */}
            <div className="flex items-center">
              <Link className="flex items-center" to="/">
                <div className="w-[84px] h-[84px] rounded-full overflow-hidden flex items-center justify-center bg-white shadow-sm">
                  <img
                    src="/img/eduriselanding/Ellipse 1.png"
                    alt="EduRise Logo"
                    className="w-[70px] h-[70px] object-contain"
                  />
                </div>
              </Link>

              <div className="hidden lg:flex ml-8">
                <ul className="flex space-x-6">
                  {/* INI DIHUBUNGKAN KE landingBefore.jsx */}
                  <li>
                    <Link className="font-bold" to="/">
                      HOME
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="font-bold text-[#3375CC]" // Hapus underline untuk Login Page jika Register Page yang aktif
                      to="/login"
                    >
                      LOGIN PAGE
                    </Link>
                  </li>
                  {/* Tambahkan link untuk Register Page agar lebih jelas di navbar */}
                  <li>
                    <Link
                      className="font-bold text-[#3375CC] !text-[#3375CC] !underline underline"
                      to="/registerpage"
                    >
                      REGISTER PAGE
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <button
              className="lg:hidden p-2 rounded-md"
              type="button"
              aria-label="Toggle navigation"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Right side - Profile Button dengan background circle */}
            {/* INI DIHUBUNGKAN KE loginAdmin.jsx */}
            <Link
              to="/loginadmin"
              className="w-10 h-10 rounded-full bg-[#3375CC] text-white flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <section className="flex justify-center items-center min-h-[calc(100vh-76px)] px-5 mt-20 mb-20">
          <div className="w-full max-w-[1130px] h-[720px] bg-white rounded-lg overflow-hidden shadow-md mx-auto">
            <div className="flex flex-col md:flex-row h-full">
              {/* Register Form Section */}
              <div className="w-full md:w-1/2 flex items-start justify-center p-10 pt-16">
                <div className="w-full max-w-[400px]">
                  <div className="text-center mb-[60px]">
                    <h2 className="text-2xl font-bold mb-2">
                      <span>HELLO THERE, WELCOME </span>
                      <span className="text-[#3375CC] italic">EDU</span>
                      <span className="text-[#FFB800] italic">RISE</span>
                    </h2>
                    <p className="text-gray-500 mb-6">
                      Lengkapi Data Akun dan mendaftar Untuk Melanjutkan
                    </p>
                  </div>

                  {/* Bagian untuk menampilkan pesan error/sukses */}
                  {msg && (
                    <p className="text-center text-red-500 mb-4">{msg}</p>
                  )}

                  {/* FORM REGISTRASI */}
                  <form onSubmit={handleRegister} className="mt-0">
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block font-bold mt-3 mb-1"
                      >
                        Nama Lengkap
                      </label>
                      <div className="flex">
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                          id="name"
                          placeholder="Masukkan nama lengkap Anda"
                          value={name} // Hubungkan dengan state name
                          onChange={(e) => setName(e.target.value)} // Update state name
                          required // Tambahkan required
                        />
                        <span className="inline-flex items-center px-3 bg-gray-100 border border-l-0 border-gray-300 rounded-r">
                          <img
                            src="/img/eduriselanding/li_user.png"
                            alt="User Icon"
                            className="w-6 h-6"
                          />
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block font-bold mb-1"
                      >
                        Email
                      </label>
                      <div className="flex">
                        <input
                          type="email"
                          className="w-full px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                          id="email"
                          placeholder="Masukkan alamat email Anda" // Ubah placeholder
                          value={email} // Hubungkan dengan state email
                          onChange={(e) => setEmail(e.target.value)} // Update state email
                          required // Tambahkan required
                        />
                        <span className="inline-flex items-center px-3 bg-gray-100 border border-l-0 border-gray-300 rounded-r">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                          </svg>
                        </span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="password"
                        className="block font-bold mb-1"
                      >
                        Password
                      </label>
                      <div className="flex">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="w-full px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                          id="password"
                          placeholder="Buat password baru" // Ubah placeholder
                          value={password} // Hubungkan dengan state password
                          onChange={(e) => setPassword(e.target.value)} // Update state password
                          required // Tambahkan required
                        />
                        <button
                          type="button"
                          className="inline-flex items-center px-3 bg-gray-100 border border-l-0 border-gray-300 rounded-r"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <EyeOff size={20} className="text-gray-600" />
                          ) : (
                            <Eye size={20} className="text-gray-600" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="confPassword"
                        className="block font-bold mb-1"
                      >
                        Konfirmasi Password
                      </label>
                      <div className="flex">
                        <input
                          type={showConfPassword ? "text" : "password"}
                          className="w-full px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                          id="confPassword"
                          placeholder="Ketik ulang password Anda" // Tambahkan placeholder
                          value={confPassword} // Hubungkan dengan state confPassword
                          onChange={(e) => setConfPassword(e.target.value)} // Update state confPassword
                          required // Tambahkan required
                        />
                        <button
                          type="button"
                          className="inline-flex items-center px-3 bg-gray-100 border border-l-0 border-gray-300 rounded-r"
                          onClick={toggleConfPasswordVisibility}
                        >
                          {showConfPassword ? (
                            <EyeOff size={20} className="text-gray-600" />
                          ) : (
                            <Eye size={20} className="text-gray-600" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="mt-6">
                      <button
                        type="submit"
                        className="w-full bg-[#3375CC] hover:bg-[#295ea3] text-white font-bold py-2 px-4 rounded transition-colors"
                      >
                        Daftar
                      </button>
                    </div>

                    <p className="text-center mt-4">
                      Sudah punya akun?{" "}
                      <Link
                        to="/login"
                        className="!text-[#DDA853] font-medium hover:underline"
                      >
                        Login di sini!
                      </Link>
                    </p>
                  </form>
                </div>
              </div>

              {/* Image Section */}
              <div
                className="hidden md:block w-1/2 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('/img/eduriselanding/3d-render-books-fly-fall-blue-background.jpg')",
                }}
              ></div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default RegisterPage;