import { useState, useEffect } from "react"; // Tambahkan useEffect
import Button from "./ButtonProfile";

// PersonalInfo menerima props profileData, setProfileData, dan onUpdate
const PersonalInfo = ({ profileData, setProfileData, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false); // Default ke false karena data akan dimuat dari BE

  // Inisialisasi state personalInfo dengan data dari props profileData
  // Gunakan useEffect untuk memastikan personalInfo selalu sinkron dengan profileData dari parent
  useEffect(() => {
    setPersonalInfo({
      name: profileData.name || "",
      ttl: profileData.ttl || "", // ttl dari BE
      jenis_kelamin: profileData.jenis_kelamin || "", // jenis_kelamin dari BE
      alamat: profileData.alamat || "", // alamat dari BE
      no_telp: profileData.no_telp || "", // no_telp dari BE
      email: profileData.email || "",
    });
  }, [profileData]); // Jalankan setiap kali profileData berubah

  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    ttl: "",
    jenis_kelamin: "",
    alamat: "",
    no_telp: "",
    email: "",
  });

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
    // Perbarui state lokal
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Perbarui juga state di parent (ProfilePage) agar data tetap sinkron
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const inputClass =
    "flex-1 text-xs font-normal font-poppins text-black border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#3375cc] h-8";
  const viewClass =
    "flex-1 text-xs font-normal font-poppins text-black border border-gray-300 rounded-md px-3 py-1.5 bg-gray-100 min-h-8 flex items-center";

  const textareaClass =
    "flex-1 text-xs font-normal font-poppins text-black border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#3375cc] min-h-[3.5rem] resize-none overflow-auto";
  const textareaViewClass =
    "flex-1 text-xs font-normal font-poppins text-black border border-gray-300 rounded-md px-3 py-1.5 bg-gray-100 min-h-[3.5rem] overflow-auto";

  return (
    <div className="bg-white rounded-[15px] p-6 mb-5 shadow">
      <h2 className="text-xl font-semibold font-poppins text-[#17355c] mb-6">
        Informasi Pribadi
      </h2>

      <div className="space-y-4">
        {[
          { label: "Nama Lengkap", name: "name", type: "text" },
          {
            label: "Tempat dan tanggal lahir",
            name: "ttl", // Ganti dari birthplace ke ttl
            type: "date", // Gunakan type date untuk input tanggal
          },
          {
            label: "Jenis Kelamin",
            name: "jenis_kelamin", // Ganti dari gender ke jenis_kelamin
            type: "select",
            options: ["Laki-laki", "Perempuan"], // Sesuaikan dengan ENUM di BE
          },
          { label: "Alamat", name: "alamat", type: "textarea" }, // Ganti dari address ke alamat
          { label: "No.Telp/HP", name: "no_telp", type: "text" }, // Ganti dari phone ke no_telp
          { label: "Email", name: "email", type: "email" },
        ].map((field) => (
          <div
            key={field.name}
            className="grid grid-cols-[160px_1fr] items-start gap-4"
          >
            <p className="text-xs font-normal font-poppins text-black">
              {field.label} :
            </p>
            {isEditing ? (
              field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={personalInfo[field.name] || ""} // Tambahkan fallback ""
                  onChange={handleChange}
                  className={textareaClass}
                  placeholder={`Masukkan ${field.label}`}
                />
              ) : field.type === "select" ? (
                <select
                  name={field.name}
                  value={personalInfo[field.name] || ""} // Tambahkan fallback ""
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">-- Pilih {field.label} --</option>
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={personalInfo[field.name] || ""} // Tambahkan fallback ""
                  onChange={handleChange}
                  className={inputClass}
                  placeholder={`Masukkan ${field.label}`}
                />
              )
            ) : (
              field.type === "textarea" ? (
                <p className={textareaViewClass}>
                  {personalInfo[field.name] || (
                    <span className="text-gray-400 italic">Belum diisi</span>
                  )}
                </p>
              ) : (
                <p className={viewClass}>
                  {personalInfo[field.name] || (
                    <span className="text-gray-400 italic">Belum diisi</span>
                  )}
                </p>
              )
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

export default PersonalInfo;