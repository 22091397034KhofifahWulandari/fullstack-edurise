import { useState, useEffect } from "react"; // Tambahkan useEffect
import Button from "./ButtonProfile";

// Education menerima props profileData, setProfileData, dan onUpdate
const Education = ({ profileData, setProfileData, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false); // Default ke false karena data akan dimuat dari BE

  // State lokal untuk data pendidikan
  const [education, setEducation] = useState({
    nama_institusi: "", // Sesuaikan dengan BE
    prodi: "", // Sesuaikan dengan BE
    fakultas: "", // Sesuaikan dengan BE
    semester: "",
    ipk: "", // Sesuaikan dengan BE
  });

  // Gunakan useEffect untuk memastikan education selalu sinkron dengan profileData dari parent
  useEffect(() => {
    setEducation({
      nama_institusi: profileData.nama_institusi || "",
      prodi: profileData.prodi || "",
      fakultas: profileData.fakultas || "",
      semester: profileData.semester || "",
      ipk: profileData.ipk || "",
    });
  }, [profileData]); // Jalankan setiap kali profileData berubah

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    // Panggil fungsi onUpdate yang diteruskan dari parent (ProfilePage)
    // Fungsi onUpdate di parent akan mengirim data ke backend
    await onUpdate();
    setIsEditing(false); // Setelah disimpan, kembali ke mode tampilan
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Untuk semester dan ipk, mungkin perlu validasi angka atau konversi tipe
    let newValue = value;
    if (name === "semester") {
      newValue = parseInt(value) || ""; // Pastikan integer, atau kosong jika input tidak valid
    } else if (name === "ipk") {
      newValue = parseFloat(value) || ""; // Pastikan float, atau kosong jika input tidak valid
    }

    // Perbarui state lokal
    setEducation((prev) => ({
      ...prev,
      [name]: newValue,
    }));
    // Perbarui juga state di parent (ProfilePage) agar data tetap sinkron
    setProfileData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const inputClass =
    "flex-1 min-w-[250px] text-xs font-normal font-poppins text-black border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#3375cc] h-8";

  const viewClass =
    "flex-1 min-w-[250px] text-xs font-normal font-poppins text-black border border-gray-300 rounded-md px-3 py-1.5 bg-gray-100 min-h-8 flex items-center";

  return (
    <div className="bg-white rounded-[15px] p-6 mb-5 shadow">
      <h2 className="text-2xl font-semibold font-poppins text-[#17355c] mb-6">
        Pendidikan
      </h2>

      <div className="space-y-4">
        {[
          { label: "Nama Institusi", name: "nama_institusi", type: "text" }, // Sesuaikan name
          { label: "Program Studi", name: "prodi", type: "text" }, // Sesuaikan name
          { label: "Fakultas", name: "fakultas", type: "text" }, // Sesuaikan name
          { label: "Semester", name: "semester", type: "number" }, // Gunakan type number
          { label: "IPK", name: "ipk", type: "number", step: "0.01" }, // Gunakan type number, tambahkan step
        ].map((field) => (
          <div key={field.name} className="flex items-start gap-4">
            <p className="w-40 text-xs font-normal font-poppins text-black">
              {field.label} :
            </p>
            {isEditing ? (
              <input
                type={field.type}
                name={field.name}
                value={education[field.name]}
                onChange={handleChange}
                className={inputClass}
                placeholder={`Masukkan ${field.label}`}
                step={field.step} // Tambahkan step untuk IPK
              />
            ) : (
              <p className={viewClass}>
                {education[field.name] || (
                  <span className="text-gray-400 italic">Belum diisi</span>
                )}
              </p>
            )}
          </div>
        ))}
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

export default Education;