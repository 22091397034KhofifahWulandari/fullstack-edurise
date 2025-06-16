// controllers/UserSavedForumController.js
import UserModel from "../models/UserModel.js";
import ForumModel from "../models/ForumModel.js";
import UserSavedForumModel from "../models/UserSavedForumModel.js";

// Mendapatkan semua forum yang disimpan oleh user yang sedang login
export const getSavedForumsByUser = async (req, res) => {
    const userId = req.userId; // ID user dari middleware autentikasi

    try {
        const user = await UserModel.findOne({
            where: { id: userId },
            attributes: ['uuid', 'name', 'email'],
            include: [{
                model: ForumModel,
                as: 'userSavedForums', // <--- INI PERUBAHANNYA: Sesuaikan dengan alias di models/index.js
                through: { attributes: [] }, // Jangan sertakan kolom dari tabel perantara
                attributes: ['uuid', 'judul', 'konten', 'kategori', 'createdAt'],
                include: [{
                    model: UserModel, // Include creator of the forum
                    as: 'creator', // Ini sudah benar karena alias 'creator' didefinisikan di ForumModel
                    attributes: ['name']
                }]
            }]
        });

        if (!user) {
            return res.status(404).json({ msg: "User tidak ditemukan." });
        }

        // Pastikan Anda mengakses data melalui alias yang benar
        res.status(200).json(user.userSavedForums);
    } catch (error) {
        console.error("Error saat mengambil forum yang disimpan:", error); // Tambahkan logging lebih detail
        res.status(500).json({ msg: error.message });
    }
};

// Menyimpan forum ke profil user
export const saveForumToProfile = async (req, res) => {
    const userId = req.userId;
    const { forumId } = req.body; // Menerima UUID forum dari frontend

    if (!forumId) {
        return res.status(400).json({ msg: "ID Forum diperlukan." });
    }

    try {
        const user = await UserModel.findOne({ where: { id: userId } });
        const forum = await ForumModel.findOne({ where: { uuid: forumId } });

        if (!user) {
            return res.status(404).json({ msg: "User tidak ditemukan." });
        }
        if (!forum) {
            return res.status(404).json({ msg: "Forum tidak ditemukan." });
        }

        const existingSave = await UserSavedForumModel.findOne({
            where: {
                userId: user.id,
                forumId: forum.id
            }
        });

        if (existingSave) {
            return res.status(409).json({ msg: "Forum ini sudah tersimpan di profil Anda." });
        }

        await UserSavedForumModel.create({
            userId: user.id,
            forumId: forum.id
        });

        res.status(201).json({ msg: "Forum berhasil disimpan di profil Anda." });
    } catch (error) {
        console.error("Error saat menyimpan forum:", error); // Tambahkan logging lebih detail
        res.status(500).json({ msg: error.message });
    }
};

// Menghapus forum dari profil user
export const removeSavedForumFromProfile = async (req, res) => {
    const userId = req.userId;
    const { forumId } = req.params; // Menerima UUID forum dari URL params

    try {
        const user = await UserModel.findOne({ where: { id: userId } });
        const forum = await ForumModel.findOne({ where: { uuid: forumId } });

        if (!user) {
            return res.status(404).json({ msg: "User tidak ditemukan." });
        }
        if (!forum) {
            return res.status(404).json({ msg: "Forum tidak ditemukan." });
        }

        const deletedRows = await UserSavedForumModel.destroy({
            where: {
                userId: user.id,
                forumId: forum.id
            }
        });

        if (deletedRows === 0) {
            return res.status(404).json({ msg: "Forum tidak ditemukan di daftar simpanan Anda." });
        }

        res.status(200).json({ msg: "Forum berhasil dihapus dari profil Anda." });
    } catch (error) {
        console.error("Error saat menghapus forum yang disimpan:", error); // Tambahkan logging lebih detail
        res.status(500).json({ msg: error.message });
    }
};