import Mentoring from "../models/MentoringModel.js";
import User from "../models/UserModel.js"; // Diperlukan untuk include relasi User
import uploadMentorPicture from "../middleware/upload.js"; // Pastikan ini mengarah ke middleware upload yang benar
import fs from 'fs';
import path from 'path';

// --- Fungsi untuk Admin (Create, Update, Delete) ---

export const createMentoring = async (req, res) => {
    uploadMentorPicture(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ msg: err.message });
        }

        console.log("1. Received body:", req.body); // Ini sudah Anda lakukan
        const { judul, deskripsi, namaMentor, keahlianMentor, jumlahPeserta, statusMentoring, kategoriMentoring, link } = req.body;
        console.log("2. Extracted link:", link); // Cek nilai 'link' setelah destructuring

        let fotoMentor = null;
        if (req.file) {
            fotoMentor = `/images/mentors/${req.file.filename}`;
        }

        console.log("3. Data to be created:", { // Lihat objek yang akan disimpan
            judul,
            deskripsi,
            namaMentor,
            keahlianMentor,
            fotoMentor,
            jumlahPeserta,
            statusMentoring,
            kategoriMentoring,
            link, // Cek nilai link di sini sebelum dikirim ke create
            userId: req.userId
        });

        try {
            await Mentoring.create({
                judul: judul,
                deskripsi: deskripsi,
                namaMentor: namaMentor,
                keahlianMentor: keahlianMentor,
                fotoMentor: fotoMentor,
                jumlahPeserta: jumlahPeserta,
                statusMentoring: statusMentoring,
                kategoriMentoring: kategoriMentoring,
                link: link,
                userId: req.userId
            });
            res.status(201).json({ msg: "Sesi mentoring berhasil ditambahkan!" });
        } catch (error) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            console.error("Error creating mentoring:", error); // Log error lebih detail
            res.status(400).json({ msg: error.message });
        }
    });
};

export const updateMentoring = async (req, res) => {
    // Pastikan hanya admin yang bisa mengakses fungsi ini
    uploadMentorPicture(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ msg: err.message });
        }

        try {
            const mentoring = await Mentoring.findOne({
                where: { uuid: req.params.id }
            });
            if (!mentoring) {
                if (req.file) fs.unlinkSync(req.file.path);
                return res.status(404).json({ msg: "Sesi mentoring tidak ditemukan" });
            }

            const { judul, deskripsi, namaMentor, keahlianMentor, jumlahPeserta, statusMentoring, kategoriMentoring } = req.body;
            let updatedFields = {
                judul: judul,
                deskripsi: deskripsi,
                namaMentor: namaMentor,
                keahlianMentor: keahlianMentor,
                jumlahPeserta: jumlahPeserta,
                statusMentoring: statusMentoring,
                kategoriMentoring: kategoriMentoring
            };

            // Logika update atau hapus gambar mentor
            if (req.file) {
                if (mentoring.fotoMentor) {
                    const oldImagePath = path.join('public', mentoring.fotoMentor);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }
                updatedFields.fotoMentor = `/images/mentors/${req.file.filename}`;
            } else if (req.body.removePicture === 'true') { // Tambahkan logic untuk menghapus gambar tanpa upload baru
                if (mentoring.fotoMentor) {
                    const oldImagePath = path.join('public', mentoring.fotoMentor);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }
                updatedFields.fotoMentor = null;
            }


            await Mentoring.update(updatedFields, {
                where: { uuid: req.params.id }
            });
            res.status(200).json({ msg: "Sesi mentoring berhasil diperbarui!" });
        } catch (error) {
            if (req.file) {
                fs.unlinkSync(req.file.path); // Hapus file baru jika ada error database
            }
            res.status(400).json({ msg: error.message });
        }
    });
};

export const deleteMentoring = async (req, res) => {
    // Pastikan hanya admin yang bisa mengakses fungsi ini
    try {
        const mentoring = await Mentoring.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!mentoring) return res.status(404).json({ msg: "Sesi mentoring tidak ditemukan" });

        // Hapus file gambar terkait jika ada
        if (mentoring.fotoMentor) {
            const imagePath = path.join('public', mentoring.fotoMentor);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Mentoring.destroy({
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json({ msg: "Sesi mentoring berhasil dihapus!" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// --- Fungsi untuk Semua Pengguna (Admin & User) - Melihat ---

export const getMentoring = async (req, res) => {
    try {
        // Semua pengguna bisa melihat daftar mentoring
        const response = await Mentoring.findAll({
            attributes: [
                'uuid', 'judul', 'deskripsi', 'namaMentor', 'keahlianMentor',
                'fotoMentor', 'jumlahPeserta', 'statusMentoring', 'kategoriMentoring', 'link',
                'createdAt'
            ],
            include: [{
                model: User,
                as: 'creator', // Asumsikan user yang membuat mentoring disebut 'creator'
                attributes: ['uuid', 'name', 'role'] // Tambahkan role untuk informasi tambahan jika diperlukan
            }],
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(response);
    } catch (error) {
        console.error("Error in getMentoring:", error);
        res.status(500).json({ msg: error.message });
    }
};

export const getMentoringById = async (req, res) => {
    try {
        // Semua pengguna bisa melihat detail mentoring
        const mentoring = await Mentoring.findOne({
            attributes: [
                'uuid', 'judul', 'deskripsi', 'namaMentor', 'keahlianMentor',
                'fotoMentor', 'jumlahPeserta', 'statusMentoring', 'kategoriMentoring', 'link',
                'createdAt'
            ],
            where: {
                uuid: req.params.id
            },
            include: [{
                model: User,
                as: 'creator',
                attributes: ['uuid', 'name', 'role']
            }]
        });
        if (!mentoring) return res.status(404).json({ msg: "Sesi mentoring tidak ditemukan" });
        res.status(200).json(mentoring);
    } catch (error) {
        console.error("Error in getMentoringById:", error);
        res.status(500).json({ msg: error.message });
    }
};

// --- Fungsi untuk User (Join Mentoring) ---

export const joinMentoring = async (req, res) => {
  try {
    const mentoring = await Mentoring.findOne({
      attributes: ["uuid", "judul", "namaMentor", "statusMentoring", "jumlahPeserta", "link"],
      where: {
        uuid: req.params.id,
      },
    });

    if (!mentoring) {
      return res.status(404).json({ msg: "Sesi mentoring tidak ditemukan." });
    }

    if (mentoring.statusMentoring === "Penuh") {
      return res.status(400).json({ msg: "Sesi mentoring ini sudah penuh." });
    }

    // Karena tidak ada logika update jumlah peserta atau status mentoring di sini,
    // kita bisa langsung menggunakan objek 'mentoring' yang sudah diambil.
    // Jika Anda menambahkan logika update di masa depan, pastikan untuk fetch ulang
    // atau mengembalikan objek yang diperbarui.

    res.status(200).json({
      msg: `Anda berhasil menyatakan minat untuk bergabung dengan sesi mentoring "${mentoring.judul}" bersama ${mentoring.namaMentor}. Silakan bergabung melalui link: ${mentoring.link}`,
      mentoring: mentoring, // Mengirim objek mentoring yang valid
    });
  } catch (error) {
    console.error("Kesalahan saat mencoba bergabung dengan mentoring:", error);
    res.status(500).json({ msg: error.message || "Terjadi kesalahan server." });
  }
};