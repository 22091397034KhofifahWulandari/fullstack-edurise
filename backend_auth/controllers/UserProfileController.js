// controllers/UserProfileController.js
import { UserModel } from "../models/index.js"; // Pastikan path import UserModel sudah benar
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

// Dapatkan __filename dan __dirname untuk Node.js ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Direktori publik tempat gambar akan disimpan dan disajikan
// Pastikan folder 'public' ini ada di root project backend Anda
const PUBLIC_DIR = path.join(__dirname, '../public');
const PROFILE_IMAGE_DIR = path.join(PUBLIC_DIR, 'profiles'); // Folder untuk foto profil
const COVER_IMAGE_DIR = path.join(PUBLIC_DIR, 'covers');   // Folder untuk foto sampul

// Pastikan direktori ada
// Ini akan membuat folder jika belum ada
if (!fs.existsSync(PROFILE_IMAGE_DIR)) {
    fs.mkdirSync(PROFILE_IMAGE_DIR, { recursive: true });
}
if (!fs.existsSync(COVER_IMAGE_DIR)) {
    fs.mkdirSync(COVER_IMAGE_DIR, { recursive: true });
}

// Helper untuk menghapus file lama
// Fungsi ini akan mencari file di kedua direktori (profiles dan covers)
// Ini penting karena kita tidak tahu di mana file lama disimpan hanya dari nama file-nya
const deleteFile = (fileName) => {
    if (!fileName) return; // Tidak ada file untuk dihapus

    const fullPathProfile = path.join(PROFILE_IMAGE_DIR, fileName);
    const fullPathCover = path.join(COVER_IMAGE_DIR, fileName);

    if (fs.existsSync(fullPathProfile)) {
        try {
            fs.unlinkSync(fullPathProfile);
            console.log(`File profil lama dihapus: ${fullPathProfile}`);
        } catch (err) {
            console.error(`Gagal menghapus file profil lama ${fullPathProfile}:`, err);
        }
    } else if (fs.existsSync(fullPathCover)) {
        try {
            fs.unlinkSync(fullPathCover);
            console.log(`File sampul lama dihapus: ${fullPathCover}`);
        } catch (err) {
            console.error(`Gagal menghapus file sampul lama ${fullPathCover}:`, err);
        }
    } else {
        console.warn(`File '${fileName}' tidak ditemukan di direktori profiles atau covers.`);
    }
};


// Mendapatkan data profil user yang sedang login
export const getUserProfile = async (req, res) => {
    try {
        console.log("Sesi Pengguna:", req.session);
        console.log("UserID dari Sesi:", req.session.userId);

        if (!req.session.userId) {
            return res.status(401).json({ msg: "Tidak terautentikasi: UserID tidak ditemukan di sesi." });
        }

        const user = await UserModel.findOne({
            attributes: { exclude: ['password'] }, // Jangan sertakan password
            where: {
                id: req.session.userId // <--- MENCARI BERDASARKAN ID NUMERIK
            }
        });

        if (!user) {
            console.warn(`User dengan ID ${req.session.userId} tidak ditemukan di database.`);
            return res.status(404).json({ msg: "User tidak ditemukan di database." });
        }

        // Jika user ditemukan, siapkan URL gambar lengkap
        const profileImageUrl = user.foto_profile ? `${req.protocol}://${req.get('host')}/profiles/${user.foto_profile}` : null;
        const coverImageUrl = user.foto_sampul ? `${req.protocol}://${req.get('host')}/covers/${user.foto_sampul}` : null;

        // Buat objek data user yang akan dikirim ke frontend
        // Menggabungkan data dari model dengan URL gambar
        const userData = {
            id: user.id, // ID numerik
            uuid: user.uuid, // UUID (jika ada di model)
            name: user.name,
            email: user.email,
            bio: user.bio,
            ttl: user.ttl,
            jenis_kelamin: user.jenis_kelamin,
            alamat: user.alamat,
            no_telp: user.no_telp,
            nama_institusi: user.nama_institusi,
            prodi: user.prodi,
            fakultas: user.fakultas,
            semester: user.semester,
            ipk: user.ipk,
            minat_bidang: user.minat_bidang,
            rencana: user.rencana,
            motivator_karir: user.motivator_karir,
            url_foto_profile: profileImageUrl, // URL lengkap untuk FE
            url_foto_sampul: coverImageUrl    // URL lengkap untuk FE
            // Anda bisa tambahkan kolom lain yang relevan di sini
        };

        res.status(200).json(userData);

    } catch (error) {
        console.error("Error getting user profile:", error);
        res.status(500).json({ msg: error.message });
    }
};

