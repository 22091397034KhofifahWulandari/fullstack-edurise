import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "axios";

function SubmitEssay() {
  const [essayContent, setEssayContent] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!essayContent.trim()) {
      setError("Isi esai tidak boleh kosong.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/essays", {
        isi_essay: essayContent,
      });
      setMessage(response.data.msg);
      setError("");

      navigate(`/submit-essay/tunggu-hasil/${response.data.essayId}`);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.msg || "Terjadi kesalahan pada server.");
      } else if (err.request) {
        setError("Tidak ada respons dari server. Pastikan backend berjalan.");
      } else {
        setError("Terjadi kesalahan saat menyiapkan permintaan. Silakan coba lagi.");
      }
      setMessage("");
      console.error("Error submitting essay:", err);
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-[60px] py-[80px]">
        <section className="text-center mb-[60px]">
          <h1 className="text-[36px] font-bold leading-[1.3] !mb-[20px]">
            <span className="text-[#3375cc]">Tulis Esaimu</span>
            <span className="text-[#dda853]"> dengan Percaya Diri</span>
            <br />
            <span className="text-[#3375cc]">Kami Siap Membantu</span>
            <span className="text-[#dda853]"> Menyempurnakannya!</span>
          </h1>
          <p className="text-[16px] text-[#575858] leading-[1.5] max-w-[800px] mx-auto mb-[40px]">
            Mulailah menulis tanpa ragu. Gunakan editor di bawah ini untuk
            menuangkan ide, dan dapatkan bantuan penulisan atau penyuntingan untuk
            hasil esai terbaikmu.
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
              Essay Text Editor
            </h2>
          </div>

          <textarea
            className="min-h-[200px] w-full border border-[#bbbcbc] rounded-[10px] p-[15px] mb-[20px] text-[12px] text-[#575858] focus:outline-none focus:border-[#959697]"
            placeholder="Mulailah menulis esai Anda di sini..."
            value={essayContent}
            onChange={(e) => setEssayContent(e.target.value)}
          ></textarea>

          {message && <p className="text-green-500 mb-4">{message}</p>}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            onClick={handleSubmit}
            className="bg-[#3375cc] hover:bg-[#0286e6] text-white rounded-[5px] px-[30px] py-[10px] text-[16px] font-bold inline-block transition-colors duration-300 !no-underline"
          >
            Submit Esai
          </button>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SubmitEssay;