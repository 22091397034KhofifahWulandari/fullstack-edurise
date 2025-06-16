// controllers/UserSavedKompetisiController.js

import { KompetisiModel, UserSavedKompetisiModel } from "../models/index.js";

// --- USER ACCESS (requires authentication) ---

// Menyimpan kompetisi
export const saveKompetisi = async (req, res) => {
    const userId = req.userId; // Dapatkan ID user dari token/sesi
    const { kompetisiId } = req.body; // ID numerik kompetisi

    if (!userId) {
        return res.status(401).json({ msg: "User tidak terautentikasi." });
    }

    try {
        // Cek apakah kompetisi ada
        const kompetisi = await KompetisiModel.findByPk(kompetisiId);
        if (!kompetisi) {
            return res.status(404).json({ msg: "Kompetisi tidak ditemukan." });
        }

        // Cek apakah user sudah menyimpan kompetisi ini
        const existingSave = await UserSavedKompetisiModel.findOne({
            where: {
                userId: userId,
                kompetisiId: kompetisiId
            }
        });

        if (existingSave) {
            return res.status(409).json({ msg: "Kompetisi ini sudah tersimpan." });
        }

        await UserSavedKompetisiModel.create({
            userId: userId,
            kompetisiId: kompetisiId
        });

        res.status(201).json({ msg: "Kompetisi berhasil disimpan." });

    } catch (error) {
        console.error("Error saving kompetisi:", error);
        res.status(500).json({ msg: error.message || "Kesalahan server saat menyimpan kompetisi." });
    }
};

// Membatalkan simpan kompetisi
export const unsaveKompetisi = async (req, res) => {
    const userId = req.userId; // Dapatkan ID user dari token/sesi
    const { kompetisiId } = req.params; // ID numerik kompetisi dari URL parameter

    if (!userId) {
        return res.status(401).json({ msg: "User tidak terautentikasi." });
    }

    try {
        // Cek apakah ada record simpan ini
        const savedItem = await UserSavedKompetisiModel.findOne({
            where: {
                userId: userId,
                kompetisiId: kompetisiId
            }
        });

        if (!savedItem) {
            return res.status(404).json({ msg: "Kompetisi tidak ditemukan dalam daftar tersimpan Anda." });
        }

        await UserSavedKompetisiModel.destroy({
            where: {
                userId: userId,
                kompetisiId: kompetisiId
            }
        });

        res.status(200).json({ msg: "Kompetisi berhasil dibatalkan dari daftar tersimpan." });

    } catch (error) {
        console.error("Error unsaving kompetisi:", error);
        res.status(500).json({ msg: error.message || "Kesalahan server saat membatalkan simpan kompetisi." });
    }
};

// Mendapatkan semua kompetisi yang disimpan oleh user yang sedang login
export const getSavedKompetisis = async (req, res) => {
    const userId = req.userId; // Dapatkan ID user dari token/sesi

    if (!userId) {
        return res.status(401).json({ msg: "User tidak terautentikasi." });
    }

    try {
        const savedKompetisis = await UserSavedKompetisiModel.findAll({
            where: { userId: userId },
            include: [{
                model: KompetisiModel,
                as: 'kompetisi', // Menggunakan alias 'kompetisi' yang didefinisikan di relasi UserSavedKompetisiModel.belongsTo(KompetisiModel, ...)
                attributes: [
                    'uuid', 'judul', 'short_deskripsi', 'gambar', 'tanggal_mulai_pendaftaran',
                    'tanggal_akhir_pendaftaran', 'biaya_pendaftaran', 'tingkat_kompetisi',
                    'kategori', 'penyelenggara', 'status'
                ]
            }],
            attributes: ['userId', 'kompetisiId'], // Hanya atribut dari tabel perantara jika tidak ada kolom lain
            order: [['createdAt', 'DESC']] // Urutkan berdasarkan kapan disimpan
        });
        res.status(200).json(savedKompetisis);
    } catch (error) {
        console.error("Error fetching saved kompetisis:", error);
        res.status(500).json({ msg: error.message || "Kesalahan server saat mengambil daftar kompetisi tersimpan." });
    }
};