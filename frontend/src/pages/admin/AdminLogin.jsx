import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // Import axios

const API_BASE_URL = "http://localhost:5000"; // Sesuaikan dengan URL backend Anda

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(''); // State untuk email
  const [password, setPassword] = useState(''); // State untuk password
  const [msg, setMsg] = useState(''); // State untuk pesan kesalahan/sukses
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const Auth = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: email,
        password: password
      }, {
        withCredentials: true // Penting untuk mengirim cookie sesi
      });

      // Periksa role yang dikembalikan dari backend
      const userRole = response.data.role;
      setMsg(response.data.msg); // Tampilkan pesan sukses dari backend

      if (userRole === 'admin') {
        navigate('/adminhome'); // Arahkan ke halaman admin dashboard
      } else {
        // Jika login berhasil tapi bukan admin, berikan pesan atau arahkan ke login user
        setMsg("Login berhasil, namun Anda bukan admin. Silakan login sebagai pengguna biasa.");
        // Opsional: navigate('/user-login'); atau tetap di halaman ini dengan pesan
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg); // Tangani pesan kesalahan dari backend
      } else {
        setMsg("Terjadi kesalahan jaringan atau server.");
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
                  <img src="/img/eduriselanding/Ellipse 1.png" alt="EduRise Logo" className="w-[70px] h-[70px] object-contain" />
                </div>
              </Link>

              <div className="hidden lg:flex ml-8">
                <ul className="flex space-x-6">
                  <li>
                    <Link className="font-bold" to="/">HOME</Link>
                  </li>
                  <li>
                    <Link className="font-bold text-[#3375CC] !text-[#3375CC] !underline" to="/login">LOGIN PAGE</Link>
                  </li>
                </ul>
              </div>
            </div>

            <button className="lg:hidden p-2 rounded-md" type="button" aria-label="Toggle navigation">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Right side - Profile Button dengan background circle */}
            <div className="w-10 h-10 rounded-full bg-[#3375CC] text-white flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="flex justify-center items-center min-h-[calc(100vh-76px)] px-5 mt-20 mb-20">
          <div className="w-full max-w-[1130px] h-[720px] bg-white rounded-lg overflow-hidden shadow-md mx-auto">
            <div className="flex flex-col md:flex-row h-full">
              {/* Login Form Section */}
              <div className="w-full md:w-1/2 flex items-start justify-center p-10 pt-20">
                <div className="w-full max-w-[400px]">
                  <div className="text-center mb-[85px]">
                    <h2 className="text-2xl font-bold">
                      <span>WELCOME BACK ADMIN </span>
                      <span className="text-[#3375cc] italic">EDU</span>
                      <span className="text-[#dda853] italic">RISE</span>
                    </h2>
                    <p className="text-gray-500 mb-5">Lengkapi Data Login Anda Untuk Melanjutkan</p>
                  </div>

                  <form onSubmit={Auth}> {/* Tambahkan onSubmit ke form */}
                    {msg && <p className="text-red-500 text-center mb-4">{msg}</p>} {/* Menampilkan pesan error/sukses */}

                    <div className="mb-4">
                      <label htmlFor="email" className="block font-bold mt-5 mb-2">Email</label> {/* Ganti Username menjadi Email karena BE menggunakan email */}
                      <div className="flex">
                        <input
                          type="email" // Ganti type menjadi email
                          className="w-full border border-gray-300 rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-[#3375cc] focus:border-transparent"
                          id="email"
                          placeholder="Enter your email"
                          value={email} // Hubungkan ke state email
                          onChange={(e) => setEmail(e.target.value)} // Update state email
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
                          placeholder="Enter your password" // Ganti defaultValue
                          value={password} // Hubungkan ke state password
                          onChange={(e) => setPassword(e.target.value)} // Update state password
                        />
                        <button
                          type="button"
                          className="bg-gray-100 border border-gray-300 border-l-0 rounded-r-md px-3 flex items-center"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                              <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                            </svg>
                          )}
                        </button>
                      </div>
                      <div className="flex justify-end mt-2">
                        <Link to="/resetpage" className="text-xs text-black hover:text-[#3375cc] hover:underline">Forgot Password?</Link>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button
                        type="submit" // Ganti type menjadi submit
                        className="block w-full bg-[#3375cc] hover:bg-[#295ea3] text-white font-bold py-2 px-4 rounded text-center transition duration-200"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Image Section */}
              <div className="hidden md:block md:w-1/2 h-full overflow-hidden">
                <img src="/img/eduriselanding/3d-render-student-graduation-education-school.jpg" alt="Login Image" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AdminLogin;