// Memperbarui informasi profil utama user
export const updateProfileInfo = async (req, res) => {
    // Destructuring semua field yang mungkin diupdate dari body request
    const {
        name, bio, ttl, jenis_kelamin, alamat, no_telp,
        nama_institusi, prodi, fakultas, semester, ipk,
        minat_bidang, rencana, motivator_karir
    } = req.body;

    try {
        const user = await UserModel.findOne({
            where: { id: req.session.userId } // <--- MENCARI BERDASARKAN ID NUMERIK
        });

        if (!user) {
            return res.status(404).json({ msg: "User tidak ditemukan" });
        }

        // Buat objek untuk menyimpan hanya field yang benar-benar dikirim
        const fieldsToUpdate = {};
        if (name !== undefined) fieldsToUpdate.name = name;
        if (bio !== undefined) fieldsToUpdate.bio = bio;
        if (ttl !== undefined) fieldsToUpdate.ttl = ttl;
        if (jenis_kelamin !== undefined) fieldsToUpdate.jenis_kelamin = jenis_kelamin;
        if (alamat !== undefined) fieldsToUpdate.alamat = alamat;
        if (no_telp !== undefined) fieldsToUpdate.no_telp = no_telp;
        if (nama_institusi !== undefined) fieldsToUpdate.nama_institusi = nama_institusi;
        if (prodi !== undefined) fieldsToUpdate.prodi = prodi;
        if (fakultas !== undefined) fieldsToUpdate.fakultas = fakultas;
        if (semester !== undefined) fieldsToUpdate.semester = semester;
        if (ipk !== undefined) fieldsToUpdate.ipk = ipk;
        if (minat_bidang !== undefined) fieldsToUpdate.minat_bidang = minat_bidang;
        if (rencana !== undefined) fieldsToUpdate.rencana = rencana;
        if (motivator_karir !== undefined) fieldsToUpdate.motivator_karir = motivator_karir;

        // Hanya update field yang ada di fieldsToUpdate
        await UserModel.update(fieldsToUpdate, {
            where: { id: req.session.userId } // <--- UPDATE BERDASARKAN ID NUMERIK
        });

        // Ambil data terbaru untuk dikirim kembali (opsional, tapi bagus untuk sinkronisasi FE)
        const updatedUser = await UserModel.findOne({
            attributes: { exclude: ['password'] },
            where: { id: req.session.userId }
        });

        res.status(200).json({ msg: "Profil berhasil diperbarui", data: updatedUser.toJSON() });
    } catch (error) {
        console.error("Error updating profile info:", error);
        res.status(400).json({ msg: error.message });
    }
};

// Mengunggah dan memperbarui foto profil
export const uploadProfilePicture = async (req, res) => {
    const user = await UserModel.findOne({
        where: { id: req.session.userId } // <--- MENCARI BERDASARKAN ID NUMERIK
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: "Tidak ada file yang diunggah" });
    }

    const file = req.files.file; // 'file' adalah nama field di form-data dari frontend
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext; // Nama file di server

    const allowedType = ['.png', '.jpg', '.jpeg', '.gif']; // Tambahkan tipe yang diizinkan

    if (!allowedType.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: "Tipe file tidak valid" });
    }
    if (fileSize > 5000000) { // 5MB
        return res.status(422).json({ msg: "Ukuran gambar harus kurang dari 5MB" });
    }

    // Hapus foto profil lama jika ada di server
    if (user.foto_profile) {
        deleteFile(user.foto_profile); // Panggil helper deleteFile
    }

    const filePath = path.join(PROFILE_IMAGE_DIR, fileName); // Path lengkap untuk menyimpan file
    const url = `${req.protocol}://${req.get('host')}/profiles/${fileName}`; // URL publik

    file.mv(filePath, async (err) => {
        if (err) {
            console.error("Error saat memindahkan file foto profil:", err);
            return res.status(500).json({ msg: err.message });
        }
        try {
            await UserModel.update({
                foto_profile: fileName, // Simpan hanya nama file di DB
                url_foto_profile: url // Simpan URL publik di DB
            }, {
                where: { id: req.session.userId } // <--- UPDATE BERDASARKAN ID NUMERIK
            });
            res.status(200).json({ msg: "Foto profil berhasil diperbarui", url_foto_profile: url });
        } catch (error) {
            // Jika update DB gagal, hapus file yang sudah diunggah
            deleteFile(fileName); // Panggil helper deleteFile dengan fileName
            console.error("Error updating profile picture DB:", error);
            res.status(500).json({ msg: error.message });
        }
    });
};

