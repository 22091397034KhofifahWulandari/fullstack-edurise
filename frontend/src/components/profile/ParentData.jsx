import { useState, useEffect } from "react"; // Tambahkan useEffect
import Button from "./ButtonProfile";

// ParentData menerima props: profileData (objek data profil lengkap),
// setProfileData (fungsi untuk update profileData di parent),
// dan onUpdate (fungsi untuk trigger update ke BE)
const ParentData = ({ profileData, setProfileData, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false); // Default ke false

  const [parentInfo, setParentInfo] = useState({
    father: {
      name: "",
      ttl: "", // Sesuaikan dengan BE: ttl_ayah
      alamat: "", // Sesuaikan dengan BE: alamat_ayah
      no_telp: "", // Sesuaikan dengan BE: no_telp_ayah
      pendidikan: "", // Sesuaikan dengan BE: pendidikan_ayah
      pekerjaan: "", // Sesuaikan dengan BE: pekerjaan_ayah
      penghasilan: "", // Sesuaikan dengan BE: penghasilan_ayah
    },
    mother: {
      name: "",
      ttl: "", // Sesuaikan dengan BE: ttl_ibu
      alamat: "", // Sesuaikan dengan BE: alamat_ibu
      no_telp: "", // Sesuaikan dengan BE: no_telp_ibu
      pendidikan: "", // Sesuaikan dengan BE: pendidikan_ibu
      pekerjaan: "", // Sesuaikan dengan BE: pekerjaan_ibu
      penghasilan: "", // Sesuaikan dengan BE: penghasilan_ibu
    },
  });

  // Gunakan useEffect untuk mengisi state parentInfo dari profileData
  useEffect(() => {
    // Memastikan profileData.orang_tua ada dan bukan null sebelum mengisi
    if (profileData && profileData.orang_tua) {
      const { orang_tua } = profileData;
      setParentInfo({
        father: {
          name: orang_tua.nama_ayah || "",
          ttl: orang_tua.ttl_ayah || "",
          alamat: orang_tua.alamat_ayah || "",
          no_telp: orang_tua.no_telp_ayah || "",
          pendidikan: orang_tua.pendidikan_ayah || "",
          pekerjaan: orang_tua.pekerjaan_ayah || "",
          penghasilan: orang_tua.penghasilan_ayah || "",
        },
        mother: {
          name: orang_tua.nama_ibu || "",
          ttl: orang_tua.ttl_ibu || "",
          alamat: orang_tua.alamat_ibu || "",
          no_telp: orang_tua.no_telp_ibu || "",
          pendidikan: orang_tua.pendidikan_ibu || "",
          pekerjaan: orang_tua.pekerjaan_ibu || "",
          penghasilan: orang_tua.penghasilan_ibu || "",
        },
      });
    } else {
      // Jika profileData.orang_tua tidak ada, set ke nilai default (kosong)
      setParentInfo({
        father: {
          name: "",
          ttl: "",
          alamat: "",
          no_telp: "",
          pendidikan: "",
          pekerjaan: "",
          penghasilan: "",
        },
        mother: {
          name: "",
          ttl: "",
          alamat: "",
          no_telp: "",
          pendidikan: "",
          pekerjaan: "",
          penghasilan: "",
        },
      });
    }
  }, [profileData]); // Jalankan setiap kali profileData berubah

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    // Panggil fungsi onUpdate yang diteruskan dari parent (ProfilePage)
    // onUpdate akan menangani pengiriman data ke backend
    await onUpdate();
    setIsEditing(false);
  };

  const handleChange = (parent, e) => {
    const { name, value } = e.target;

    setParentInfo((prev) => {
      const updatedParentInfo = {
        ...prev,
        [parent]: {
          ...prev[parent],
          [name]: value,
        },
      };

      // Sekarang perbarui profileData di parent
      // Pastikan struktur data yang dikirim ke parent sesuai dengan BE
      // Contoh: 'father.name' di FE akan menjadi 'nama_ayah' di BE
      const fieldMapping = {
        name: `nama_${parent === "father" ? "ayah" : "ibu"}`,
        ttl: `ttl_${parent === "father" ? "ayah" : "ibu"}`,
        alamat: `alamat_${parent === "father" ? "ayah" : "ibu"}`,
        no_telp: `no_telp_${parent === "father" ? "ayah" : "ibu"}`,
        pendidikan: `pendidikan_${parent === "father" ? "ayah" : "ibu"}`,
        pekerjaan: `pekerjaan_${parent === "father" ? "ayah" : "ibu"}`,
        penghasilan: `penghasilan_${parent === "father" ? "ayah" : "ibu"}`,
      };

      // Pastikan profileData.orang_tua ada atau buat jika belum
      setProfileData((prevProfile) => ({
        ...prevProfile,
        orang_tua: {
          ...prevProfile.orang_tua, // Pertahankan data orang tua yang sudah ada
          [fieldMapping[name]]: value, // Update field spesifik untuk ayah/ibu
        },
      }));

      return updatedParentInfo;
    });
  };

  const inputClass =
    "flex-1 text-xs font-normal font-poppins text-black border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#3375cc] h-8";
  const viewClass =
    "flex-1 text-xs font-normal font-poppins text-black border border-gray-300 rounded-md px-3 py-1.5 bg-gray-100 min-h-8 flex items-center";
  const textareaClass =
    "flex-1 text-xs font-normal font-poppins text-black border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#3375cc] min-h-[3.5rem] resize-none overflow-auto";
  const textareaViewClass =
    "flex-1 text-xs font-normal font-poppins text-black border border-gray-300 rounded-md px-3 py-1.5 bg-gray-100 min-h-[3.5rem] overflow-auto";

  const parentFields = [
    { label: "Nama Lengkap", name: "name", type: "text" },
    { label: "Tempat dan tanggal lahir", name: "ttl", type: "date" }, // Gunakan type date
    { label: "Alamat", name: "alamat", type: "textarea" },
    { label: "No.Telp/HP", name: "no_telp", type: "text" },
    { label: "Pendidikan Terakhir", name: "pendidikan", type: "text" },
    { label: "Pekerjaan", name: "pekerjaan", type: "text" },
    { label: "Penghasilan", name: "penghasilan", type: "text" }, // Umumnya text untuk penghasilan (misal: "Rp. X jt", "Tidak berpenghasilan")
  ];

  const renderSection = (title, parentKey) => (
    <div className="mb-8">
      <h3 className="text-base font-semibold font-poppins text-black mb-4 border-b border-gray-300 pb-1">
        {title}
      </h3>
      <div className="space-y-4">
        {parentFields.map((field) => (
          <div
            key={`${parentKey}-${field.name}`}
            className="flex items-start gap-4"
          >
            <p className="w-40 text-xs font-normal font-poppins text-black">
              {field.label} :
            </p>
            {isEditing ? (
              field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={parentInfo[parentKey][field.name] || ""} // Fallback ke string kosong
                  onChange={(e) => handleChange(parentKey, e)}
                  className={textareaClass}
                  placeholder={`Masukkan ${field.label} ${title}`}
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={parentInfo[parentKey][field.name] || ""} // Fallback ke string kosong
                  onChange={(e) => handleChange(parentKey, e)}
                  className={inputClass}
                  placeholder={`Masukkan ${field.label} ${title}`}
                />
              )
            ) : (
              field.type === "textarea" ? (
                <p className={textareaViewClass}>
                  {parentInfo[parentKey][field.name] || (
                    <span className="text-gray-400 italic">Belum diisi</span>
                  )}
                </p>
              ) : (
                <p className={viewClass}>
                  {parentInfo[parentKey][field.name] || (
                    <span className="text-gray-400 italic">Belum diisi</span>
                  )}
                </p>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-[15px] p-6 mb-5 shadow">
      <h2 className="text-2xl font-semibold font-poppins text-[#17355c] mb-6">
        Data Orang Tua
      </h2>

      {renderSection("1. Ayah Kandung", "father")}
      {renderSection("2. Ibu Kandung", "mother")}

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

export default ParentData;