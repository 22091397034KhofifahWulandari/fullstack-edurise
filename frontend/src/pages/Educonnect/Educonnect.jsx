import Header from "../../components/Navbar";
import Footer from "../../components/Footer";

const Educonnect = () => {
  const mentors = [
    { nama: "Rizky Maulana", keahlian: "Web Development" },
    { nama: "Tasya Mardiana", keahlian: "Digital Marketing" },
    { nama: "Dimas Prasetyo", keahlian: "Cyber Security" },
    { nama: "Rani Oktaviani", keahlian: "Data Science" },
    { nama: "Intan Permata", keahlian: "UI/UX Design" },
    { nama: "Nadia Aulia", keahlian: "Graphic Design" },
  ];
  return (
    <>
      <Header />
      <div className="bg-[#F9F9F9] text-black font-poppins">
        {/* Hero Section */}
        <section className="bg-blue-950 w-full md:px-32 pt-16 pb-60 md:pb-24 px-8 relative mb-40">
          <div className="w-full flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:w-[35rem] md:-mt-14 -mt-10">
              <h1 className="text-white font-semibold text-3xl md:text-5xl md:leading-snug mb-3 md:mb-2">
                Temukan Komunitas, Bangun Koneksi, <br />
                Raih Peluang
              </h1>
              <h2 className="text-white text-base">
                EduConnect adalah ruang digital bagi mahasiswa dan pencari
                beasiswa untuk terhubung, belajar, dan berkembang bersama.
              </h2>
              <a
                href="#forum" hidden
                className="mt-10 md:mt-12 bg-blue-500 hover:bg-blue-600 px-10 text-center py-3 md:py-2 text-base rounded-lg font-bold text-white md:w-fit w-full"
              >
                Get Started
              </a>
            </div>
            <img
              src="/img/educonnect/model_landing.png"
              alt="Landing Visual"
              className="w-[30rem] md:w-[32rem] md:m-0 m-[3rem]"
            />
          </div>
        </section>

        {/* Stats Section */}
        <div className="w-full px-8 md:px-32 absolute top-[calc(100%-0rem)] md:top-[calc(100%-9rem)] left-0 right-0 z-10">
          <div
            className="flex flex-col md:flex-row justify-between h-full gap-5 md:gap-0 bg-white px-12 py-10 rounded-3xl"
            style={{ boxShadow: "0 0 6px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="flex flex-col items-center md:items-start text-center md:text-start">
              <div className="bg-blue-500 rounded-full p-2 w-fit">
                <img src="/img/educonnect/user.svg" alt="" />
              </div>
              <h1 className="text-2xl mt-4 font-semibold">10K Total Mentor</h1>
              <h2 className="text-sm text-gray-400 mt-2">
                Satu Langkah Lebih Dekat dengan
                <span className="hidden sm:inline">
                  <br />
                </span>
                <span className="inline sm:hidden"> </span>
                Mentor Impianmu
              </h2>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div className="bg-blue-500 rounded-full p-2 w-fit">
                <img src="/img/educonnect/message-square.svg" alt="" />
              </div>
              <h1 className="text-2xl mt-4 font-semibold">10K Total Mentor</h1>
              <h2 className="text-sm text-gray-400 mt-2">
                Setiap Forum, Peluang Baru untuk
                <span className="hidden sm:inline">
                  <br />
                </span>
                <span className="inline sm:hidden"> </span>
                Berkembang
              </h2>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div className="bg-blue-500 rounded-full p-2 w-fit">
                <img src="/img/educonnect/users.svg" alt="" />
              </div>
              <h1 className="text-2xl mt-4 font-semibold">10K Total Mentor</h1>
              <h2 className="text-sm text-gray-400 mt-2">
                Belajar Bareng Komunitas Mahasiswa
                <span className="hidden sm:inline">
                  <br />
                </span>
                <span className="inline sm:hidden"> </span>
                dari Seluruh Indonesia
              </h2>
            </div>
          </div>
        </div>

        {/* Join Forum Section */}
        <section id="forum" className="md:w-full px-10 md:px-32 pb-10 pt-24 mt-72 md:mt-32 flex justify-center items-center">
          <div className="flex flex-col md:flex-row justify-between w-full items-center">
            <img
              src="/img/educonnect/model-forum.png"
              alt=""
              className="rounded-[2rem]"
              style={{ boxShadow: "0 0 6px rgba(0, 0, 0, 0.3)" }}
            />
            <div className="flex flex-col w-full md:w-[35rem] mt-10 md:mt-0">
              <h1 className="font-semibold md:text-5xl md:leading-snug mb-2 text-3xl">
                Belajar Lebih Seru Saat Kita Terhubung
              </h1>
              <h2 className="text-gray-400 text-base">
                Bergabunglah dalam komunitas pembelajar! Diskusi seputar materi
                pelajaran, tugas, kuliah, hingga tips karier tersedia di Forum
                EduConnect.
              </h2>
              <div className="flex flex-col md:flex-row justify-between mt-6 md:gap-0 gap-3">
                <div className="flex flex-row gap-2 items-center">
                  <img src="/img/educonnect/check.svg" alt="" />
                  <h3 className="text-base text-gray-400">Teman Belajar</h3>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <img src="/img/educonnect/check.svg" alt="" />
                  <h3 className="text-base text-gray-400">Mentor</h3>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <img src="/img/educonnect/check.svg" alt="" />
                  <h3 className="text-base text-gray-400">Pencarian Peluang</h3>
                </div>
              </div>
              <a
                href="/forum"
                className="mt-12 bg-blue-500 hover:bg-blue-600 px-10 text-center py-3 md:py-2 text-base rounded-lg font-bold text-white w-full md:w-fit"
              >
                Join Forum
              </a>
            </div>
          </div>
        </section>

        {/* Join Diskusi */}
        <section className="flex flex-col w-full px-8 md:px-32 py-10 mt-14 md:mt-20 items-center">
          <h1 className="font-semibold text-3xl leading-snug mb-2 text-center">
            Cari Jawaban, Bangun Koneksi,
            <span className="hidden sm:inline">
              <br />
            </span>
            <span className="inline sm:hidden"> </span>
            dan Tumbuh Bersama!
          </h1>

          <h2 className="text-gray-400 text-base text-center">
            Temukan teman belajar, mentor, dan jaringan baru yang siap
            <span className="hidden sm:inline">
              <br />
            </span>
            <span className="inline sm:hidden"> </span>
            membantu kamu mencapai tujuan pendidikan dan profesi.
          </h2>

          <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-10 mt-8 text-center">
            {[
              {
                img: "/img/educonnect/minat.svg",
                title: "Minat",
                desc: "Grup Berdasarkan Minat",
              },
              {
                img: "/img/educonnect/komunitas.svg",
                title: "Komunitas",
                desc: "Belajar bareng teman satu tujuan",
              },
              {
                img: "/img/educonnect/mentor.svg",
                title: "Mentor",
                desc: "Dipandu oleh alumni dan profesional",
              },
              {
                img: "/img/educonnect/topik.svg",
                title: "Topik",
                desc: "Diskusi terstruktur sesuai kebutuhan",
              },
              {
                img: "/img/educonnect/terjadwal.svg",
                title: "Terjadwal",
                desc: "Diskusi mingguan atau sesi khusus",
              },
              {
                img: "/img/educonnect/notifikasi.svg",
                title: "Notifikasi",
                desc: "Update langsung ke pengguna",
              },
              {
                img: "/img/educonnect/fleksibel.svg",
                title: "Fleksibel",
                desc: "Akses mudah dari mana saja",
              },
              {
                img: "/img/educonnect/tujuan.svg",
                title: "Tujuan",
                desc: "Capai hasil nyata bersama grup belajar terarah.",
              },
            ].map(({ img, title, desc }, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-md"
                style={{ boxShadow: "4px 4px 6px rgba(0, 0, 0, 0.05)" }}
              >
                <img src={img} alt={title} />
                <h1 className="text-xl font-semibold mt-3">{title}</h1>
                <h2 className="text-base text-gray-400 mt-2">{desc}</h2>
              </div>
            ))}
          </div>

          <a
            href="/diskusi"
            className="mt-12 bg-blue-500 hover:bg-blue-600 px-10 text-center py-3 md:py-2 text-base rounded-lg font-bold text-white w-fit"
          >
            Diskusi Sekarang
          </a>
        </section>

        {/* Gabung dengan mentor */}
        <section className="flex flex-col w-full py-10 mt-20 px-8 md:px-0 items-center ">
          <h1 className="font-semibold text-3xl leading-snug mb-2 text-center">
            Terhubung dengan mentor & teman seperjuangan.
          </h1>
          <h2 className="text-gray-400 text-base text-center">
            Bergabung dengan Mentor Berpengalaman dan Komunitas Pembelajar.
          </h2>

          <div className="w-full overflow-x-auto px-8 md:px-32 hide-scroll mt-16">
            <div className="flex space-x-6 min-w-max pb-4">
              {mentors.map((mentor, i) => (
                <div key={i} className="flex flex-col w-[23rem] flex-shrink-0">
                  <img
                    src={`/img/educonnect/mentor${i + 1}.png`}
                    alt={`Mentor ${i + 1}`}
                    className="rounded-[2rem] w-full object-cover shadow-md"
                  />
                  <h1 className="mt-5 text-center font-semibold text-xl">
                    {mentor.nama}
                  </h1>
                  <h1 className="text-center text-gray-400 text-base">
                    {mentor.keahlian}
                  </h1>
                </div>
              ))}
            </div>
          </div>

          <a
            href="/mentoring"
            className="mt-12 bg-blue-500 hover:bg-blue-600 px-10 text-center py-3 md:py-2 text-base rounded-lg font-bold text-white w-fit"
          >
            Gabung dengan Mentor
          </a>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Educonnect;