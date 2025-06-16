import React from "react";
import { useNavigate, Link } from "react-router-dom";
import HeaderBefore from "../components/HeaderBefore";

const LandingBefore = () => {
  return (
    <>
      <HeaderBefore />
      <main>
        {/* Hero Section */}
        <section className="bg-[#F9FAFB] overflow-hidden">
          <div className="max-w-[1440px] h-[628px] mx-auto relative">
            <div className="flex flex-col lg:flex-row">
              {/* Left side: Text and Search */}
              <div className="lg:w-1/2">
                <div className="max-w-[580px] pt-[74px] pl-[62px]">
                  <h1 className="text-3xl font-bold mb-5">
                    <span className="text-[#3375CC] italic">EDU</span>
                    <span className="text-[#DDA853] italic">RISE</span>
                  </h1>
                  <div className="text-2xl font-semibold mb-6">
                    <p className="mb-0">
                      Platform Informasi, Edukasi Seputar Beasiswa
                    </p>
                    <p>Terhandal di Indonesia</p>
                  </div>
                  <p className="text-base leading-relaxed mb-10">
                    <span className="font-bold">EDURISE</span> merupakan
                    platform online yang dirancang khusus untuk pencari beasiswa
                    Indonesia dalam mengakses peluang pendidikan pelatihan, dan
                    pengembangan diri secara mudah dan terpercaya.
                  </p>
                  <div className="w-[458px] max-w-full">
                    <div className="flex flex-col sm:flex-row">
                      <div className="flex w-full">
                        <div className="relative flex items-center w-[328px]">
                          <div className="absolute left-3 z-10">
                            <img
                              src="/img/eduriselanding/mingcute_search-line.png"
                              alt="Search"
                              width="20"
                              height="20"
                            />
                          </div>
                          <input
                            type="text"
                            className="w-full h-[40px] pl-10 pr-3 border border-gray-400 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                            placeholder="Cari Beasiswa ?"
                          />
                        </div>
                        {/* Button Cari */}
                        <Link to="/login">
                          <button className="w-[128px] h-[40px] bg-[#3375CC] text-white font-semibold rounded-r-lg hover:bg-[#295ea3] transition-colors">
                            Cari
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side: Images */}
              <div className="lg:w-1/2 h-[628px] relative">
                <div className="relative h-full">
                  <div className="absolute w-[300px] h-[400px] overflow-hidden rounded-lg shadow-sm left-0 top-[74px] z-10">
                    <img
                      src="/img/eduriselanding/Rectangle 1 landing.png"
                      alt="Student"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute w-[300px] h-[400px] overflow-hidden rounded-lg shadow-sm left-[300px] top-[45px] z-20">
                    <img
                      src="/img/eduriselanding/Rectangle 2 landing.png"
                      alt="Education"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="w-full max-w-screen-2xl mx-auto px-4">
            <div className="text-center mb-5">
              <h2 className="text-[30px] font-semibold text-[#575858] mb-4">
                Fitur yang Mempermudah dalam Meraih Beasiswa Impian
              </h2>
              <p className="text-[18px] text-[#959697] max-w-[720px] mx-auto mt-5 mb-20">
                EduRise selalu memberikan beragam fitur yang berguna untuk
                membantumu dalam meraih beasiswa impian
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
              {/* Feature Card 1 */}
              <div className="w-full max-w-[368px]">
                <div className="bg-[#EBF1FA] rounded-xl p-5 flex flex-col items-center text-center h-[274px] transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md shadow-sm">
                  <div className="w-20 h-20 flex items-center justify-center text-[#3375CC] mb-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-full h-full"
                    >
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-4 text-black">
                    Persiapan, Simulasi, dan Latihan
                  </h3>
                  <p className="text-base text-[#575858] leading-relaxed">
                    Gunakan fitur simulasi dan latihan agar lebih siap untuk
                    memenuhi persyaratan beasiswa impianmu
                  </p>
                </div>
              </div>

              {/* Feature Card 2 */}
              <div className="w-full max-w-[368px]">
                <div className="bg-[#EBF1FA] rounded-xl p-5 flex flex-col items-center text-center h-[274px] transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md shadow-sm">
                  <div className="w-20 h-20 flex items-center justify-center text-[#3375CC] mb-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-full h-full"
                    >
                      <circle cx="12" cy="11" r="1" />
                      <path d="M11 17a1 1 0 0 1 2 0c0 .5-.34 3-.5 4.5a.5.5 0 0 1-1 0c-.16-1.5-.5-4-.5-4.5Z" />
                      <path d="M8 14a5 5 0 1 1 8 0" />
                      <path d="M17 18.5a9 9 0 1 0-10 0" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-4 text-black">
                    Forum Webinar dan Diskusi
                  </h3>
                  <p className="text-base text-[#575858] leading-relaxed">
                    Kami menyediakan forum webinar dan diskusi guna membangun
                    komunitas terbaik seputar edukasi dan informasi
                  </p>
                </div>
              </div>

              {/* Feature Card 3 */}
              <div className="w-full max-w-[368px]">
                <div className="bg-[#EBF1FA] rounded-xl p-5 flex flex-col items-center text-center h-[274px] transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md shadow-sm">
                  <div className="w-20 h-20 flex items-center justify-center text-[#3375CC] mb-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-full h-full"
                    >
                      <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
                      <polyline points="14 2 14 8 20 8" />
                      <path d="m3 15 2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-4 text-black">
                    Review CV Standar Internasional
                  </h3>
                  <p className="text-base text-[#575858] leading-relaxed">
                    Unduh template CV berstandar Internasional dan dapatkan
                    review CV bersama mentor yang ahli di bidangnya
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Showcase Section */}
        <section className="py-24 bg-[#F9FAFB]">
          <div className="max-w-[1440px] mx-auto px-4">
            <div className="text-center mb-5">
              <h2 className="text-[30px] font-semibold text-[#575858] mb-4">
                Raih Beasiswa Kesempatan Lebih Besar
              </h2>
              <p className="text-[18px] text-[#959697] max-w-[720px] mx-auto mb-20">
                EduRise akan selalu membantumu untuk mendapatkan beasiswa yang
                kamu inginkan, dengan berbagai program unggulannya
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-10">
              {/* Program Box 1 */}
              <div className="w-full md:w-1/3 max-w-[300px]">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-[#DDA853] rounded-3xl flex items-center justify-center mb-6 shadow-sm transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md">
                    <img
                      src="/img/eduriselanding/Vector 1.png"
                      alt="Review Mentor Icon"
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-[#344054] mb-4 min-h-[30px]">
                    Review Bersama Mentor
                  </h3>
                  <p className="text-base text-[#667085] mb-6 min-h-[72px]">
                    Review progres pendaftaran beasiswamu bersama mentor
                    professional dibidangnya
                  </p>
                  <a
                    href="#"
                    className="text-[#3375CC] font-semibold inline-flex items-center justify-center transition duration-300 hover:text-blue-700"
                  >
                    <span className="mr-1">Mulai</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Program Box 2 */}
              <div className="w-full md:w-1/3 max-w-[300px]">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-[#DDA853] rounded-3xl flex items-center justify-center mb-6 shadow-sm transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md">
                    <img
                      src="/img/eduriselanding/Vector 2.png"
                      alt="Edukasi dan Tips Icon"
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-[#344054] mb-4 min-h-[30px]">
                    Edukasi dan Tips
                  </h3>
                  <p className="text-base text-[#667085] mb-6 min-h-[72px]">
                    Pelajari edukasi dan tips seputar beasiswa, memperbesar
                    peluangmu diterima beasiswa
                  </p>
                  <a
                    href="#"
                    className="text-[#3375CC] font-semibold inline-flex items-center justify-center transition duration-300 hover:text-blue-700"
                  >
                    <span className="mr-1">Mulai</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Program Box 3 */}
              <div className="w-full md:w-1/3 max-w-[300px]">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-[#DDA853] rounded-3xl flex items-center justify-center mb-6 shadow-sm transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md">
                    <img
                      src="/img/eduriselanding/Vector 3.png"
                      alt="Informasi Beasiswa Icon"
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-[#344054] mb-4 truncate max-w-full">
                    Beasiswa Terupdate
                  </h3>
                  <p className="text-base text-[#667085] mb-6 min-h-[72px]">
                    Kami berusaha untuk selalu memberikan informasi beasiswa
                    terupdate dari sumber faktual
                  </p>
                  <a
                    href="#"
                    className="text-[#3375CC] font-semibold inline-flex items-center justify-center transition duration-300 hover:text-blue-700"
                  >
                    <span className="mr-1">Mulai</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="w-full max-w-screen-2xl mx-auto px-4">
            <div className="text-center mb-5">
              <h2 className="text-[30px] font-semibold text-[#575858] mb-4">
                Dengarkan Pengalaman Alumni EduRise dalam Mencapai Impian Mereka
              </h2>
              <p className="text-[18px] text-[#959697] max-w-[720px] mx-auto mb-20">
                Alumni EduRise telah merasakan sendiri, bahwa kami telah
                membantu untuk memperbesar kesempatan mereka untuk menerima
                beasiswa yang sesuai
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {/* Testimonial Card 1 */}
              <div className="w-full max-w-[416px]">
                <div className="bg-[#FCF6EE] rounded-lg p-8 flex flex-col h-[274px] relative shadow-sm">
                  <div className="flex items-center gap-1 text-[#DDA853] mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="none"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    ))}
                  </div>
                  <p className="text-base leading-relaxed text-[#575858] mb-6 flex-grow overflow-hidden">
                    "Perfect site untuk mencari beasiswa di seluruh Indonesia,
                    dan memperbesar chance lolos beasiswa bersama mentor."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden">
                      <img
                        src="/img/eduriselanding/Avatar Image 1.png"
                        alt="Abdul Rahman"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-base font-semibold text-black mb-1">
                        Abdul Rahman
                      </h4>
                      <p className="text-sm text-[#667085]">
                        Atlet Profesional
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial Card 2 */}
              <div className="w-full max-w-[416px]">
                <div className="bg-[#FCF6EE] rounded-lg p-8 flex flex-col h-[274px] relative shadow-sm">
                  <div className="flex items-center gap-1 text-[#DDA853] mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="none"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    ))}
                  </div>
                  <p className="text-base leading-relaxed text-[#575858] mb-6 flex-grow overflow-hidden">
                    "Bener-bener bantu banget buat yang lagi hunting beasiswa.
                    Fiturnya lengkap, dari informasi sampai persiapan apply!"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden">
                      <img
                        src="/img/eduriselanding/Avatar Image 2.png"
                        alt="Anita Wulandari"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-base font-semibold text-black mb-1">
                        Anita Wulandari
                      </h4>
                      <p className="text-sm text-[#667085]">Designer</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial Card 3 */}
              <div className="w-full max-w-[416px]">
                <div className="bg-[#FCF6EE] rounded-lg p-8 flex flex-col h-[274px] relative shadow-sm">
                  <div className="flex items-center gap-1 text-[#DDA853] mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="none"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    ))}
                  </div>
                  <p className="text-base leading-relaxed text-[#575858] mb-6 flex-grow overflow-hidden">
                    "EduRise jadi andalan aku buat nyari info beasiswa dan ikut
                    webinar persiapan. Ngebantu banget ningkatin peluang lolos!"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden">
                      <img
                        src="/img/eduriselanding/Avatar Image 3.png"
                        alt="Amanda Zahra"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-base font-semibold text-black mb-1">
                        Amanda Zahra
                      </h4>
                      <p className="text-sm text-[#667085]">Presenter</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default LandingBefore;
