import { useState, useEffect } from "react"; // Tambahkan useEffect
import Button from "./ButtonProfile";
import axios from "axios"; // Import axios

// URL dasar backend (sesuaikan dengan port backend Anda)
const API_BASE_URL = "http://localhost:5000";

const CareerGoals = () => {
  const [isEditing, setIsEditing] = useState(false); // Default false, mulai dalam mode lihat
  const [careerGoals, setCareerGoals] = useState({
    field: "", // Akan disesuaikan dengan minat_bidang dari BE
    shortTermPlan: "", // Akan disesuaikan dengan rencana dari BE
    motivation: "", // Akan disesuaikan dengan motivator_karir dari BE
  });
  const [loading, setLoading] = useState(true); // State untuk loading
  const [error, setError] = useState(null); // State untuk error

  const bidangOptions = [
    "Teknologi Informasi & Digital",
    "Bisnis & Manajemen",
    "Kreatif & Media",
    "Kesehatan & Sosial",
    "Pendidikan & Penelitian",
    "Lingkungan & Sosial",
    // Tambahkan bidang lain sesuai kebutuhan
  ];

  // --- START: Fetch data from BE on component mount ---
  useEffect(() => {
    fetchCareerGoals();
  }, []);

  const fetchCareerGoals = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/profile`, {
        withCredentials: true, // Penting untuk mengirim cookie sesi
      });
      const userData = response.data;
      setCareerGoals({
        field: userData.minat_bidang || "",
        shortTermPlan: userData.rencana || "",
        motivation: userData.motivator_karir || "",
      });
      setIsEditing(false); // Setelah berhasil fetch, set ke mode lihat
    } catch (err) {
      console.error("Error fetching career goals:", err);
      setError(err);
      // Jika terjadi error (misal: user belum mengisi data), biarkan form kosong
      setCareerGoals({
        field: "",
        shortTermPlan: "",
        motivation: "",
      });
    } finally {
      setLoading(false);
    }
  };
  // --- END: Fetch data from BE on component mount ---

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      // Sesuaikan nama field dengan yang diharapkan oleh BE
      const payload = {
        minat_bidang: careerGoals.field,
        rencana: careerGoals.shortTermPlan,
        motivator_karir: careerGoals.motivation,
      };

      await axios.patch(`${API_BASE_URL}/profile`, payload, {
        withCredentials: true, // Penting untuk otentikasi
      });
      alert("Tujuan karier berhasil disimpan!");
      setIsEditing(false); // Kembali ke mode lihat setelah berhasil menyimpan
      fetchCareerGoals(); // Muat ulang data untuk memastikan sinkronisasi
    } catch (err) {
      console.error("Error saving career goals:", err);
      alert("Gagal menyimpan tujuan karier: " + (err.response?.data?.msg || err.message));
      // Jika gagal, mungkin tetap di mode edit atau berikan feedback yang jelas
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCareerGoals((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Kelas CSS untuk input field dan select dalam mode edit
  const inputClass =
    "flex-1 text-xs font-normal font-poppins text-black border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#3375cc] h-8";

  // Kelas CSS untuk teks tampilan dalam mode non-edit (untuk select dan input non-textarea)
  const viewClass =
    "flex-1 text-xs font-normal font-poppins text-black border border-gray-300 rounded-md px-3 py-1.5 bg-gray-100 min-h-8 flex items-center";

  // Kelas khusus untuk textarea di mode edit
  const textareaClass =
    "flex-1 text-xs font-normal font-poppins text-black border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#3375cc] min-h-[3.5rem] resize-none overflow-auto";
  // Kelas khusus untuk textarea di mode tampilan
  const textareaViewClass =
    "flex-1 text-xs font-normal font-poppins text-black border border-gray-300 rounded-md px-3 py-1.5 bg-gray-100 min-h-[3.5rem] overflow-auto whitespace-pre-wrap";

  if (loading) {
    return (
      <div className="bg-white rounded-[15px] p-6 mb-5 shadow text-center text-gray-600">
        Memuat tujuan karier...
      </div>
    );
  }

  if (error && !careerGoals.field && !careerGoals.shortTermPlan && !careerGoals.motivation) {
    // Tampilkan pesan error hanya jika data belum ada sama sekali
    return (
      <div className="bg-white rounded-[15px] p-6 mb-5 shadow text-center text-red-500">
        Terjadi kesalahan saat memuat tujuan karier: {error.message}
        <Button
          onClick={fetchCareerGoals}
          className="mt-4 bg-blue-500 text-white font-bold py-1.5 px-4 rounded-lg"
        >
          Coba Lagi
        </Button>
      </div>
    );
  }


  return (
    <div className="bg-white rounded-[15px] p-6 mb-5 shadow">
      <h2 className="text-2xl font-semibold font-poppins text-[#17355c] mb-6">
        Tujuan Karier
      </h2>

      <div className="space-y-4">
        {/* Bidang yang Diminati */}
        <div className="flex items-start gap-4">
          <p className="w-40 text-xs font-normal font-poppins text-black">
            Bidang yang Diminati :
          </p>
          {isEditing ? (
            <select
              name="field" // Nama state di FE
              value={careerGoals.field}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">-- Pilih Bidang --</option>
              {bidangOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <p className={viewClass}>
              {careerGoals.field || (
                <span className="text-gray-400 italic">Belum diisi</span>
              )}
            </p>
          )}
        </div>

        {/* Rencana Jangka Pendek */}
        <div className="flex items-start gap-4">
          <p className="w-40 text-xs font-normal font-poppins text-black">
            Rencana Jangka Pendek :
          </p>
          {isEditing ? (
            <textarea
              name="shortTermPlan" // Nama state di FE
              value={careerGoals.shortTermPlan}
              onChange={handleChange}
              className={textareaClass}
              placeholder="Jelaskan rencana karir jangka pendek Anda (1-3 tahun)"
            />
          ) : (
            <p className={textareaViewClass}>
              {careerGoals.shortTermPlan || (
                <span className="text-gray-400 italic">Belum diisi</span>
              )}
            </p>
          )}
        </div>

        {/* Motivasi */}
        <div className="flex items-start gap-4">
          <p className="w-40 text-xs font-normal font-poppins text-black">
            Motivasi Tujuan Karir :
          </p>
          {isEditing ? (
            <textarea
              name="motivation" // Nama state di FE
              value={careerGoals.motivation}
              onChange={handleChange}
              className={textareaClass}
              placeholder="Apa yang memotivasi Anda mencapai tujuan karir ini?"
            />
          ) : (
            <p className={textareaViewClass}>
              {careerGoals.motivation || (
                <span className="text-gray-400 italic">Belum diisi</span>
              )}
            </p>
          )}
        </div>
      </div>

      <div
        className={`flex mt-6 ${isEditing ? "justify-center" : "justify-end"}`}
      >
        {isEditing ? (
          <Button
            onClick={handleSave}
            className="bg-[#0BAB5E] text-white font-bold py-1.5 px-4 rounded-lg"
          >
            Simpan
          </Button>
        ) : (
          <Button
            onClick={handleEdit}
            className="bg-[#3375cc] text-white font-bold py-1.5 px-4 rounded-lg"
          >
            Edit
          </Button>
        )}
      </div>
    </div>
  );
};

export default CareerGoals;