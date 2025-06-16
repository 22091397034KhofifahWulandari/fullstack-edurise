// middleware/uploadMentorPhoto.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Konfigurasi penyimpanan untuk Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Definisi path. Pastikan folder ini ada di root proyek backend kamu
    // Anda bisa memilih lokasi yang berbeda dari diskusi jika diinginkan
    const uploadPath = 'public/images/mentors';

    // Pastikan folder ini ada
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Nama file unik: timestamp_randomstring.ext
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Filter file untuk memastikan hanya gambar yang diunggah
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Hanya file gambar (jpeg, jpg, png, gif) yang diizinkan untuk foto mentor!'), false);
  }
};

const uploadMentorPhoto = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB limit
  }
}).single('fotoMentor'); // 'fotoMentor' harus sesuai dengan nama field di form-data frontend Anda

export default uploadMentorPhoto;