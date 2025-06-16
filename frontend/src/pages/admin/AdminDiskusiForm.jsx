// Contoh di halaman admin untuk create/edit diskusi
import React, { useState } from 'react';
import axios from 'axios';

const AdminDiskusiForm = () => {
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [keahlian, setKeahlian] = useState('');
  const [link, setLink] = useState('');
  const [diskusiPicture, setDiskusiPicture] = useState(null); // State untuk file gambar
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // Gunakan FormData untuk mengirim file
    formData.append('judul', judul);
    formData.append('deskripsi', deskripsi);
    formData.append('keahlian', keahlian);
    formData.append('link', link);
    if (diskusiPicture) {
      formData.append('diskusiPicture', diskusiPicture); // 'diskusiPicture' harus sesuai dengan nama field di Multer
    }

    try {
      // Pastikan URL dan endpoint sesuai
      const response = await axios.post('http://localhost:5000/diskusis', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Penting!
        },
        withCredentials: true // Jika kamu menggunakan cookie untuk autentikasi
      });
      setMsg(response.data.msg);
      // Reset form atau redirect
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      } else {
        setMsg("Terjadi kesalahan saat membuat diskusi.");
      }
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {msg && <p>{msg}</p>}
      <div>
        <label>Judul</label>
        <input type="text" value={judul} onChange={(e) => setJudul(e.target.value)} />
      </div>
      <div>
        <label>Deskripsi</label>
        <textarea value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)}></textarea>
      </div>
      <div>
        <label>Keahlian</label>
        <input type="text" value={keahlian} onChange={(e) => setKeahlian(e.target.value)} />
      </div>
      <div>
        <label>Link Diskusi</label>
        <input type="text" value={link} onChange={(e) => setLink(e.target.value)} />
      </div>
      <div>
        <label>Gambar Diskusi (Opsional)</label>
        <input type="file" onChange={(e) => setDiskusiPicture(e.target.files[0])} />
      </div>
      <button type="submit">Buat Diskusi</button>
    </form>
  );
};

export default AdminDiskusiForm;