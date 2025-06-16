import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios"; // Import axios untuk request HTTP

const ResetPage = () => {
  const navigate = useNavigate();
  const { token } = useParams(); // Ambil token dari URL jika ada

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState(""); // Untuk menampilkan pesan sukses/error
  const [isResetFlow, setIsResetFlow] = useState(false); // State untuk menentukan alur (forgot/reset)

  // Efek samping untuk menentukan apakah ini alur reset password (jika ada token di URL)
  useEffect(() => {
    if (token) {
      setIsResetFlow(true);
    } else {
      setIsResetFlow(false);
    }
  }, [token]);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/forgot-password", { // Sesuaikan URL backend Anda
        email: email,
      });
      setMsg(response.data.msg);
      // Opsional: Setelah berhasil mengirim email, bisa arahkan ke halaman lain atau tampilkan pesan khusus
      // navigate('/check-email');
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      } else {
        setMsg("Terjadi kesalahan. Silakan coba lagi.");
      }
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/reset-password/${token}`, { // Sesuaikan URL backend Anda
        password: password,
        confPassword: confPassword,
      });
      setMsg(response.data.msg);
      // Jika berhasil, arahkan ke halaman login
      setTimeout(() => {
        navigate("/login"); // Ganti dengan path ke halaman login Anda
      }, 3000); // Tunggu 3 detik sebelum redirect
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      } else {
        setMsg("Terjadi kesalahan. Silakan coba lagi.");
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
                      className="font-bold text-[#3375CC] underline !text-[#3375CC] !underline"
                      to="/login"
                    >
                      LOGIN PAGE
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
              {/* Form Section */}
              <div className="w-full md:w-1/2 flex items-start justify-center p-10 pt-16">
                <div className="w-full max-w-[400px]">
                  <div className="text-center mb-[50px]">
                    <h2 className="text-2xl font-bold mb-2">
                      <span>WELCOME BACK TO </span>
                      <span className="text-[#3375CC] italic">EDU</span>
                      <span className="text-[#FFB800] italic">RISE</span>
                    </h2>
                    <p className="text-gray-500 mb-6">
                      Lupa Password? Jangan Khawatir! Lengkapi Data Akun Anda
                      Untuk Meresetnya
                    </p>
                  </div>

                  {msg && <p className="text-center text-red-500 mb-4">{msg}</p>}

                  {isResetFlow ? (
                    // --- Form Reset Password ---
                    <form onSubmit={handleResetPassword} className="mt-0">
                      <div className="mb-3">
                        <label
                          htmlFor="newPassword"
                          className="block font-bold mb-1"
                        >
                          New Password
                        </label>
                        <div className="flex">
                          <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                            id="newPassword"
                            placeholder="Enter your new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <span className="inline-flex items-center px-3 bg-gray-100 border border-l-0 border-gray-300 rounded-r">
                            <img
                              src="/img/eduriselanding/li_lock.png"
                              alt="Lock Icon"
                              className="w-6 h-6"
                            />
                          </span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="confPassword"
                          className="block font-bold mb-1"
                        >
                          Confirm New Password
                        </label>
                        <div className="flex">
                          <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                            id="confPassword"
                            placeholder="Confirm your new password"
                            value={confPassword}
                            onChange={(e) => setConfPassword(e.target.value)}
                            required
                          />
                          <span className="inline-flex items-center px-3 bg-gray-100 border border-l-0 border-gray-300 rounded-r">
                            <img
                              src="/img/eduriselanding/li_lock.png"
                              alt="Lock Icon"
                              className="w-6 h-6"
                            />
                          </span>
                        </div>
                      </div>

                      <div className="mt-6">
                        <button
                          type="submit"
                          className="w-full bg-[#3375CC] hover:bg-[#295ea3] text-white font-bold py-2 px-4 rounded transition-colors"
                        >
                          Reset Password
                        </button>
                      </div>
                    </form>
                  ) : (
                    // --- Form Forgot Password ---
                    <form onSubmit={handleForgotPassword} className="mt-0">
                      <div className="mb-4">
                        <label htmlFor="email" className="block font-bold mb-1">
                          Email
                        </label>
                        <div className="flex">
                          <input
                            type="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                            id="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
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

                      <div className="mt-6">
                        <button
                          type="submit"
                          className="w-full bg-[#3375CC] hover:bg-[#295ea3] text-white font-bold py-2 px-4 rounded transition-colors"
                        >
                          Send Reset Link
                        </button>
                      </div>
                    </form>
                  )}

                  <p className="text-center mt-4">
                    Don't have an account?{" "}
                    <Link
                      to="/registerpage"
                      className="!text-[#DDA853] hover:underline"
                    >
                      Sign up here!
                    </Link>
                  </p>
                </div>
              </div>

              {/* Image Section */}
              <div
                className="hidden md:block w-1/2 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('/img/eduriselanding/stack-books-lightbulb-3d-render-icon.jpg')",
                }}
              ></div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ResetPage;