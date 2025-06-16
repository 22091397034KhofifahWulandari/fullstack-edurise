// controllers/DiskusiController.js
import Diskusi from "../models/DiskusiModel.js";
import User from "../models/UserModel.js";
import uploadDiskusiPicture from "../middleware/upload.js"; // Import middleware upload
import fs from 'fs'; // Untuk menghapus file lama
import path from 'path'; // Untuk path

// --- Fungsi untuk Admin (Create, Update, Delete) ---

export const createDiskusi = async (req, res) => {
    uploadDiskusiPicture(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ msg: err.message });
        }

        const { judul, deskripsi, keahlian, link } = req.body;
        let diskusiPicture = null;
        if (req.file) {
            // Ambil path relatif dari public folder
            diskusiPicture = `/images/discussions/${req.file.filename}`;
        }

        try {
            await Diskusi.create({
                judul: judul,
                deskripsi: deskripsi,
                keahlian: keahlian,
                link: link,
                diskusiPicture: diskusiPicture, // Simpan URL gambar
                userId: req.userId
            });
            res.status(201).json({ msg: "Diskusi berhasil ditambahkan!" });
        } catch (error) {
            // Jika ada error database setelah upload file, hapus file yang sudah terupload
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            res.status(400).json({ msg: error.message });
        }
    });
};

export const updateDiskusi = async (req, res) => {
    uploadDiskusiPicture(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ msg: err.message });
        }

        try {
            const diskusi = await Diskusi.findOne({
                where: { uuid: req.params.id }
            });
            if (!diskusi) {
                if (req.file) fs.unlinkSync(req.file.path); // Hapus file jika diskusi tidak ditemukan
                return res.status(404).json({ msg: "Diskusi tidak ditemukan" });
            }

            const { judul, deskripsi, keahlian, link } = req.body;
            let updatedFields = {
                judul: judul,
                deskripsi: deskripsi,
                keahlian: keahlian,
                link: link
            };

            // Jika ada file baru diupload, update diskusiPicture dan hapus yang lama
            if (req.file) {
                if (diskusi.diskusiPicture) { // Hapus gambar lama jika ada
                    const oldImagePath = path.join('public', diskusi.diskusiPicture);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }
                updatedFields.diskusiPicture = `/images/discussions/${req.file.filename}`;
            } else if (req.body.removePicture === 'true') { // Tambahkan logic untuk menghapus gambar tanpa upload baru
                if (diskusi.diskusiPicture) {
                    const oldImagePath = path.join('public', diskusi.diskusiPicture);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }
                updatedFields.diskusiPicture = null;
            }


            await Diskusi.update(updatedFields, {
                where: { uuid: req.params.id }
            });
            res.status(200).json({ msg: "Diskusi berhasil diperbarui!" });
        } catch (error) {
            if (req.file) {
                fs.unlinkSync(req.file.path); // Hapus file baru jika ada error database
            }
            res.status(400).json({ msg: error.message });
        }
    });
};

export const deleteDiskusi = async (req, res) => {
    try {
        const diskusi = await Diskusi.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!diskusi) return res.status(404).json({ msg: "Diskusi tidak ditemukan" });

        // Hapus file gambar terkait jika ada
        if (diskusi.diskusiPicture) {
            const imagePath = path.join('public', diskusi.diskusiPicture);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Diskusi.destroy({
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json({ msg: "Diskusi berhasil dihapus!" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// --- Fungsi untuk Semua Pengguna (Admin & User) - Melihat ---

export const getDiskusi = async (req, res) => {
    try {
        const response = await Diskusi.findAll({
            // Pastikan 'link' disertakan di sini
            attributes: ['uuid', 'judul', 'deskripsi', 'keahlian', 'link', 'createdAt', 'userId', 'diskusiPicture'],
            include: [{
                model: User,
                as: 'creator',
                attributes: ['uuid', 'name']
            }],
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(response);
    } catch (error) {
        console.error("Error in getDiskusi:", error);
        res.status(500).json({ msg: error.message });
    }
};

export const getDiskusiById = async (req, res) => {
    try {
        const diskusi = await Diskusi.findOne({
            // Pastikan 'link' disertakan di sini
            attributes: ['uuid', 'judul', 'deskripsi', 'keahlian', 'link', 'createdAt', 'userId', 'diskusiPicture'],
            where: {
                uuid: req.params.id
            },
            include: [{
                model: User,
                as: 'creator',
                attributes: ['uuid', 'name']
            }]
        });
        if (!diskusi) return res.status(404).json({ msg: "Diskusi tidak ditemukan" });
        res.status(200).json(diskusi);
    } catch (error) {
        console.error("Error in getDiskusiById:", error);
        res.status(500).json({ msg: error.message });
    }
};

export const joinDiskusi = async (req, res) => {
    try {
        const diskusi = await Diskusi.findOne({
            // Pastikan 'link' disertakan di sini
            attributes: ['link', 'judul'],
            where: {
                uuid: req.params.id
            }
        });
        if (!diskusi) return res.status(404).json({ msg: "Diskusi tidak ditemukan" });

        res.status(200).json({
            msg: `Silakan bergabung dengan diskusi "${diskusi.judul}"`,
            link: diskusi.link
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};