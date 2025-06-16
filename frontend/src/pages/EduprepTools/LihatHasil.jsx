import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "axios";

function LihatHasil() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [essay, setEssay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEssayResult = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/myessays/${id}`);
        setEssay(response.data);
        setLoading(false);
      } catch (err) {
        if (err.response) {
          setError(err.response.data.msg || "Terjadi kesalahan pada server.");
        } else if (err.request) {
          setError("Tidak ada respons dari server. Pastikan backend berjalan.");
        } else {
          setError("Terjadi kesalahan saat menyiapkan permintaan. Silakan coba lagi.");
        }
        setLoading(false);
        console.error("Error fetching essay result:", err);
      }
    };

    if (id) {
      fetchEssayResult();
    } else {
      setError("ID Esai tidak ditemukan di URL.");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="max-w-[1200px] mx-auto px-[60px] py-[80px] text-center">
          <p>Memuat hasil esai...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="max-w-[1200px] mx-auto px-[60px] py-[80px] text-center">
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => navigate('/')} // Ganti dengan route daftar esai jika ada
            className="mt-4 bg-[#3375cc] hover:bg-[#0286e6] text-white rounded-[5px] px-[30px] py-[10px] text-[16px] font-bold inline-block transition-colors duration-300"
          >
            Kembali ke Dashboard
          </button>
        </main>
        <Footer />
      </>
    );
  }

  if (!essay) {
    return (
      <>
        <Header />
        <main className="max-w-[1200px] mx-auto px-[60px] py-[80px] text-center">
          <p>Esai tidak ditemukan atau Anda tidak memiliki akses.</p>
        </main>
        <Footer />
      </>
    );
  }

  const feedbackReady = essay.feedback_ready === 1;

  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-[60px] py-[80px]">
        <section className="text-center mb-[60px]">
          <h1 className="text-[36px] font-bold leading-[1.3] !mb-[20px]">
            <span className="text-[#3375cc]">Hasil Penilaian Esai</span>
            <br />
            <span className="text-[#dda853]">Anda</span>
          </h1>
          <p className="text-[16px] text-[#575858] leading-[1.5] max-w-[800px] mx-auto mb-[40px]">
            Lihat feedback dan skor untuk esai yang telah Anda kirim.
          </p>
        </section>

        <section className="bg-[#feffff] rounded-[20px] shadow-md p-[30px] mb-[30px]">
          <div className="flex items-center mb-[20px]">
            <img
              src="/img/edupreptools/icon_editor.png"
              alt="Editor Icon"
              className="w-[24px] h-[24px] mr-[10px]"
            />
            <h2 className="text-[24px] font-bold text-[#575858]">
              Esai Anda
            </h2>
          </div>

          <div
            className="min-h-[200px] border border-[#bbbcbc] rounded-[10px] p-[15px] mb-[20px] text-[12px] text-[#575858] whitespace-pre-wrap"
          >
            {essay.isi_essay}
          </div>
          <p className="text-sm text-[#575858] mt-2">
            Tanggal Submit: {new Date(essay.tanggal_submit).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>

          {feedbackReady ? (
            <Link
              to={`/hasil-feedback/${id}`}
              className="bg-[#3375cc] hover:bg-[#0286e6] text-white rounded-[5px] px-[30px] py-[10px] text-[16px] font-bold inline-block transition-colors duration-300 !no-underline"
            >
              Lihat Hasil Feedback
            </Link>
          ) : (
            <div className="min-h-[50px] p-[15px] text-[12px] text-[#575858] flex items-center justify-center">
              Sedang melakukan ulasan...
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default LihatHasil;