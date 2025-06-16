import Hero from "/img/eduacademy/Diskusi-Panel-7-removebg-preview.png";
import Header from "../../components/Navbar";
import Footer from "../../components/Footer";

function Forumdiskusi() {
  return (
    <>
      <Header />
      <>
       {/* Hero Section */}
      <section 
      className="relative bg-gradient-to-r from-[#265899] to-[#0D1D33] text-white min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(to right, #265899, #0D1D33)" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-10" />
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Your journey
              <br />
              <span className="text-[#DDA853]">starts with a conversation.</span>
            </h1>
            <p className="text-lg text-gray-200 mb-8">
              Kami menghadirkan komunitas Discord aktif sebagai ruang untuk
              terhubung, bertanya, dan berbagi pengalaman seputar beasiswa dan
              proses pendaftaran – dalam suasana yang ramah, suportif, dan
              fokus pada perkembanganmu.
            </p>
            <a
              href="#academy"
              className="inline-block bg-[#3375CC] hover:bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Join Community
            </a>
          </div>
            {/* Image / Illustration */}
            <div className="flex justify-center md:justify-end">
              <img
                src={Hero}
                alt="Students Talking"
                className="w-full lg:w-[1000px] xl:w-[-1000px] h-auto rounded-xl shadow-lg transition-transform duration-300"
              />
            </div>
          </div>
        </section>
        {/* Featured Community */}
        <section id="academy" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">
              <span className="text-[#1F467A]">Featured</span>{" "}
              <span className="text-[#DDA853]">Community</span>
            </h2>
            <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
              Terhubung dengan komunitas pejuang beasiswa dan pelajar inspiratif
              dari seluruh Indonesia. Bertukar pengalaman, saling support, dan
              tumbuh bersama dalam perjalanan pendidikanmu!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Card 1 */}
              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
                <div className="mb-4 text-[#1F467A]">
                  {/* Icon Buku */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 0a2 2 0 00-2 2v2a2 2 0 002 2V4zm0 4a2 2 0 012 2v2a2 2 0 01-2 2v-4z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg text-[#1F467A] mb-2">
                  #Beasiswa-Indonesia
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Info dan diskusi beasiswa dalam negeri.
                </p>
                <a
                  href="/klikforum"
                  className="text-[#1F467A] text-sm font-semibold hover:underline"
                >
                  Learn more →
                </a>
              </div>
              {/* Card 2 */}
              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
                <div className="mb-4 text-[#1F467A]">
                  {/* Icon Penulisan */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 20h9M12 4h.01M12 8h.01M12 12h.01M12 16h.01"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg text-[#1F467A] mb-2">
                  #Tips-Menulis
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Panduan menulis essay, motivation letter, dan lainnya.
                </p>
                <a
                  href="#"
                  className="text-[#1F467A] text-sm font-semibold hover:underline"
                >
                  Learn more →
                </a>
              </div>
              {/* Card 3 */}
              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
                <div className="mb-4 text-[#1F467A]">
                  {/* Icon Interview */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg text-[#1F467A] mb-2">
                  #Persiapan-Wawancara
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Diskusi dan latihan soal wawancara beasiswa.
                </p>
                <a
                  href="#"
                  className="text-[#1F467A] text-sm font-semibold hover:underline"
                >
                  Learn more →
                </a>
              </div>
              {/* Card 4 */}
              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
                <div className="mb-4 text-[#1F467A]">
                  {/* Icon Karier */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A2 2 0 013 15.382V7a2 2 0 011.553-1.948L9 3m6 0l5.447 2.052A2 2 0 0121 7v8.382a2 2 0 01-1.553 1.894L15 20m0-17v17m-6-17v17"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg text-[#1F467A] mb-2">
                  #Pengembangan-Karier
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Bimbingan karier setelah beasiswa dan studi lanjut.
                </p>
                <a
                  href="#"
                  className="text-[#1F467A] text-sm font-semibold hover:underline"
                >
                  Learn more →
                </a>
              </div>
            </div>
          </div>
        </section>
      </>
      
      <Footer />
    </>
  );
}

export default Forumdiskusi;