// Mengunggah dan memperbarui foto sampul
export const uploadCoverPicture = async (req, res) => {
    const user = await UserModel.findOne({
        where: { id: req.session.userId } // <--- MENCARI BERDASARKAN ID NUMERIK
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: "Tidak ada file yang diunggah" });
    }

    const file = req.files.file; // 'file' adalah nama field di form-data
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext; // Nama file di server

    const allowedType = ['.png', '.jpg', '.jpeg', '.gif']; // Tambahkan tipe yang diizinkan

    if (!allowedType.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: "Tipe file tidak valid" });
    }
    if (fileSize > 5000000) { // 5MB
        return res.status(422).json({ msg: "Ukuran gambar harus kurang dari 5MB" });
    }

    // Hapus foto sampul lama jika ada di server
    if (user.foto_sampul) {
        deleteFile(user.foto_sampul); // Panggil helper deleteFile
    }

    const filePath = path.join(COVER_IMAGE_DIR, fileName); // Path lengkap untuk menyimpan file
    const url = `${req.protocol}://${req.get('host')}/covers/${fileName}`; // URL publik

    file.mv(filePath, async (err) => {
        if (err) {
            console.error("Error saat memindahkan file foto sampul:", err);
            return res.status(500).json({ msg: err.message });
        }
        try {
            await UserModel.update({
                foto_sampul: fileName, // Simpan hanya nama file di DB
                url_foto_sampul: url // Simpan URL publik di DB
            }, {
                where: { id: req.session.userId } // <--- UPDATE BERDASARKAN ID NUMERIK
            });
            res.status(200).json({ msg: "Foto sampul berhasil diperbarui", url_foto_sampul: url });
        } catch (error) {
            // Jika update DB gagal, hapus file yang sudah diunggah
            deleteFile(fileName); // Panggil helper deleteFile dengan fileName
            console.error("Error updating cover picture DB:", error);
            res.status(500).json({ msg: error.message });
        }
    });
};

// Menghapus foto profil
export const deleteProfilePicture = async (req, res) => {
    try {
        const user = await UserModel.findOne({
            where: { id: req.session.userId } // <--- MENCARI BERDASARKAN ID NUMERIK
        });

        if (!user) {
            return res.status(404).json({ msg: "User tidak ditemukan" });
        }

        if (user.foto_profile) {
            deleteFile(user.foto_profile); // Hapus file dari server
            await UserModel.update({
                foto_profile: null,
                url_foto_profile: null
            }, {
                where: { id: req.session.userId } // <--- UPDATE BERDASARKAN ID NUMERIK
            });
            res.status(200).json({ msg: "Foto profil berhasil dihapus" });
        } else {
            res.status(404).json({ msg: "Foto profil tidak ditemukan" });
        }
    } catch (error) {
        console.error("Error deleting profile picture:", error);
        res.status(500).json({ msg: error.message });
    }
};

// Menghapus foto sampul
export const deleteCoverPicture = async (req, res) => {
    try {
        const user = await UserModel.findOne({
            where: { id: req.session.userId } // <--- MENCARI BERDASARKAN ID NUMERIK
        });

        if (!user) {
            return res.status(404).json({ msg: "User tidak ditemukan" });
        }

        if (user.foto_sampul) {
            deleteFile(user.foto_sampul); // Hapus file dari server
            await UserModel.update({
                foto_sampul: null,
                url_foto_sampul: null
            }, {
                where: { id: req.session.userId } // <--- UPDATE BERDASARKAN ID NUMERIK
            });
            res.status(200).json({ msg: "Foto sampul berhasil dihapus" });
        } else {
            res.status(404).json({ msg: "Foto sampul tidak ditemukan" });
        }
    } catch (error) {
        console.error("Error deleting cover picture:", error);
        res.status(500).json({ msg: error.message });
    }
};