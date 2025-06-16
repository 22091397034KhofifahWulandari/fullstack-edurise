// middleware/upload.js
import multer from 'multer';
import path from 'path';
import fs from 'fs'; // <-- Tambahkan import fs

// Konfigurasi penyimpanan untuk Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'public/images/discussions'; // Definisi path
    // Pastikan folder ini ada di root proyek backend kamu
    if (!fs.existsSync(uploadPath)) { // <-- Cek apakah folder sudah ada
      fs.mkdirSync(uploadPath, { recursive: true }); // <-- Buat folder jika belum ada (recursive: true akan membuat parent folder jika perlu)
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Nama file unik: timestamp.ext
    // Menggunakan Date.now() sudah cukup unik dan lebih sederhana
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Filter file untuk memastikan hanya gambar yang diunggah
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    // Menggunakan Error objek untuk pesan yang lebih baik
    cb(new Error('Hanya file gambar (jpeg, jpg, png, gif) yang diizinkan!'), false);
  }
};

const uploadDiskusiPicture = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB limit
  }
}).single('diskusiPicture'); // 'diskusiPicture' adalah nama field di form-data

export default uploadDiskusiPicture;