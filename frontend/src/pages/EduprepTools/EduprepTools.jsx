import { Link } from "react-router-dom";
import Header from "../../components/Navbar";
import Footer from "../../components/Footer";
const EduprepTools = () => {
  return (
    <>
      <Header />
      {/* Hero Section */}
      <section
        className="py-[60px] flex items-center text-[#feffff]"
        style={{ background: 'linear-gradient(to left, #265899, #0d1d33)' }}
      >
        <div className="max-w-6xl mx-auto px-4 w-full">
          <div className="flex justify-between items-center">
            <div className="flex-1 pr-5">
              <h1 className="text-[49px] mb-4 font-bold" style={{ color: '#dda853' }}>
                Siap untuk mencapai impianmu?
              </h1>
              <p className="text-base leading-6 mb-6">
                EduPrep hadir untuk membantu kamu mempersiapkan diri meraih beasiswa dan memaksimalkan peluang akademik. Ayo, mulai persiapanmu sekarang juga!
              </p>
            </div>
            <div className="flex-1 text-right">
              <img
                src="/img/edupreptools/page1_gambar.png"
                alt="Persiapan Beasiswa"
                className="max-w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CV & Motivation Letter Section */}
      <section className="py-[60px] text-center">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-[31px] max-w-[700px] mx-auto mb-3 font-bold text-[#3375cc]">
            Sudahkah Dokumenmu <span className="text-[#dda853]">Mencerminkan</span> Potensimu{" "}
            <span className="text-[#dda853]">Sebenarnya?</span>
          </h2>
          <p className="text-base max-w-[800px] mx-auto mb-10 text-[#575858]">
            CV dan motivation letter adalah kesan pertama. Pastikan kesan itu kuat, profesional, dan mencerminkan siapa kamu sebenarnya. Kami siap membantumu menyusunnya dengan tepat.
          </p>

          <div className="flex justify-center gap-[50px] mb-[40px] flex-wrap">
            {/* CV Card */}
            <div className="bg-[#feffff] rounded-lg shadow-[0_4px_15px_rgba(0,0,0,0.1)] py-[30px] px-[40px] text-center flex-1 max-w-[300px] flex flex-col">
              <div className="w-full text-center mb-[20px]">
                <img
                  src="/img/edupreptools/icon_dokumen.png"
                  alt="CV Icon"
                  className="w-16 mx-auto"
                />
              </div>
              <h3 className="text-lg mb-3 text-[#575858] font-bold">CV (Curriculum Vitae)</h3>
              <p className="text-sm mb-4 leading-6 flex-grow text-[#575858]">
                Tampilkan pengalaman dan pencapaianmu secara jelas dan profesional.
              </p>
              <Link
                to="/eduprep-tools/pratinjau-cv"
                className="inline-block bg-[#3375cc] text-white py-[10px] px-[60px] rounded-[5px] !no-underline font-bold transition-colors duration-300 border-0 cursor-pointer text-base hover:bg-[#0286e6] mt-auto"
              >
                Lihat Detail
              </Link>
            </div>

            {/* Motivation Letter Card */}
            <div className="bg-[#feffff] rounded-lg shadow-[0_4px_15px_rgba(0,0,0,0.1)] py-[30px] px-[40px] text-center flex-1 max-w-[300px] flex flex-col">
              <div className="w-full text-center mb-[20px]">
                <img
                  src="/img/edupreptools/icon_dokumen.png"
                  alt="Motivation Letter Icon"
                  className="w-16 mx-auto"
                />
              </div>
              <h3 className="text-lg mb-3 text-[#575858] font-bold">Motivation Letter</h3>
              <p className="text-sm mb-4 leading-6 flex-grow text-[#575858]">
                Ungkapkan motivasi dan tujuanmu dengan bahasa yang kuat dan meyakinkan.
              </p>
              <Link
                to="/eduprep-tools/pratinjau-motlet"
                className="inline-block bg-[#3375cc] text-white py-[10px] px-[60px] rounded-[5px] !no-underline font-bold transition-colors duration-300 border-0 cursor-pointer text-base hover:bg-[#0286e6] mt-auto"
              >
                Lihat Detail
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Essay Section */}
      <section className="py-[60px] text-center bg-[#feffff]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-[31px] max-w-[700px] mx-auto mb-3 font-bold text-[#3375cc]">
            Apakah Essaymu <span className="text-[#dda853]">Sudah Cukup Meyakinkan?</span>
          </h2>
          <p className="text-base max-w-[800px] mx-auto mb-4 text-[#575858]">
            Essay yang baik bukan soal bahasa yang rumit, tapi tentang cerita yang jujur dan kuat. Mulailah menulis di sini, dan biarkan kami bantu mengasahnya hingga siap memikat pembaca.
          </p>
          <Link
            to="/submit-essay"
            className="inline-block bg-[#3375cc] text-white py-[10px] px-[60px] rounded-[5px] !no-underline font-bold transition-colors duration-300 border-0 cursor-pointer text-base hover:bg-[#0286e6]"
          >
            Coba Tulis
          </Link>
        </div>
      </section>

      {/* Interview Preparation Section */}
      <section className="py-[60px] text-center">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-[31px] max-w-[700px] mx-auto mb-3 font-bold text-[#3375cc]">
            Siapkah Kamu <span className="text-[#dda853]">Menghadapi Wawancara Seleksi?</span>
          </h2>
          <p className="text-base max-w-[800px] mx-auto mb-10 text-[#575858]">
            Jangan biarkan kewajaran jadi penghalang. Latih dirimu lewat simulasi realistis dan tingkatkan rasa percaya diri untuk tampil meyakinkan di depan panel seleksi.
          </p>

          <div className="bg-[#fefefe] rounded-lg shadow-[0_4px_15px_rgba(0,0,0,0.1)] p-5 max-w-[600px] mx-auto">
            <h3 className="text-lg text-[#575858] font-bold mb-12">Simulasi Wawancara</h3>
            <p className="text-sm text-[#575858] leading-6 mb-12">
              Latihan wawancara dengan alur pertanyaan nyata, umpan balik membangun, serta panduan untuk menyiapkan jawaban terbaik dan meningkatkan kepercayaan diri.
            </p>
            <Link
              to="/simulasi-wawancara"
              className="inline-block bg-[#3375cc] text-white py-[10px] px-[60px] rounded-[5px] !no-underline font-bold transition-colors duration-300 border-0 cursor-pointer text-base hover:bg-[#0286e6]"
            >
              Mulai Simulasi
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default EduprepTools;
