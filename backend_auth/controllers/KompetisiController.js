// controllers/KompetisiController.js

import { Op } from "sequelize";
import { KompetisiModel } from "../models/index.js"; // Import KompetisiModel saja jika itu yang Anda gunakan

// --- PUBLIC ACCESS ---

// Mendapatkan semua kompetisi
export const getKompetisis = async (req, res) => {
    try {
        const { tingkat_kompetisi, search } = req.query; // Hanya tingkat_kompetisi dan search
        let whereClause = {};

        if (tingkat_kompetisi) {
            whereClause.tingkat_kompetisi = tingkat_kompetisi;
        }
        if (search) {
            whereClause[Op.or] = [
                { judul: { [Op.like]: `%${search}%` } },
            ];
        }

        const kompetisis = await KompetisiModel.findAll({
            where: whereClause,
            attributes: [
                'id', 'uuid', 'judul', 'gambar', 'tanggal_mulai_pendaftaran',
                'tanggal_akhir_pendaftaran', 'biaya_pendaftaran', 'tingkat_kompetisi'
            ],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json(kompetisis);
    } catch (error) {
        console.error("Error fetching kompetisis:", error);
        res.status(500).json({ msg: error.message || "Kesalahan server saat mengambil data kompetisi." });
    }
};

// Mendapatkan detail kompetisi berdasarkan UUID
export const getKompetisiById = async (req, res) => {
    try {
        const response = await KompetisiModel.findOne({
            where: {
                uuid: req.params.id
            },
            attributes: [
                'id', 'uuid', 'judul', 'gambar', 'tanggal_mulai_pendaftaran',
                'tanggal_akhir_pendaftaran', 'biaya_pendaftaran', 'tingkat_kompetisi',
                'tentang_kompetisi', 'syarat_ketentuan',
                'ketentuan_penilaian', 'manfaat_partisipasi', 'bantuan_didapat'
            ]
        });
        if (!response) {
            return res.status(404).json({ msg: "Kompetisi tidak ditemukan." });
        }
        res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching kompetisi by ID:", error);
        res.status(500).json({ msg: error.message || "Kesalahan server saat mengambil detail kompetisi." });
    }
};

// --- ADMIN ACCESS (requires authentication and authorization) ---

// Membuat kompetisi baru
export const createKompetisi = async (req, res) => {
    const {
        judul, gambar, tanggal_mulai_pendaftaran,
        tanggal_akhir_pendaftaran, biaya_pendaftaran, tingkat_kompetisi,
        tentang_kompetisi, syarat_ketentuan,
        ketentuan_penilaian, manfaat_partisipasi, bantuan_didapat
    } = req.body;
    try {
        await KompetisiModel.create({
            judul, gambar, tanggal_mulai_pendaftaran,
            tanggal_akhir_pendaftaran, biaya_pendaftaran, tingkat_kompetisi,
            tentang_kompetisi, syarat_ketentuan,
            ketentuan_penilaian, manfaat_partisipasi, bantuan_didapat
        });
        res.status(201).json({ msg: "Kompetisi berhasil ditambahkan." });
    } catch (error) {
        console.error("Error creating kompetisi:", error);
        res.status(500).json({ msg: error.message || "Kesalahan server saat membuat kompetisi." });
    }
};

// Memperbarui kompetisi
export const updateKompetisi = async (req, res) => {
    const kompetisi = await KompetisiModel.findOne({
        where: { uuid: req.params.id }
    });
    if (!kompetisi) {
        return res.status(404).json({ msg: "Kompetisi tidak ditemukan." });
    }

    const {
        judul, gambar, tanggal_mulai_pendaftaran,
        tanggal_akhir_pendaftaran, biaya_pendaftaran, tingkat_kompetisi,
        tentang_kompetisi, syarat_ketentuan,
        ketentuan_penilaian, manfaat_partisipasi, bantuan_didapat
    } = req.body;
    try {
        await KompetisiModel.update({
            judul, gambar, tanggal_mulai_pendaftaran,
            tanggal_akhir_pendaftaran, biaya_pendaftaran, tingkat_kompetisi,
            tentang_kompetisi, syarat_ketentuan,
            ketentuan_penilaian, manfaat_partisipasi, bantuan_didapat
        }, {
            where: { uuid: req.params.id }
        });
        res.status(200).json({ msg: "Kompetisi berhasil diperbarui." });
    } catch (error) {
        console.error("Error updating kompetisi:", error);
        res.status(500).json({ msg: error.message || "Kesalahan server saat memperbarui kompetisi." });
    }
};

// Menghapus kompetisi
export const deleteKompetisi = async (req, res) => {
    const kompetisi = await KompetisiModel.findOne({
        where: { uuid: req.params.id }
    });
    if (!kompetisi) {
        return res.status(404).json({ msg: "Kompetisi tidak ditemukan." });
    }

    try {
        await KompetisiModel.destroy({
            where: { uuid: req.params.id }
        });
        res.status(200).json({ msg: "Kompetisi berhasil dihapus." });
    } catch (error) {
        console.error("Error deleting kompetisi:", error);
        res.status(500).json({ msg: error.message || "Kesalahan server saat menghapus kompetisi." });
    }
};