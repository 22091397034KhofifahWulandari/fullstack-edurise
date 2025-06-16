import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import posterWeb from "/img/eduacademy/posterweb.png"; // Ini akan tetap digunakan sebagai fallback atau jika Anda memiliki logika gambar default
import WebinarCard from "./WebinarCard";

const FeaturedWebinar = () => {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        // Panggil endpoint getWebinarsByCategoryLimit karena ini lebih cocok
        // untuk menampilkan webinar unggulan (biasanya yang upcoming)
        // Pastikan URL API Anda sudah benar
        const response = await axios.get("http://localhost:5000/webinars");
        setWebinars(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching webinars:", err);
        setError("Gagal memuat webinar. Silakan coba lagi nanti.");
        setLoading(false);
      }
    };

    fetchWebinars();
  }, []); // Array dependensi kosong agar useEffect hanya berjalan sekali saat komponen di-mount

  if (loading) {
    return (
      <section id="more2" className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p>Memuat webinar...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section id="more2" className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  if (webinars.length === 0) {
    return (
      <section id="more2" className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-center text-3xl font-bold mb-2">
          <span className="text-[#1F467A]">Featured</span>{" "}
          <span className="text-[#DDA853]">webinar</span>
        </h2>
        <p className="text-center text-lg text-gray-500 font-semiregular mb-3">
          Belajar langsung dari para ahli dan alumni penerima <br />{" "}
          <span>beasiswa!</span>
        </p>
        <p>Tidak ada webinar mendatang yang tersedia saat ini.</p>
      </section>
    );
  }

  return (
    <section id="more2" className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-center text-3xl font-bold mb-2">
        <span className="text-[#1F467A]">Featured</span>{" "}
        <span className="text-[#DDA853]">webinar</span>
      </h2>
      <p className="text-center text-lg text-gray-500 font-semiregular mb-3">
        Belajar langsung dari para ahli dan alumni penerima <br />{" "}
        <span>beasiswa!</span>
      </p>
      <br /> <br /> <br />
      {/* Grid start */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-6">
        {webinars.map((webinar) => (
          // Sesuaikan prop yang dilewatkan ke WebinarCard
          // agar sesuai dengan data dari BE
          <WebinarCard
            key={webinar.uuid} // Gunakan uuid sebagai key yang unik
            webinar={{
              id: webinar.uuid, // Anda bisa tetap menggunakan id atau uuid sebagai id internal
              image: webinar.gambar, // Gunakan gambar dari BE, atau fallback ke posterWeb
              date: new Date(webinar.tanggal_pelaksanaan).toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              }), // Format tanggal
              time: webinar.jam_pelaksanaan,
              title: webinar.judul,
              speaker: webinar.narasumber,
              // Tambahkan properti lain yang mungkin dibutuhkan oleh WebinarCard jika ada
              // seperti link, deskripsi, dll.
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedWebinar;