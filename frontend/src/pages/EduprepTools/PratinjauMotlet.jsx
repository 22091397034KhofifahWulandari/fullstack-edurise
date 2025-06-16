import { Link } from "react-router-dom";
import Header from "../../components/Navbar";
import Footer from "../../components/Footer";

const PratinjauMotivation = () => {
  return (
    <>
      <Header />
      {/* Hero Section */}
      <section
        className="py-16 text-white"
        style={{
          background:
            "linear-gradient(to left, #265899, #0d1d33)",
        }}
      >
        <div className="max-w-6xl mx-auto px-16 flex items-center justify-between">
          {/* Hero Image */}
          <div className="flex-shrink-0 w-[35%] mr-16">
            <img
              src="/img/edupreptools/page3_gambar.png"
              alt="Contoh Motivation Letter"
              className="w-full rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.2)]"
            />
          </div>

          {/* Hero Content */}
          <div className="flex-1 pl-5">
            <h1 className="text-4xl font-bold mb-4 !text-[#dda853]">
              Motivation Letter
            </h1>
            <p className="text-base mb-6 leading-6 text-[#feffff]">
              EduPrep hadir untuk membantu kamu mempersiapkan diri meraih
              beasiswa dan memaksimalkan peluang akademik. Ayo, mulai
              persiapanmu sekarang juga!
            </p>
            <Link
              to="/eduprep-tools/template-motlet"
              className="inline-block bg-[#3375cc] hover:bg-[#0286e6] text-white py-2.5 px-8 rounded font-bold text-base !no-underline transition-colors duration-300"
            >
              Lihat
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        className="py-16 bg-[#f9fafb]"
      >
        <div className="max-w-6xl mx-auto px-5 mt-8">
          {/* Gallery Title */}
          <div className="text-center mb-16">
            <h2
              className="text-[31px] font-bold mb-2.5 !text-[#3375cc]"
            >
              Contoh{" "}
              <span className="text-[#dda853]">Motivation Letter</span>
            </h2>
            <p className="text-base text-[#575858]">
              Uraian padat tentang perjalanan akademik, riwayat kerja, dan
              keahlian yang mendukung tujuan karier.
            </p>
          </div>

          {/* Gallery Grid */}
          <div
            className="grid grid-cols-3 gap-[60px] mb-8"
          >
            {Array.from({ length: 9 }, (_, i) => (
              <div
                key={i}
                className="rounded-[5px] overflow-hidden h-full transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:shadow-black/10"
              >
                <img
                  src={`/img/edupreptools/page3_ml${i + 1}.png`}
                  alt={`Contoh Motivation Letter ${i + 1}`}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default PratinjauMotivation;
