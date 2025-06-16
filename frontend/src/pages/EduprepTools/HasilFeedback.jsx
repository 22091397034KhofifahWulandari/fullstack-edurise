import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "axios";

function HasilFeedback() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [essay, setEssay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedback = async () => {
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
        console.error("Error fetching feedback:", err);
      }
    };

    if (id) {
      fetchFeedback();
    } else {
      setError("ID Esai tidak ditemukan di URL.");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="text-center px-4 !py-[150px]">
          <p>Memuat hasil feedback...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="text-center px-4 !py-[150px]">
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => navigate(`/lihat-hasil/${id}`)}
            className="mt-4 bg-[#3375cc] hover:bg-[#0286e6] text-white py-2.5 px-8 rounded font-bold inline-block !no-underline"
          >
            Kembali ke Status Esai
          </button>
        </main>
        <Footer />
      </>
    );
  }

  const hasFeedback = essay && essay.feedback_ready === 1 && essay.penilaianEssays && essay.penilaianEssays.length > 0;
  const penilaian = hasFeedback ? essay.penilaianEssays[0] : null;

  if (!hasFeedback) {
    return (
      <>
        <Header />
        <main className="text-center px-4 !py-[150px]">
          <p>Feedback untuk esai ini belum tersedia atau esai belum dinilai.</p>
          <button
            onClick={() => navigate(`/lihat-hasil/${id}`)}
            className="mt-4 bg-[#dda853] hover:bg-[#c2964b] text-white py-2.5 px-8 rounded font-bold inline-block !no-underline"
          >
            Kembali ke Status Esai
          </button>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <section
          className="text-white px-[100px] py-[40px] flex items-center justify-between min-h-[300px]"
          style={{
            backgroundImage: "linear-gradient(to left, #265899, #0d1d33)",
          }}
        >
          <div className="max-w-[600px]">
            <h1 className="text-[36px] mb-2 text-[#dda853] font-bold">Hasil Feedback Essay Kamu</h1>
            <p className="text-[16px] text-[#feffff] opacity-90">
              Lihat rangkuman skor dan detail penilaian
            </p>
          </div>
          <img
            src="/img/edupreptools/page7_gambar.png"
            alt="Essay Writing"
            className="w-[240px] h-[190px] object-cover rounded-lg"
          />
        </section>

        <div className="max-w-[1100px] mx-auto my-[60px] px-4">
          <h2 className="text-center mb-5 !text-[31px] !text-[#3375cc] font-semibold">
            Ringkasan <span className="text-[#dda853]">Skor Utama</span>
          </h2>
          <div className="bg-[#feffff] !border border-[#dda853] rounded-[10px] p-3 mb-[60px] text-center">
            <p className="text-[#575858] mb-2 text-[16px] font-bold">Total Skor</p>
            <p className="text-[24px] text-[#575858]">{essay.total_skor} / 100</p>
          </div>

          <h2 className="text-center mb-5 !text-[31px] !text-[#3375cc] font-semibold">
            Hasil <span className="text-[#dda853]">Penilaian</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[80px]">
            {[
              {
                icon: "/img/edupreptools/icon_struktur.png",
                title: "Struktur & Alur",
                desc: penilaian.feedback_struktur,
                score: `${penilaian.skor_struktur}/20`,
              },
              {
                icon: "/img/edupreptools/icon_kesesuaian.png",
                title: "Kesesuaian Topik",
                desc: penilaian.feedback_topik,
                score: `${penilaian.skor_topik}/20`,
              },
              {
                icon: "/img/edupreptools/icon_grammar.png",
                title: "Bahasa & Grammar",
                desc: penilaian.feedback_grammar,
                score: `${penilaian.skor_grammar}/20`,
              },
              {
                icon: "/img/edupreptools/icon_gayabahasa.png",
                title: "Gaya Bahasa & Keunikan",
                desc: penilaian.feedback_gaya,
                score: `${penilaian.skor_gaya}/20`,
              },
              {
                icon: "/img/edupreptools/icon_ketepatan.png",
                title: "Ketepatan Panjang Esai",
                desc: penilaian.feedback_panjang,
                score: `${penilaian.skor_panjang}/20`,
                full: true,
              },
            ].map(({ icon, title, desc, score, full }, index) => (
              <div
                key={index}
                className={`bg-[#feffff] !border border-[#dda853] rounded-[10px] p-3 flex ${
                  full ? "md:col-span-2" : ""
                }`}
              >
                <div className="w-[80px] h-[80px] mr-4 flex-shrink-0 !border border-[#3375cc] rounded-[10px] p-1.5 flex items-center justify-center">
                  <img src={icon} alt={`Icon ${title}`} className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="!text-[20px] !font-bold !text-[#575858] mb-2">
                    {title}
                  </h3>
                  <p className="!text-[16px] !text-[#575858] mb-2">{desc}</p>
                  <span className="inline-block bg-[#dda853] text-[#feffff] px-2 py-1 rounded text-xs">
                    {score}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-[#575858] text-center mt-4">
            Dinilai oleh Admin: {penilaian.adminPenilai ? penilaian.adminPenilai.name : 'N/A'} pada {new Date(penilaian.tanggal_review).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default HasilFeedback;