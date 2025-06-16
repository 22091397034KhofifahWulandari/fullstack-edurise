// controllers/PortofolioController.js
import { PortofolioModel, UserModel } from "../models/index.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper untuk menghapus file lama
const deleteFile = (filePath) => {
    // Memeriksa keberadaan file dan memastikan path valid sebelum menghapus
    if (filePath && typeof filePath === 'string' && fs.existsSync(filePath)) {
        try {
            fs.unlinkSync(filePath);
            console.log(`File deleted: ${filePath}`);
        } catch (error) {
            console.error(`Error deleting file ${filePath}:`, error);
        }
    }
};

// Mendapatkan semua portofolio user yang sedang login
export const getAllPortofolios = async (req, res) => {
    try {
        const portofolios = await PortofolioModel.findAll({
            where: { userId: req.userId },
            order: [['createdAt', 'DESC']]
        });
        if (portofolios.length === 0) {
            return res.status(404).json({ msg: "Belum ada portofolio yang ditemukan untuk user ini." });
        }
        res.status(200).json(portofolios);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Mendapatkan portofolio berdasarkan ID
export const getPortofolioById = async (req, res) => {
    try {
        const portofolio = await PortofolioModel.findOne({
            where: {
                id: req.params.id,
                userId: req.userId // Pastikan hanya user pemilik yang bisa melihat
            }
        });
        if (!portofolio) return res.status(404).json({ msg: "Portofolio tidak ditemukan" });
        res.status(200).json(portofolio);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Membuat portofolio baru (termasuk upload PDF)
export const createPortofolio = async (req, res) => {
    const { judul, deskripsi, tanggal_dibuat } = req.body; // Tambahkan tanggal_dibuat dari body

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: "Tidak ada file PDF yang diunggah" });
    }

    const file = req.files.file; // <<< INI ADALAH KEY YANG HARUS DIGUNAKAN DI POSTMAN: 'file'
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext; // Gunakan MD5 untuk nama unik
    const url = `${req.protocol}://${req.get('host')}/portofolios/${fileName}`; // URL publik file
    const allowedType = ['.pdf']; // Hanya izinkan PDF

    // Validasi tipe dan ukuran file
    if (!allowedType.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: "Tipe file tidak valid, hanya PDF yang diizinkan." });
    }
    if (fileSize > 10000000) { // Batas ukuran 10MB
        return res.status(422).json({ msg: "Ukuran file PDF harus kurang dari 10MB" });
    }

    // Tentukan path penyimpanan lokal
    const uploadDir = path.join(__dirname, '../public/portofolios');
    // Pastikan folder public/portofolios ada
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
    const filePath = path.join(uploadDir, fileName);

    // Pindahkan file ke folder tujuan
    file.mv(filePath, async (err) => {
        if (err) return res.status(500).json({ msg: err.message }); // Jika gagal pindah file

        try {
            // Buat entri di database
            const portofolio = await PortofolioModel.create({
                judul: judul,
                deskripsi: deskripsi,
                file_path: filePath, // Path lokal di server
                file_url: url,       // URL publik
                tanggal_dibuat: tanggal_dibuat, // Ambil dari body
                userId: req.userId   // Otomatis terhubung dengan user yang sedang login
            });
            res.status(201).json({ msg: "Portofolio berhasil ditambahkan", data: portofolio });
        } catch (error) {
            // Jika ada error database, hapus file yang sudah terlanjur diunggah
            deleteFile(filePath);
            res.status(400).json({ msg: error.message }); // Error validasi Sequelize atau lainnya
        }
    });
};

// Memperbarui portofolio (opsional: upload PDF baru)
export const updatePortofolio = async (req, res) => {
    // Cari portofolio berdasarkan ID dan user ID
    const portofolio = await PortofolioModel.findOne({
        where: {
            id: req.params.id,
            userId: req.userId // Hanya pemilik yang bisa update
        }
    });
    if (!portofolio) return res.status(404).json({ msg: "Portofolio tidak ditemukan" });

    // Ambil data dari body
    const { judul, deskripsi, tanggal_dibuat } = req.body;
    let file_path = portofolio.file_path; // Default: gunakan path lama
    let file_url = portofolio.file_url;   // Default: gunakan URL lama

    // Jika ada file baru diunggah
    if (req.files && Object.keys(req.files).length > 0) {
        const file = req.files.file; // <<< INI ADALAH KEY YANG HARUS DIGUNAKAN DI POSTMAN: 'file'
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        const fileName = file.md5 + ext;
        const newUrl = `${req.protocol}://${req.get('host')}/portofolios/${fileName}`;
        const allowedType = ['.pdf'];

        // Validasi tipe dan ukuran file baru
        if (!allowedType.includes(ext.toLowerCase())) {
            return res.status(422).json({ msg: "Tipe file tidak valid, hanya PDF yang diizinkan." });
        }
        if (fileSize > 10000000) {
            return res.status(422).json({ msg: "Ukuran file PDF harus kurang dari 10MB" });
        }

        // Hapus file lama dari server sebelum menyimpan yang baru
        deleteFile(portofolio.file_path);

        const uploadDir = path.join(__dirname, '../public/portofolios');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        const newFilePath = path.join(uploadDir, fileName);

        // Pindahkan file baru
        try {
            await file.mv(newFilePath);
            file_path = newFilePath; // Update path dan URL
            file_url = newUrl;
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }

    try {
        // Update entri database
        await PortofolioModel.update({
            judul: judul || portofolio.judul, // Jika judul tidak disediakan, gunakan yang lama
            deskripsi: deskripsi !== undefined ? deskripsi : portofolio.deskripsi, // Perhatikan null
            tanggal_dibuat: tanggal_dibuat || portofolio.tanggal_dibuat,
            file_path: file_path,
            file_url: file_url
        }, {
            where: {
                id: req.params.id,
                userId: req.userId
            }
        });
        res.status(200).json({ msg: "Portofolio berhasil diperbarui", file_url: file_url });
    } catch (error) {
        // Jika update DB gagal setelah file baru dipindahkan, Anda mungkin perlu log atau menangani file baru secara manual
        res.status(400).json({ msg: error.message });
    }
};

// Menghapus portofolio
export const deletePortofolio = async (req, res) => {
    try {
        const portofolio = await PortofolioModel.findOne({
            where: {
                id: req.params.id,
                userId: req.userId // Hanya pemilik yang bisa hapus
            }
        });
        if (!portofolio) return res.status(404).json({ msg: "Portofolio tidak ditemukan" });

        // Hapus file dari server sebelum menghapus entri DB
        deleteFile(portofolio.file_path);

        await PortofolioModel.destroy({
            where: {
                id: req.params.id,
                userId: req.userId
            }
        });
        res.status(200).json({ msg: "Portofolio berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};