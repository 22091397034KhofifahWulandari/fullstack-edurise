import { useState, useEffect } from "react";
import Button from "./ButtonProfile";
import axios from "axios"; // Import axios

// URL dasar backend (sesuaikan dengan port backend Anda)
const API_BASE_URL = "http://localhost:5000";

// --- START: Definisi PortfolioCard ---
const PortfolioCard = ({ title, description, fileName, onViewDetail, fileUrl }) => {
  return (
    <div className="bg-white rounded-2xl p-4 w-[253px] flex flex-col shadow-md">
      <div className="h-[96px] mb-2 flex items-center justify-center border bg-gray-50 text-center text-xs text-gray-500 overflow-hidden">
        {fileName ? (
          <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {fileName}
          </a>
        ) : (
          "Tidak ada file diunggah"
        )}
      </div>
      <h3 className="text-base font-bold font-poppins text-[#333333] text-center mb-1">
        {title}
      </h3>
      <p className="text-xs font-normal font-poppins text-[#5e5a5a] flex-grow whitespace-pre-wrap overflow-hidden text-ellipsis">
        {description}
      </p>
      <Button
        onClick={onViewDetail}
        className="bg-[#3375cc] text-white font-semibold py-1.5 px-4 rounded-md text-sm w-fit self-center mt-3"
      >
        Lihat Detail
      </Button>
    </div>
  );
};
// --- END: Definisi PortfolioCard ---

