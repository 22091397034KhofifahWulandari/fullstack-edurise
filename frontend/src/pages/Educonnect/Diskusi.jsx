import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "axios";

const Diskusi = () => {
  const [diskusis, setDiskusis] = useState([]);

  useEffect(() => {
    getDiskusis();
  }, []);

  const getDiskusis = async () => {
    try {
      const response = await axios.get("http://localhost:5000/diskusi"); // Sesuaikan URL API backend kamu
      // MAP DISKUSIPROFILE UNTUK MEMBUAT URL LENGKAP
      const mappedDiskusis = response.data.map(item => ({
        ...item,
        diskusiPicture: item.diskusiPicture ? `http://localhost:5000${item.diskusiPicture}` : null, // <-- Perbaikan di sini
        // Pastikan creator.name ada, gunakan optional chaining jika diperlukan
        creatorName: item.creator?.name || 'Unknown User', // Tambahkan ini jika Anda menggunakan creator.name
        // Mapping untuk keahlian agar sesuai dengan tampilan
        keahlian: item.keahlian || 'General' // Default jika keahlian tidak ada
      }));
      setDiskusis(mappedDiskusis);
    } catch (error) {
      console.error("Error fetching diskusis:", error);
      // Handle error, misalnya tampilkan pesan ke user
    }
  };

  const formatTimeAgo = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;
    const years = Math.floor(months / 12);
    return `${years}y ago`;
  };

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
                <h2 className="text-gray-600 font-medium text-base m-0">Forum</h2>
              </Link>
            </div>

            <div className="flex w-full justify-center items-center pr-5 border-r-blue-400 border-r-[3px] ml-[2.8px] z-20">
              <Link
                to="/diskusi"
                className="w-full bg-white flex flex-row items-center gap-3 p-4 rounded-xl shadow-sm no-underline"
              >
                <img src="/img/educonnect/message-circle-blue.svg" alt="Discuss" />
                <h2 className="text-blue-400 font-medium text-base m-0">
                  Discuss Group
                </h2>
              </Link>
            </div>

            <div className="flex justify-center items-center pr-5 ml-[2.8px]">
              <Link
                to="/mentoring"
                className="w-full bg-white flex flex-row items-center gap-3 p-4 rounded-xl shadow-sm no-underline"
              >
                <img src="/img/educonnect/briefcase.svg" alt="Mentoring" />
                <h2 className="text-gray-600 font-medium text-base m-0">Mentoring</h2>
              </Link>
            </div>
          </div>

          {/* Konten Diskusi */}
          <div className="flex flex-col pl-5 gap-4 w-[80%] border-l-[3px] h-full">
            {/* List Diskusi */}
            <div className="flex flex-col gap-4 mt-20">
              {diskusis.length > 0 ? (
                diskusis.map((diskusi) => (
                  <div key={diskusi.uuid} className="w-full p-8 bg-white flex flex-col rounded-xl shadow-sm">
                    <h1 className="text-2xl font-semibold mb-3">{diskusi.judul}</h1>
                    <div className="w-full flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="relative flex items-center justify-center p-[12px]">
                          <div className="flex items-center justify-center overflow-hidden rounded-lg h-16 w-16">
                            {/* Gunakan diskusi.diskusiPicture jika ada, jika tidak pakai default */}
                            <img
                              // Pastikan URL gambar lengkap di sini, sudah di-map di getDiskusis
                              src={diskusi.diskusiPicture || "/img/default-user-profile.jpg"} // <-- Tambahkan default jika tidak ada gambar
                              alt="User"
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
                          {/* Gunakan creatorName yang sudah di-map, atau gunakan optional chaining */}
                          <h4 className="text-base font-semibold m-0">{diskusi.creatorName}</h4>
                          <p className="text-sm text-gray-400 m-0">{formatTimeAgo(diskusi.createdAt)}</p>
                        </div>
                      </div>
                      <div className="px-3 py-2 text-sm bg-yellow-100 text-yellow-400 border-2 border-yellow-400 rounded-lg">
                        {diskusi.keahlian}
                      </div>
                    </div>

                    <p className="w-full text-base text-gray-500 mt-10 break-words">
                      {diskusi.deskripsi}
                    </p>

                    <div className="flex flex-row items-center mt-4 gap-3">
                      {diskusi.link && (
                        <a
                          href={diskusi.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="no-underline flex flex-row items-center justify-center p-3 bg-blue-500 hover:bg-blue-600 gap-2 text-white rounded-xl"
                        >
                          <img src="/img/educonnect/plus-circle.svg" alt="" />
                          Join Diskusi
                        </a>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p>Belum ada diskusi yang tersedia.</p>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Diskusi;