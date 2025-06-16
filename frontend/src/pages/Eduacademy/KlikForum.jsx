import Header from "../../components/Navbar";
import Footer from "../../components/Footer";
function Klikforum() {
  return (
    <>
      <Header />
      <>

        {/* Header Section */}
        <header className="bg-gradient-to-r from-[#265899] to-[#0D1D33] text-white py-16"
        style={{ background: "linear-gradient(to right, #265899, #0D1D33)" }}
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-2">#Beasiswa-Indonesia</h2>
            <p className="text-lg max-w-xl mx-auto">
              Ruang diskusi dan berbagi info beasiswa dalam negeri, dari LPDP
              hingga beasiswa kampus lokal. Temukan tips, pengalaman, dan
              pengumuman terbaru!
            </p>
          </div>
        </header>
        {/* Content Section */}
        <main className="max-w-5xl mx-auto px-6 py-16">
          <section className="mb-12">
            <h3 className="text-2xl font-semibold text-[#1F467A] mb-4">
              Apa yang Dibahas di Komunitas Ini?
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                Update rutin info beasiswa dalam negeri (LPDP, KIP-K, dll)
              </li>
              <li>Tips dan trik lolos seleksi administrasi &amp; wawancara</li>
              <li>Sharing pengalaman dari awardee &amp; alumni</li>
              <li>Template surat motivasi dan CV</li>
              <li>Sesi Q&amp;A dan diskusi mingguan</li>
            </ul>
          </section>
          <section className="mb-12">
            <h3 className="text-2xl font-semibold text-[#1F467A] mb-4">
              Statistik Komunitas
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-[#3375CC]">+15</p>
                <p className="text-sm text-gray-600">Anggota Aktif</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#3375CC]">126</p>
                <p className="text-sm text-gray-600">Beasiswa Dibahas</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#3375CC]">5</p>
                <p className="text-sm text-gray-600">Mentor Berpengalaman</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#3375CC]">3</p>
                <p className="text-sm text-gray-600">Event Bulanan</p>
              </div>
            </div>
          </section>
          <section className="text-center">
            <a
              href="#"
              className="bg-[#3375CC] hover:bg-[#1F467A] text-white px-6 py-3 rounded-full text-lg font-semibold transition"
            >
              Gabung Sekarang
            </a>
          </section>
        </main>
      </>
      <Footer />
    </>
  );
}

export default Klikforum;