const Portfolio = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [newPortfolio, setNewPortfolio] = useState({
    judul: "", // Sesuaikan dengan BE
    deskripsi: "", // Sesuaikan dengan BE
    tanggal_dibuat: "", // Sesuaikan dengan BE (akan digunakan sebagai 'year' di FE)
    file: null, // Untuk objek file yang diunggah
    fileName: "", // Nama file untuk tampilan di FE
    fileUrl: "", // URL file dari BE
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Ambil data portofolio dari BE saat komponen dimuat ---
  useEffect(() => {
    fetchPortofolios();
  }, []);

  const fetchPortofolios = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/portofolio`, {
        withCredentials: true,
      });
      // Sesuaikan nama field dari BE ke state FE jika perlu
      const mappedPortofolios = response.data.map(item => ({
        id: item.id,
        title: item.judul,
        description: item.deskripsi,
        tanggal_dibuat: item.tanggal_dibuat,
        fileName: item.file_url ? item.file_url.split('/').pop() : '', // Ambil nama file dari URL
        fileUrl: item.file_url,
      }));
      setPortfolios(mappedPortofolios);
    } catch (err) {
      console.error("Error fetching portfolios:", err);
      if (err.response && err.response.status === 404) {
        setPortfolios([]); // Tidak ada portofolio, set array kosong
      } else {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNewPortfolio({
      judul: "",
      deskripsi: "",
      tanggal_dibuat: "",
      file: null,
      fileName: "",
      fileUrl: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleAddPortfolio = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEditPortfolio = (portfolio) => {
    setNewPortfolio({
      judul: portfolio.title,
      deskripsi: portfolio.description,
      tanggal_dibuat: portfolio.tanggal_dibuat, // Pastikan ini diisi
      file: null, // Tidak perlu mengisi ulang file saat edit
      fileName: portfolio.fileName,
      fileUrl: portfolio.fileUrl,
    });
    setEditingId(portfolio.id);
    setShowForm(true);
    setSelectedPortfolio(null);
  };

  const handleDeletePortfolio = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus portofolio ini?")) {
      return;
    }
    try {
      await axios.delete(`${API_BASE_URL}/portofolio/${id}`, {
        withCredentials: true,
      });
      alert("Portofolio berhasil dihapus!");
      fetchPortofolios(); // Muat ulang data setelah dihapus
      setSelectedPortfolio(null); // Tutup detail jika sedang terbuka
    } catch (err) {
      console.error("Error deleting portfolio:", err);
      alert(
        "Gagal menghapus portofolio: " + (err.response?.data?.msg || err.message)
      );
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file" && files) {
      setNewPortfolio((prev) => ({
        ...prev,
        file: files[0],
        fileName: files[0].name, // Simpan nama file untuk ditampilkan di UI
      }));
    } else {
      setNewPortfolio((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("judul", newPortfolio.judul);
    formData.append("deskripsi", newPortfolio.deskripsi);
    formData.append("tanggal_dibuat", newPortfolio.tanggal_dibuat); // Kirim tanggal_dibuat

    if (newPortfolio.file) {
      formData.append("file", newPortfolio.file); // 'file' harus sesuai dengan nama field di BE
    }

    try {
      if (editingId) {
        // Mode edit
        await axios.patch(`${API_BASE_URL}/portofolio/${editingId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Penting untuk upload file
          },
          withCredentials: true,
        });
        alert("Portofolio berhasil diperbarui!");
      } else {
        // Mode tambah baru
        await axios.post(`${API_BASE_URL}/portofolio`, formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Penting untuk upload file
          },
          withCredentials: true,
        });
        alert("Portofolio berhasil ditambahkan!");
      }
      resetForm();
      fetchPortofolios(); // Muat ulang data setelah simpan/perbarui
    } catch (err) {
      console.error("Error saving portfolio:", err);
      alert(
        "Gagal menyimpan portofolio: " + (err.response?.data?.msg || err.message)
      );
    }
  };

  const formInputClass =
    "mt-1 block w-full border border-gray-300 px-3 py-1.5 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-[#3375cc]";

  const formTextareaClass =
    "mt-1 block w-full border border-gray-300 px-3 py-1.5 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-[#3375cc] min-h-[3.5rem] resize-none overflow-auto";

  if (loading) {
    return (
      <div className="bg-white rounded-[15px] p-6 mb-5 shadow text-center text-gray-600">
        Memuat portofolio...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-[15px] p-6 mb-5 shadow text-center text-red-500">
        Terjadi kesalahan saat memuat portofolio: {error.message}
        <Button
          onClick={fetchPortofolios}
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
        CV dan Portofolio
      </h2>

      {selectedPortfolio && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-10 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[350px] relative shadow-lg">
            <button
              onClick={() => setSelectedPortfolio(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl p-1"
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-2">
              {selectedPortfolio.title}
            </h3>
            <p className="text-sm mb-2 whitespace-pre-wrap">
              {selectedPortfolio.description || <span className="text-gray-400 italic">Tidak ada deskripsi</span>}
            </p>
            {selectedPortfolio.fileName && (
              <p className="text-xs text-gray-500 mb-4">
                File:{" "}
                <a
                  href={selectedPortfolio.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {selectedPortfolio.fileName}
                </a>
              </p>
            )}
            <div className="flex gap-3 justify-end">
              <Button
                onClick={() => handleEditPortfolio(selectedPortfolio)}
                className="bg-blue-500 text-white px-3 py-1.5 rounded text-sm"
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDeletePortfolio(selectedPortfolio.id)}
                className="bg-red-500 text-white px-3 py-1.5 rounded text-sm"
              >
                Hapus
              </Button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 relative bg-gray-50 p-6 rounded-md shadow-inner"
        >
          <button
            type="button"
            onClick={resetForm}
            className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl p-1"
          >
            &times;
          </button>

          <div>
            <label className="block text-xs font-medium font-poppins text-gray-700 mb-1">
              Judul:
            </label>
            <input
              type="text"
              name="judul" // Sesuaikan dengan BE
              value={newPortfolio.judul}
              onChange={handleChange}
              className={formInputClass}
              placeholder="Masukkan Judul Portofolio"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium font-poppins text-gray-700 mb-1">
              Tanggal Dibuat:
            </label>
            <input
              type="date" // Menggunakan input type date
              name="tanggal_dibuat" // Sesuaikan dengan BE
              value={newPortfolio.tanggal_dibuat}
              onChange={handleChange}
              className={formInputClass}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium font-poppins text-gray-700 mb-1">
              Deskripsi:
            </label>
            <textarea
              name="deskripsi" // Sesuaikan dengan BE
              value={newPortfolio.deskripsi}
              onChange={handleChange}
              rows="3"
              className={formTextareaClass}
              placeholder="Jelaskan detail proyek ini..."
              required
            />
          </div>

          {/* START: Perubahan utama pada bagian Unggah File */}
          <div>
            <label htmlFor="file-upload" className="block text-xs font-medium font-poppins text-gray-700 mb-1">
              Unggah File (PDF):
            </label>
            <input
              id="file-upload"
              type="file"
              name="file"
              accept=".pdf" // Hanya menerima PDF
              onChange={handleChange}
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className={`
                mt-1 flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-md cursor-pointer
                ${newPortfolio.fileName ? 'border-blue-400 bg-blue-50 text-blue-800' : 'border-gray-300 bg-gray-50 text-gray-500'}
                hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200
              `}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>

              <p className="text-sm font-semibold">
                {newPortfolio.fileName ? "File Terpilih:" : "Klik atau seret file di sini"}
              </p>

              <p className="text-xs text-center mt-0.5">
                {newPortfolio.fileName ? newPortfolio.fileName : "Max. 10MB, format: PDF"}
              </p>

              {newPortfolio.file && (
                <p className="text-xs text-gray-500 mt-1">
                  Ukuran file: {(newPortfolio.file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              )}
              {editingId && newPortfolio.fileUrl && !newPortfolio.file && (
                <p className="text-xs text-gray-500 mt-1 italic">
                    File saat ini:{" "}
                    <a href={newPortfolio.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {newPortfolio.fileUrl.split('/').pop()}
                    </a>
                    {" "} (Tidak diubah)
                </p>
              )}
            </label>
          </div>
          {/* END: Perubahan utama pada bagian Unggah File */}

          <div className="flex justify-center gap-4 pt-2">
            <Button
              type="submit"
              className="bg-[#0BAB5E] text-white font-bold py-1.5 px-4 rounded-lg"
            >
              {editingId ? "Perbarui" : "Simpan"}
            </Button>
            <Button
              type="button"
              onClick={resetForm}
              className="bg-gray-400 text-white font-bold py-1.5 px-4 rounded-lg"
            >
              Batal
            </Button>
          </div>
        </form>
      )}

      {!showForm && (
        <>
          {portfolios.length > 0 ? (
            <div className="flex flex-wrap gap-6 justify-start">
              {portfolios.map((portfolio) => (
                <PortfolioCard
                  key={portfolio.id}
                  title={portfolio.title}
                  description={portfolio.description}
                  fileName={portfolio.fileName}
                  fileUrl={portfolio.fileUrl} // Teruskan fileUrl ke PortfolioCard
                  onViewDetail={() => setSelectedPortfolio(portfolio)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8 border rounded-md bg-gray-50">
              <p className="text-sm">Belum ada portofolio yang ditambahkan.</p>
              <p className="text-xs mt-2">Klik "Tambah" untuk menambahkan portofolio Anda.</p>
            </div>
          )}

          <div className="flex justify-end mt-6">
            <Button
              onClick={handleAddPortfolio}
              className="bg-[#3375cc] text-white font-bold py-1.5 px-4 rounded-lg"
            >
              Tambah
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
export default Portfolio;