import { useState } from "react";

const PopupFilter = ({ show, onClose, onFilter }) => {
  const [formData, setFormData] = useState({
    kategori: "",
    jenjang: "",
    lokasi: "",
    deadline: "", // Initial state can be empty for no filter
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the formData to the parent component's onFilter function
    onFilter(formData);
    onClose();
  };

  if (!show) return null;

  return (
    <div
      className="popup-overlay fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target.classList.contains("popup-overlay")) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">
          Rekomendasi berdasarkan filter
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Kategori</label>
            <select
              name="kategori"
              value={formData.kategori}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Pilih Kategori</option>
              {/* Ini sudah sesuai dengan enum di DB */}
              <option value="Beasiswa">Beasiswa</option>
              <option value="Pelatihan">Pelatihan</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Jenjang Pendidikan
            </label>
            <select
              name="jenjang"
              value={formData.jenjang}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Pilih Jenjang</option>
              {/* INI PERBAIKAN: SESUAIKAN DENGAN ENUM 'D4/S1' DI DATABASE */}
              <option value="D3">D3</option>
              <option value="S1/D4">S1/D4</option> {/* Disesuaikan */}
              <option value="S2">S2</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Lokasi</label>
            <select
              name="lokasi"
              value={formData.lokasi}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Pilih Lokasi</option>
              {/* PENTING: Tambahkan semua lokasi yang ada di DB Anda */}
              {/* Idealnya, ini diambil secara dinamis dari backend */}
              <option value="DKI Jakarta">DKI Jakarta</option>
              <option value="Jawa Barat">Jawa Barat</option>
              <option value="Jawa Timur">Jawa Timur</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Deadline</label>
            <select
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Pilih Deadline</option>
              {/* Ini mengasumsikan Anda ingin memfilter berdasarkan tanggal *spesifik* akhir bulan.
                  Ini adalah cara yang paling sederhana untuk mencocokkan string tanggal.
                  Jika di database ada tanggal lain (misal 2025-09-15), filter ini tidak akan cocok.
                  Untuk filter tanggal yang lebih fleksibel (misal "semua di September 2025"),
                  Anda butuh logika perbandingan tanggal di ScholarshipHub.jsx (seperti yang saya
                  contohkan dalam komentar di `useEffect` di ScholarshipHub sebelumnya).
              */}
              <option value="September 2025">September 2025</option>
              <option value="Oktober 2025">Oktober 2025</option>
              {/* Tambahkan opsi lain untuk bulan/tanggal deadline lainnya jika ada */}
            </select>
          </div>

          <div className="flex justify-center gap-4">
            <button
              type="submit"
              className="w-56 bg-[#3375CC] hover:bg-[#295ea3] text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Cari Rekomendasi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupFilter;