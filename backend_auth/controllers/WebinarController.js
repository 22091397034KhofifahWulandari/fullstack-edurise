// controllers/WebinarController.js

import Webinar from "../models/WebinarModel.js";
import { Op } from "sequelize";

// --- FUNGSI AKSES PUBLIK ---

/**
 * Mendapatkan semua webinar atau webinar berdasarkan kategori dan/atau status.
 * Mendukung filter by kategori dan status melalui query parameter.
 */
export const getWebinars = async (req, res) => {
    try {
        const { kategori, status } = req.query;

        let whereClause = {};

        if (kategori) {
            whereClause.kategori = { [Op.like]: `%${kategori}%` };
        }
        if (status) {
            const validStatuses = ['upcoming', 'completed', 'cancelled'];
            if (!validStatuses.includes(status.toLowerCase())) {
                return res.status(400).json({ msg: "Status webinar tidak valid. Pilih antara 'upcoming', 'completed', atau 'cancelled'." });
            }
            whereClause.status = status.toLowerCase();
        }

        const webinars = await Webinar.findAll({
            where: whereClause,
            attributes: [
                'uuid', 'judul', 'deskripsi', 'gambar', 'link_webinar', 'penyelenggara',
                'kategori', 'tanggal_pelaksanaan', 'jam_pelaksanaan', 'narasumber',
                'link_rekaman', 'link_sertifikat', 'status', 'createdAt', 'updatedAt'
            ],
            order: [['createdAt', 'DESC']]
        });

        if (webinars.length === 0) {
            return res.status(404).json({ msg: "Tidak ada webinar ditemukan dengan kriteria tersebut." });
        }

        res.status(200).json(webinars);
    } catch (error) {
        console.error("Error fetching webinars:", error);
        res.status(500).json({ msg: "Kesalahan server saat mengambil webinar.", error: error.message });
    }
};

/**
 * Mendapatkan detail webinar berdasarkan UUID.
 */
export const getWebinarById = async (req, res) => {
    try {
        const webinar = await Webinar.findOne({
            where: {
                uuid: req.params.id
            },
            attributes: [
                'uuid', 'judul', 'deskripsi', 'gambar', 'link_webinar', 'penyelenggara',
                'kategori', 'tanggal_pelaksanaan', 'jam_pelaksanaan', 'narasumber',
                'link_rekaman', 'link_sertifikat', 'status', 'createdAt', 'updatedAt'
            ]
        });
        if (!webinar) {
            return res.status(404).json({ msg: "Webinar tidak ditemukan." });
        }
        res.status(200).json(webinar);
    } catch (error) {
        console.error("Error fetching webinar by ID:", error);
        res.status(500).json({ msg: "Kesalahan server saat mengambil detail webinar.", error: error.message });
    }
};

/**
 * Mendapatkan satu webinar terbaru dari setiap kategori, biasanya yang berstatus 'upcoming'.
 */
export const getWebinarsByCategoryLimit = async (req, res) => {
    try {
        const categories = await Webinar.findAll({
            attributes: ['kategori'],
            group: ['kategori'],
            raw: true
        });

        const latestWebinarsPerCategory = [];

        for (const cat of categories) {
            const categoryName = cat.kategori;
            const webinar = await Webinar.findOne({
                where: {
                    kategori: categoryName,
                    status: 'upcoming' // Umumnya hanya tampilkan yang akan datang
                },
                attributes: [
                    'uuid', 'judul', 'deskripsi', 'gambar', 'link', 'kategori',
                    'tanggal_pelaksanaan', 'jam_pelaksanaan', 'status', 'createdAt'
                ],
                order: [['createdAt', 'DESC']]
            });
            if (webinar) {
                latestWebinarsPerCategory.push(webinar);
            }
        }

        if (latestWebinarsPerCategory.length === 0) {
            return res.status(404).json({ msg: "Tidak ada webinar mendatang ditemukan di setiap kategori." });
        }

        res.status(200).json(latestWebinarsPerCategory);
    } catch (error) {
        console.error("Error fetching webinars by category limit:", error);
        res.status(500).json({ msg: "Kesalahan server saat mengambil webinar per kategori.", error: error.message });
    }
};

// --- FUNGSI AKSES ADMIN (membutuhkan middleware verifyUser & adminOnly) ---

/**
 * Membuat webinar baru.
 * Hanya bisa diakses oleh admin.
 */
export const createWebinar = async (req, res) => {
    const {
        judul, deskripsi, gambar, link_webinar, penyelenggara,
        kategori, tanggal_pelaksanaan, jam_pelaksanaan, narasumber,
        link_rekaman, link_sertifikat, status
    } = req.body;
    try {
        await Webinar.create({
            judul, deskripsi, gambar, link_webinar, penyelenggara,
            kategori, tanggal_pelaksanaan, jam_pelaksanaan, narasumber,
            link_rekaman, link_sertifikat, status
        });
        res.status(201).json({ msg: "Webinar berhasil ditambahkan." });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ msg: "Link webinar sudah ada. Mohon gunakan link lain." });
        }
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            return res.status(400).json({ msg: "Validasi data gagal.", errors: errors });
        }
        console.error("Error creating webinar:", error);
        res.status(500).json({ msg: "Kesalahan server saat membuat webinar.", error: error.message });
    }
};

/**
 * Memperbarui data webinar berdasarkan UUID.
 * Hanya bisa diakses oleh admin.
 */
export const updateWebinar = async (req, res) => {
    const webinar = await Webinar.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!webinar) {
        return res.status(404).json({ msg: "Webinar tidak ditemukan." });
    }

    const {
        judul, deskripsi, gambar, link_webinar, penyelenggara,
        kategori, tanggal_pelaksanaan, jam_pelaksanaan, narasumber,
        link_rekaman, link_sertifikat, status
    } = req.body;
    try {
        await Webinar.update({
            judul, deskripsi, gambar, link_webinar, penyelenggara,
            kategori, tanggal_pelaksanaan, jam_pelaksanaan, narasumber,
            link_rekaman, link_sertifikat, status
        }, {
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json({ msg: "Webinar berhasil diperbarui." });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ msg: "Link webinar sudah ada. Mohon gunakan link lain." });
        }
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            return res.status(400).json({ msg: "Validasi data gagal.", errors: errors });
        }
        console.error("Error updating webinar:", error);
        res.status(500).json({ msg: "Kesalahan server saat memperbarui webinar.", error: error.message });
    }
};

/**
 * Menghapus webinar berdasarkan UUID.
 * Hanya bisa diakses oleh admin.
 */
export const deleteWebinar = async (req, res) => {
    const webinar = await Webinar.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!webinar) {
        return res.status(404).json({ msg: "Webinar tidak ditemukan." });
    }

    try {
        await Webinar.destroy({
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json({ msg: "Webinar berhasil dihapus." });
    } catch (error) {
        console.error("Error deleting webinar:", error);
        res.status(500).json({ msg: "Kesalahan server saat menghapus webinar.", error: error.message });
    }
};