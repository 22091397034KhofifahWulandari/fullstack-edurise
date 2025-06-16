import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
// Hapus import statis gambar/video jika sudah diambil dari backend
// import posterWeb from '/img/eduacademy/posterweb.png'; // Ini akan menjadi fallback jika webinarData.gambar kosong
import profile from '/img/eduacademy/profile.png'; // Ini masih bisa digunakan sebagai placeholder jika narasumber tidak punya gambar

import Header from "../../components/Navbar";
import Footer from "../../components/Footer";

import RegistrationPopup from "../../components/eduacademy/RegisPoup";
import SuccessPopup from "../../components/eduacademy/SuccessPopup";
import JoinPopup from "../../components/eduacademy/JoinPopup";
import RekamanPopup from "../../components/eduacademy/RekamanPopup";
import SertifikatPopup from "../../components/eduacademy/SertifikatPopup";

// Path default jika gambar/video dari backend kosong
const DEFAULT_POSTER_WEB = '/img/eduacademy/posterweb.png';
const DEFAULT_SERTIF_PLACEHOLDER = '/img/eduacademy/sertip.png'; // Placeholder gambar sertifikat

function WebinarDetail() {
  const { id } = useParams();
  console.log("Webinar ID from URL (useParams):", id);

  const [webinarData, setWebinarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState("#Desc");
  const [showRegistrationPopup, setShowRegistrationPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showRekamanPopup, setShowRekamanPopup] = useState(false);
  const [showSertifikatPopup, setShowSertifikatPopup] = useState(false);
  const [showJoinPopup, setShowJoinPopup] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showDownloadButtons, setShowDownloadButtons] = useState(false);

  const [formData, setFormData] = useState({
    nama: "",
    jenjang: "",
    instansi: "",
    jurusan: "",
    email: "",
    nomor_hp: "",
    alasan: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchWebinarDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:5000/webinars/${id}`);
        const data = response.data;
        setWebinarData(data);

        const storedRegistrations = JSON.parse(localStorage.getItem('registeredWebinars')) || {};
        const userRegistered = storedRegistrations[id] === true; // Pastikan ini hanya true jika terdaftar

        setIsRegistered(userRegistered);

        // Menentukan kapan tombol download muncul dan tombol join/daftar dinonaktifkan
        // Cek status webinar dari backend ATAU cek tanggal selesai jika status belum diset 'completed'
        // Asumsi: data.tanggal_pelaksanaan adalah tanggal mulai, kita butuh tanggal_selesai jika ada
        // Atau kita bisa asumsikan webinar selesai setelah tanggal_pelaksanaan + durasi tertentu
        // Untuk saat ini, kita gunakan status dari backend atau tanggal_pelaksanaan jika status belum 'completed'
        const webinarCompleted = data.status === 'completed' || (new Date(data.tanggal_pelaksanaan) < new Date());
        
        // Tombol download hanya muncul jika user terdaftar DAN webinar sudah selesai
        setShowDownloadButtons(userRegistered && webinarCompleted);

      } catch (err) {
        console.error("Error fetching webinar details:", err);
        if (err.response && err.response.status === 404) {
          setError("Webinar tidak ditemukan.");
        } else {
          setError("Gagal memuat detail webinar. Silakan coba lagi nanti.");
        }
        setWebinarData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWebinarDetails();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["#Desc", "#ins", "#cara", "#syarat"];
      let current = "";

      sections.forEach((section) => {
        const element = document.querySelector(section);
        if (element) {
          // Calculate if the section is currently in view
          const rect = element.getBoundingClientRect();
          // Adjust 150px offset for fixed header if needed
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
          }
        }
      });

      if (current) {
        setActiveTab(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Hapus error spesifik saat input berubah
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nama.trim()) newErrors.nama = "Nama lengkap tidak boleh kosong";
    if (!formData.jenjang.trim()) newErrors.jenjang = "Jenjang pendidikan harus dipilih";
    if (!formData.instansi.trim()) newErrors.instansi = "Nama instansi tidak boleh kosong";
    // Jurusan bisa kosong, jadi tidak perlu validasi trim()

    if (!formData.email.trim()) {
      newErrors.email = "Email tidak boleh kosong";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!formData.nomor_hp || !formData.nomor_hp.trim()) {
        newErrors.nomor_hp = "Nomor HP tidak boleh kosong";
    } else if (!/^\d{10,15}$/.test(formData.nomor_hp)) {
        newErrors.nomor_hp = "Nomor HP tidak valid. Hanya angka dan minimal 10-15 digit.";
    }

    if (!formData.alasan.trim()) newErrors.alasan = "Alasan mengikuti webinar tidak boleh kosong";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const dataToSend = {
          nama: formData.nama,
          jenjang_pendidikan: formData.jenjang, // Sesuaikan dengan nama field di backend
          instansi_pendidikan: formData.instansi, // Sesuaikan dengan nama field di backend
          jurusan: formData.jurusan,
          email: formData.email,
          nomor_hp: formData.nomor_hp,
          alasan_mengikuti_webinar: formData.alasan, // Sesuaikan dengan nama field di backend
          webinarId: id, // Pastikan backend mengharapkan webinarId
        };

        console.log("Data yang akan dikirim ke backend:", dataToSend);

        const response = await axios.post(`http://localhost:5000/webinar-peserta/register`, dataToSend);

        if (response.status === 201) {
          setShowRegistrationPopup(false);
          setTimeout(() => {
            setShowSuccessPopup(true);
            setIsRegistered(true);

            // Simpan status pendaftaran ke localStorage
            const storedRegistrations = JSON.parse(localStorage.getItem('registeredWebinars')) || {};
            storedRegistrations[id] = true;
            localStorage.setItem('registeredWebinars', JSON.stringify(storedRegistrations));

            // Perbarui showDownloadButtons setelah pendaftaran sukses
            // Agar jika webinar sudah selesai, tombol download langsung muncul
            const webinarCompleted = webinarData.status === 'completed' || (new Date(webinarData.tanggal_pelaksanaan) < new Date());
            setShowDownloadButtons(webinarCompleted); // Hanya show jika completed

            // Reset form data setelah sukses
            setFormData({
              nama: "",
              jenjang: "",
              instansi: "",
              jurusan: "",
              email: "",
              nomor_hp: "",
              alasan: "",
            });
            setErrors({});
          }, 500);
        }
      } catch (err) {
        console.error("Error during webinar registration:", err);
        if (err.response) {
          // Tangani error spesifik dari backend (misal, user sudah terdaftar)
          if (err.response.status === 409) { // Conflict
            alert("Pendaftaran gagal: Anda sudah terdaftar untuk webinar ini.");
            // Mungkin juga set isRegistered = true di sini jika memang duplikat
            setIsRegistered(true); 
            closePopup(); // Tutup popup pendaftaran
          } else {
            alert("Pendaftaran gagal: " + (err.response.data.msg || err.response.data.message || `Kode status: ${err.response.status}. Terjadi kesalahan pada server.`));
          }
        } else if (err.request) {
          alert("Pendaftaran gagal: Tidak ada respons dari server. Pastikan server berjalan dan koneksi internet Anda stabil.");
        } else {
          alert("Pendaftaran gagal: " + err.message);
        }
      }
    }
  };

  const handleJoinWebinar = () => {
    if (webinarData && webinarData.link_webinar) {
      window.open(webinarData.link_webinar, '_blank');
      closePopup();
      // Opsional: Anda bisa set status pendaftaran menjadi 'hadir' di backend di sini
      // axios.put(`http://localhost:5000/webinar-peserta/update-status/${id}`, { status_pendaftaran: 'hadir' });
    } else {
      alert("Link webinar tidak tersedia.");
    }
  };

  const closePopup = () => {
    setShowRegistrationPopup(false);
    setShowSuccessPopup(false);
    setShowRekamanPopup(false);
    setShowSertifikatPopup(false);
    setShowJoinPopup(false);
  };

  // Logika untuk menampilkan tombol utama di hero section dan sticky card
  const renderMainActionButton = () => {
    // Tentukan apakah webinar sudah selesai atau belum
    // Membandingkan tanggal_pelaksanaan dengan tanggal saat ini
    const now = new Date();
    const webinarDate = new Date(webinarData.tanggal_pelaksanaan);
    // Tambahkan 2 jam untuk memberikan waktu "buffer" setelah jam pelaksanaan agar bisa join
    const webinarStartTime = new Date(`${webinarData.tanggal_pelaksanaan}T${webinarData.jam_pelaksanaan}`);
    const webinarEndTime = new Date(webinarStartTime.getTime() + (2 * 60 * 60 * 1000)); // Asumsi webinar berlangsung 2 jam setelah waktu mulai

    const isWebinarCompleted = webinarData.status === 'completed' || now > webinarEndTime;
    const isWebinarCancelled = webinarData.status === 'cancelled';
    const isWebinarUpcoming = webinarData.status === 'upcoming' && now < webinarStartTime;
    const isWebinarLiveOrAboutToStart = webinarData.status === 'upcoming' && now >= webinarStartTime && now <= webinarEndTime;

    if (isWebinarCancelled) {
        return (
            <button
                className="inline-block bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition cursor-not-allowed"
                disabled
            >
                Webinar Dibatalkan
            </button>
        );
    } else if (isRegistered) {
        if (isWebinarCompleted) {
            return (
              <button
                className="inline-block bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition cursor-not-allowed"
                disabled
              >
                Webinar Selesai
              </button>
            );
        } else if (isWebinarLiveOrAboutToStart) { // Jika webinar sedang berlangsung atau segera dimulai
            return (
              <button
                onClick={() => setShowJoinPopup(true)}
                className="inline-block bg-[#0BAB5E] hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Terdaftar (Join Sekarang)
              </button>
            );
        } else if (isWebinarUpcoming) { // Jika upcoming tapi belum waktunya join
            return (
                <button
                    className="inline-block bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition cursor-not-allowed"
                    disabled
                >
                    Terdaftar (Menunggu Waktu)
                </button>
            );
        }
    } else { // Jika user BELUM terdaftar
        if (isWebinarCompleted) { // DAN webinar sudah selesai
            return (
              <button
                className="inline-block bg-gray-500 text-white px-3 py-3 rounded-lg font-semibold transition cursor-not-allowed"
                disabled
              >
                Pendaftaran Ditutup
              </button>
            );
        } else if (isWebinarUpcoming || isWebinarLiveOrAboutToStart) { // Jika user BELUM terdaftar DAN webinar BELUM selesai (upcoming atau sedang berlangsung)
            return (
              <button
                onClick={() => setShowRegistrationPopup(true)}
                className="inline-block bg-[#3375CC] hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Daftar Sekarang
              </button>
            );
        }
    }
    // Fallback jika tidak ada kondisi yang terpenuhi
    return null; 
};


  if (loading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl text-gray-700">Memuat detail webinar...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="flex flex-col justify-center items-center h-screen text-red-600 text-lg">
          <p>{error}</p>
          <Link to="/eduacademy" className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Kembali ke Daftar Webinar
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  if (!webinarData) {
    // Ini harusnya sudah ditangani oleh error state di atas,
    // tapi sebagai fallback jika ada kondisi lain yang membuat webinarData null
    return (
      <>
        <Header />
        <div className="flex flex-col justify-center items-center h-screen text-red-600 text-lg">
          <p>Webinar tidak ditemukan atau terjadi kesalahan.</p>
          <Link to="/eduacademy" className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Kembali ke Daftar Webinar
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const eventDate = new Date(webinarData.tanggal_pelaksanaan).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <>
      <Header />
      <div className="bg-white text-gray-800">
        <section
          className="relative text-white min-h-screen flex items-center overflow-hidden"
          style={{ background: "linear-gradient(to right, #265899, #0D1D33)" }}
        >
          <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center">
            <div className="z-20 w-full md:w-1/2 order-1 md:order-1">
              <div className="max-w-xl text-left">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                  {/* Pastikan judul terformat dengan baik jika tidak ada ':' */}
                  <span className="text-[#DDA853]">{webinarData.judul.split(':')[0] || webinarData.judul}:</span>
                  <br />
                  <span className="text-[#DDA853]">{webinarData.judul.split(':')[1] || ''}</span>{" "}
                  <span className="text-white">{webinarData.judul.split(':')[2] || ''}</span>
                  <br />
                  <span className="text-white">{webinarData.judul.split(':')[3] || ''}</span>
                </h1>
                <p className="flex items-center text-sm mb-4">
                  <span className="w-2 h-2 bg-[#DDA853] rounded-full inline-block mr-2"></span>
                  {eventDate} |{" "}
                  <span className="w-2 h-2 mx-2 bg-red-500 rounded-full inline-block mr-2"></span>{" "}
                  {webinarData.jam_pelaksanaan}
                </p>
                <p className="text-gray-300 mb-8">
                  {webinarData.deskripsi}
                </p>
                {/* Panggil fungsi baru untuk tombol utama */}
                {renderMainActionButton()}
              </div>
            </div>

            <div className="z-10 w-full md:w-1/2 order-2 md:order-2 flex justify-center md:justify-end">
              <img
                src={webinarData.gambar || DEFAULT_POSTER_WEB} // Gunakan gambar dari backend, fallback ke default
                alt={webinarData.judul}
                className="w-full max-w-[500px] object-contain mb-0 rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </section>

        <br />
        <br />

        <section id="detail" className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap border-b" id="tabs">
              {/* Pastikan href sesuai dengan id section yang dituju */}
              <a
                href="#Desc"
                onClick={(e) => { e.preventDefault(); setActiveTab("#Desc"); document.querySelector("#Desc").scrollIntoView({ behavior: 'smooth' }); }}
                className={`group relative pb-4 px-4 mr-8 ${
                  activeTab === "#Desc"
                    ? "text-blue-900"
                    : "text-gray-500 hover:text-blue-900"
                } font-medium cursor-pointer`}
              >
                Deskripsi
                <span
                  className={`underline-indicator absolute bottom-0 left-0 w-full h-1 bg-blue-600 transform ${
                    activeTab === "#Desc"
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  } transition-transform duration-300`}
                ></span>
              </a>
              <a
                href="#ins"
                onClick={(e) => { e.preventDefault(); setActiveTab("#ins"); document.querySelector("#ins").scrollIntoView({ behavior: 'smooth' }); }}
                className={`group relative pb-4 px-4 mr-8 ${
                  activeTab === "#ins"
                    ? "text-blue-900"
                    : "text-gray-500 hover:text-blue-900"
                } font-medium cursor-pointer`}
              >
                Instruktur
                <span
                  className={`underline-indicator absolute bottom-0 left-0 w-full h-1 bg-blue-600 transform ${
                    activeTab === "#ins"
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  } transition-transform duration-300`}
                ></span>
              </a>
              <a
                href="#cara"
                onClick={(e) => { e.preventDefault(); setActiveTab("#cara"); document.querySelector("#cara").scrollIntoView({ behavior: 'smooth' }); }}
                className={`group relative pb-4 px-4 mr-8 ${
                  activeTab === "#cara"
                    ? "text-blue-900"
                    : "text-gray-500 hover:text-blue-900"
                } font-medium cursor-pointer`}
              >
                Cara Gabung
                <span
                  className={`underline-indicator absolute bottom-0 left-0 w-full h-1 bg-blue-600 transform ${
                    activeTab === "#cara"
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  } transition-transform duration-300`}
                ></span>
              </a>
              <a
                href="#syarat"
                onClick={(e) => { e.preventDefault(); setActiveTab("#syarat"); document.querySelector("#syarat").scrollIntoView({ behavior: 'smooth' }); }}
                className={`group relative pb-4 px-4 ${
                  activeTab === "#syarat"
                    ? "text-blue-900"
                    : "text-gray-500 hover:text-blue-900"
                } font-medium cursor-pointer`}
              >
                Syarat & Kondisi
                <span
                  className={`underline-indicator absolute bottom-0 left-0 w-full h-1 bg-blue-600 transform ${
                    activeTab === "#syarat"
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  } transition-transform duration-300`}
                ></span>
              </a>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-2/3 pr-0 lg:pr-8">
                <div id="Desc" className="mb-16 scroll-mt-24">
                  <h2 className="text-2xl font-bold text-blue-900 mb-6">
                    Tentang Webinar Ini
                  </h2>
                  <p className="text-gray-700 mb-6 leading-relaxed whitespace-pre-line">
                    {webinarData.deskripsi}
                  </p>
                </div>

                <div id="ins" className="mb-16 scroll-mt-24">
                  <h2 className="text-2xl font-bold text-blue-900 mb-6">
                    Instruktur
                  </h2>
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-red-600 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={profile} // Jika ada gambar narasumber dari backend, gunakan di sini
                        alt={webinarData.narasumber}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-lg">{webinarData.narasumber}</h3>
                      <p className="text-gray-600">{webinarData.penyelenggara}</p>
                    </div>
                  </div>
                </div>

                <div id="cara" className="mb-16 scroll-mt-24">
                  <h2 className="text-2xl font-bold text-blue-900 mb-6">
                    Cara Gabung Webinar Ini
                  </h2>
                  <ol className="list-decimal pl-5 space-y-3 text-gray-700">
                    <li>
                      Anda dapat daftar webinar ini dengan mengklik tombol
                      "Daftar Sekarang".
                    </li>
                    <li>
                      15 menit sebelum acara dimulai, Anda dapat bergabung.
                    </li>
                    <li>Caranya Webinar Zoom.</li>
                    <li>Pergi kelaman webinar terdaftar.</li>
                    <li>Pastikan Anda sudah login.</li>
                    <li>setelah itu klik tombol "Mulai Sekarang".</li>
                    <li>
                      Dengan lupa untuk mengisi ulasan setelah sesi webinar
                      berakhir dengan mengklik tombol "Beri Ulasan".
                    </li>
                    <li>
                      Anda bisa mendapatkan sertifikat kehadiran webinar 1x24
                      jam setelah memberikan ulasan.*
                    </li>
                  </ol>
                  <div className="mt-6">
                    <p className="text-gray-700 mb-2">
                      Video dapat diunduh saat acara selesai.**
                    </p>
                    <p className="text-gray-700 mb-4">
                      Catatan: Tautan unduhan akan dikirim melalui email,
                      halaman riwayat webinar, atau halaman ini.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>
                        Centang tanda sertifikat dalam manfaat untuk
                        ketersediaan sertifikat.
                      </li>
                      <li>
                        Centang tanda materi dalam manfaat untuk ketersediaan
                        materi.
                      </li>
                    </ul>
                  </div>
                </div>

                <div id="syarat" className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-blue-900 mb-6">
                    Syarat & Ketentuan
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Semua pemberitahuan mengenai informasi dan perubahan kelas
                    akan disampaikan langsung oleh sistem kami melalui email,
                    mohon cek email Anda secara berkala. Untuk informasi lebih
                    lanjut, silahkan hubungi kami di Komunitas Discord Kami.
                  </p>
                </div>
              </div>

              <div className="lg:w-1/3 mt-8 lg:mt-0">
                <div className="sticky top-8">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-xs mx-auto w-full transition-transform hover:scale-105">
                    <div className="aspect-square rounded-t-lg">
                      <img
                        src={webinarData.gambar || DEFAULT_POSTER_WEB} // Gunakan gambar dari backend, fallback ke default
                        alt={webinarData.judul}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-3">
                      <div className="flex justify-between mb-2">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          {eventDate.split(',')[0]}, {eventDate.split(',')[1]}
                        </span>
                        <span className="bg-yellow-50 text-yellow-800 px-2 py-1 rounded-full text-xs">
                          {webinarData.jam_pelaksanaan}
                        </span>
                      </div>
                      <h3 className="font-bold text-base mb-1">
                        {webinarData.judul}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">{webinarData.narasumber}</p>

                      {showDownloadButtons ? (
                        <div className="flex space-x-3 w-full justify-center">
                          <button
                            onClick={() => setShowSertifikatPopup(true)}
                            className="inline-block w-1/2 bg-[#DDA853] text-white text-center py-1.5 px-3 rounded-lg text-xs font-medium transition-colors duration-300"
                          >
                            Akses Sertifikat
                          </button>
                          <button
                            onClick={() => setShowRekamanPopup(true)}
                            className="inline-block w-1/2 bg-[#3375CC] text-white text-center py-1.5 px-3 rounded-lg text-xs font-medium transition-colors duration-300"
                          >
                            Akses Rekaman
                          </button>
                        </div>
                      ) : (
                        // Menggunakan logika yang sama dengan tombol utama
                        renderMainActionButton()
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Render Popups */}
        <RegistrationPopup
          showRegistrationPopup={showRegistrationPopup}
          closePopup={closePopup}
          formData={formData}
          handleInputChange={handleInputChange}
          errors={errors}
          handleSubmit={handleSubmit}
        />
        <SuccessPopup
          showSuccessPopup={showSuccessPopup}
          closePopup={closePopup}
        />
        <JoinPopup
          showJoinPopup={showJoinPopup}
          closePopup={closePopup}
          webinarLink={webinarData.link_webinar}
          webinarImage={webinarData.gambar || DEFAULT_POSTER_WEB} // Meneruskan gambar ke JoinPopup
          // setShowDownloadButtons={setShowDownloadButtons} // Dihapus, logic ada di WebinarDetail
          handleJoinWebinar={handleJoinWebinar}
        />
        <RekamanPopup
          showRekamanPopup={showRekamanPopup}
          closePopup={closePopup}
          rekamanLink={webinarData.link_rekaman}
        />
        <SertifikatPopup
          showSertifikatPopup={showSertifikatPopup}
          closePopup={closePopup}
          sertifikatLink={webinarData.link_sertifikat}
        />
      </div>
      <Footer />
    </>
  );
}

export default WebinarDetail;