// controllers/ArticleController.js

import Article from "../models/ArticleModel.js";
import { Op } from "sequelize"; // Impor Op untuk operasi pencarian

// Mendapatkan semua artikel atau artikel berdasarkan kategori (akses publik)
export const getArticles = async (req, res) => {
    try {
        const { kategori } = req.query;

        let whereClause = {};

        if (kategori) {
            // UBAH DARI Op.iLike menjadi Op.like untuk MariaDB/MySQL
            // Di MariaDB/MySQL, LIKE seringkali sudah case-insensitive tergantung collation database
            whereClause.kategori = { [Op.like]: `%${kategori}%` };
        }

        const articles = await Article.findAll({
            where: whereClause,
            attributes: ['uuid', 'judul', 'deskripsi', 'gambar', 'link', 'penulis', 'kategori', 'createdAt', 'updatedAt'],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json(articles);
    } catch (error) {
        console.error("Error fetching articles:", error);
        res.status(500).json({ msg: error.message || "Kesalahan server saat mengambil artikel." });
    }
};

// Mendapatkan artikel berdasarkan UUID (akses publik)
export const getArticleById = async (req, res) => {
    try {
        const response = await Article.findOne({
            where: {
                uuid: req.params.id
            },
            attributes: ['uuid', 'judul', 'deskripsi', 'gambar', 'link', 'penulis', 'kategori', 'createdAt', 'updatedAt']
        });
        if (!response) {
            return res.status(404).json({ msg: "Artikel tidak ditemukan." });
        }
        res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching article by ID:", error); // Log error
        res.status(500).json({ msg: error.message || "Kesalahan server saat mengambil detail artikel." });
    }
};

// Membuat artikel baru (khusus admin)
export const createArticle = async (req, res) => {
    const { judul, deskripsi, gambar, link, penulis, kategori } = req.body;
    try {
        await Article.create({
            judul: judul,
            deskripsi: deskripsi,
            gambar: gambar,
            link: link,
            penulis: penulis,
            kategori: kategori
        });
        res.status(201).json({ msg: "Artikel berhasil ditambahkan." });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ msg: "Link artikel sudah ada." });
        }
        console.error("Error creating article:", error); // Log error
        res.status(500).json({ msg: error.message || "Kesalahan server saat membuat artikel." });
    }
};

// Memperbarui artikel (khusus admin)
export const updateArticle = async (req, res) => {
    const uuidToFind = req.params.id; // Simpan UUID ke variabel
    console.log(`[Backend] Menerima PUT request untuk UUID: ${uuidToFind}`);

    const article = await Article.findOne({
        where: {
            uuid: uuidToFind
        }
    });

    if (!article) {
        console.log(`[Backend] Artikel dengan UUID ${uuidToFind} tidak ditemukan.`);
        return res.status(404).json({ msg: "Artikel tidak ditemukan." });
    }

    console.log(`[Backend] Artikel ditemukan:`, article.toJSON()); // Log artikel yang ditemukan

    const { judul, deskripsi, gambar, link, penulis, kategori } = req.body;
    try {
        await Article.update({
            judul: judul,
            deskripsi: deskripsi,
            gambar: gambar,
            link: link,
            penulis: penulis,
            kategori: kategori
        }, {
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json({ msg: "Artikel berhasil diperbarui." });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ msg: "Link artikel sudah ada." });
        }
        console.error("Error updating article:", error); // Log error
        res.status(500).json({ msg: error.message || "Kesalahan server saat memperbarui artikel." });
    }
};

// Menghapus artikel (khusus admin)
export const deleteArticle = async (req, res) => {
    const article = await Article.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!article) {
        return res.status(404).json({ msg: "Artikel tidak ditemukan." });
    }

    try {
        await Article.destroy({
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json({ msg: "Artikel berhasil dihapus." });
    } catch (error) {
        console.error("Error deleting article:", error); // Log error
        res.status(500).json({ msg: error.message || "Kesalahan server saat menghapus artikel." });
    }
};

export const getArticlesByCategoryLimit = async (req, res) => {
    try {
        // Langkah 1: Ambil semua kategori unik
        const categories = await Article.findAll({
            attributes: ['kategori'],
            group: ['kategori']
        });

        const allArticles = [];

        // Langkah 2: Iterasi setiap kategori dan ambil 3 artikel terbaru
        for (const cat of categories) {
            const categoryName = cat.kategori;
            const articles = await Article.findAll({
                where: {
                    kategori: categoryName
                },
                attributes: ['uuid', 'judul', 'deskripsi', 'gambar', 'link', 'kategori'], // Pastikan semua atribut ini ada di model Article Anda
                order: [['createdAt', 'DESC']],
                limit: 1
            });
            allArticles.push(...articles);
        }

        // Opsional: Mengocok array jika ingin urutan acak
        // allArticles.sort(() => Math.random() - 0.5);

        res.status(200).json(allArticles);
    } catch (error) {
        console.error("Error fetching articles by category limit:", error); // <-- Ini log yang penting di backend
        res.status(500).json({ msg: error.message || "Kesalahan server saat mengambil artikel per kategori." });
    }
};