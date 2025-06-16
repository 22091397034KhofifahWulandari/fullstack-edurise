import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Navbar";
import Footer from "../../components/Footer";

// URL dasar API Anda
const API_BASE_URL = "http://localhost:5000";

const Mentoring = () => {
  const [mentorings, setMentorings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMentorings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/mentoring`);
      setMentorings(response.data);
    } catch (err) {
      console.error("Gagal mengambil data mentoring:", err);
      setError("Gagal memuat sesi mentoring. Silakan coba lagi nanti.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fungsi untuk bergabung dengan mentoring DAN mengarahkan ke link
  const handleJoinMentoring = async (uuid, mentoringLink) => {
    try {
      // Opsi 1: Hanya panggil API jika Anda perlu mencatat bahwa user mengklik "Join"
      // atau ada logika lain di backend yang harus dijalankan (misalnya, update jumlah peserta).
      // Jika tidak ada logika backend yang perlu dijalankan, Anda bisa menghapus panggilan API ini.
      await axios.post(
        `${API_BASE_URL}/mentoring/${uuid}/join`
        // Jika perlu otentikasi: { headers: { Authorization: `Bearer ${token}` } }
      );

      // Setelah berhasil memanggil API (jika ada), arahkan user ke link
      if (mentoringLink) {
        window.open(mentoringLink, "_blank"); // Buka link di tab baru
        // Opsional: Jika Anda ingin memperbarui UI setelah bergabung (misalnya, status jadi 'Penuh'),
        // panggil fetchMentorings(); di sini.
        // fetchMentorings();
      } else {
        alert("Link mentoring tidak tersedia.");
      }
    } catch (err) {
      console.error("Gagal melakukan aksi join mentoring:", err);
      const errorMessage =
        err.response && err.response.data && err.response.data.msg
          ? err.response.data.msg
          : "Terjadi kesalahan saat bergabung.";
      alert(errorMessage);
    }
  };

  useEffect(() => {
    fetchMentorings();
  }, [fetchMentorings]);

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="bg-[#F9F9F9] text-black h-screen flex justify-center items-center">
          <p>Memuat data mentoring...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="bg-[#F9F9F9] text-black h-screen flex justify-center items-center">
          <p className="text-red-500">{error}</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-[#F9F9F9] text-black">
        <section className="w-full px-32 pb-10 flex justify-center">
          {/* Sidebar */}
          <div className="flex flex-col gap-4 w-[20%] mt-16">
            <div className="flex justify-center items-center pr-5 ml-[2.8px]">
              <Link
                to="/forum"
                className="w-full bg-white flex flex-row items-center gap-3 p-4 rounded-xl shadow-sm no-underline"
              >
                <img src="/img/educonnect/calendar.svg" alt="Forum" />
                <h2 className="text-gray-600 font-medium text-base m-0">
                  Forum
                </h2>
              </Link>
            </div>

            <div className="flex justify-center items-center pr-5 ml-[2.8px]">
              <Link
                to="/diskusi"
                className="w-full bg-white flex flex-row items-center gap-3 p-4 rounded-xl shadow-sm no-underline"
              >
                <img src="/img/educonnect/message-circle.svg" alt="Discuss" />
                <h2 className="text-gray-600 font-medium text-base m-0">
                  Discuss Group
                </h2>
              </Link>
            </div>

            <div className="flex w-full justify-center items-center pr-5 border-r-blue-400 border-r-[3px] ml-[2.8px] z-20">
              <Link
                to="/mentoring"
                className="w-full bg-white flex flex-row items-center gap-3 p-4 rounded-xl shadow-sm no-underline"
              >
                <img src="/img/educonnect/briefcase-blue.svg" alt="Mentoring" />
                <h2 className="text-blue-400 font-medium text-base m-0">
                  Mentoring
                </h2>
              </Link>
            </div>
          </div>

          {/* Konten Mentoring */}
          <div className="flex flex-col pl-5 gap-4 w-[80%] border-l-[3px] border-gray-200 h-full">
            <div className="flex flex-col gap-4 mt-20">
              {mentorings.length > 0 ? (
                mentorings.map((mentoring) => (
                  <div
                    key={mentoring.uuid}
                    className="w-full p-8 bg-white flex flex-col rounded-xl shadow-sm"
                  >
                    <h1 className="text-2xl font-semibold mb-3">
                      {mentoring.judul}
                    </h1>
                    <div className="w-full flex flex-row justify-between items-center">
                      <div className="flex flex-row justify-center items-center">
                        <div className="relative flex items-center justify-center p-[12px]">
                          <div className="flex items-center justify-center overflow-hidden rounded-lg h-16 w-16">
                            <img
                              src={
                                mentoring.fotoMentor}
                              alt="Mentor"
                              className="object-cover object-top h-full w-full"
                            />
                          </div>
                          <div className="absolute flex p-1 items-center justify-center left-0 bottom-0 bg-slate-700 rounded-lg">
                            <img
                              src="/img/educonnect/graduation.svg"
                              alt="Status"
                              className="h-5"
                            />
                          </div>
                        </div>

                        <div>
                          <h4 className="text-base font-semibold m-0">
                            {mentoring.namaMentor}
                          </h4>
                          <p className="text-sm text-gray-400 m-0">
                            Mentor - {mentoring.keahlianMentor}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-row items-center gap-3">
                        {mentoring.statusMentoring === "Penuh" ? (
                          <div className="flex flex-row px-3 py-2 h-fit justify-center text-sm items-center bg-red-200 text-red-500 border-2 font-medium border-red-500 rounded-lg">
                            Penuh
                          </div>
                        ) : (
                          <div className="flex flex-row px-3 py-2 h-fit justify-center text-sm items-center bg-green-200 text-green-500 border-2 font-medium border-green-500 rounded-lg">
                            Tersedia
                          </div>
                        )}

                        <div className="flex flex-row px-3 py-2 h-fit justify-center text-sm items-center bg-blue-200 text-blue-500 border-2 font-medium border-blue-500 rounded-lg">
                          {mentoring.kategoriMentoring}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center flex-row gap-3 text-xl mt-7">
                      <img
                        src="/img/educonnect/peserta.svg"
                        alt="Peserta"
                        className="h-6"
                      />
                      {mentoring.jumlahPeserta} Peserta
                    </div>

                    <p className="w-full text-base text-gray-500 mt-3 break-words whitespace-pre-line">
                      {mentoring.deskripsi}
                    </p>

                    <div className="flex items-center mt-4 gap-3">
                      {mentoring.statusMentoring !== "Penuh" ? (
                        <button
                          // Mengirimkan UUID dan link ke fungsi handleJoinMentoring
                          onClick={() => handleJoinMentoring(mentoring.uuid, mentoring.link)}
                          className="no-underline flex flex-row items-center justify-center p-3 bg-blue-500 hover:bg-blue-600 gap-2 text-white rounded-xl"
                        >
                          <img src="/img/educonnect/plus-circle.svg" alt="Join" />
                          Join Mentoring
                        </button>
                      ) : (
                        <button
                          disabled
                          className="no-underline flex flex-row items-center justify-center p-3 bg-gray-400 text-white rounded-xl cursor-not-allowed"
                        >
                          <img src="/img/educonnect/plus-circle.svg" alt="Join" />
                          Mentoring Penuh
                        </button>
                      )}
                      <div className="flex items-center gap-2 text-gray-500">
                        <img src="/img/educonnect/check.svg" alt="Created" />
                        <span className="text-sm">
                          Dibuat oleh:{" "}
                          {mentoring.creator ? mentoring.creator.name : "Admin"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Belum ada sesi mentoring yang tersedia saat ini.</p>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Mentoring;