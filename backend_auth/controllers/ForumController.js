import ForumModel from "../models/ForumModel.js";
import UserModel from "../models/UserModel.js";

export const getForums = async (req, res) => {
    try {
        const forums = await ForumModel.findAll({
            attributes: ['uuid', 'judul', 'konten', 'kategori', 'createdAt', 'userId', 'discordLink'],
            include: [{
                model: UserModel,
                as: 'creator',
                attributes: ['uuid', 'name']
            }]
        });

        const userIdLogin = req.userId;
        const response = forums.map(forum => {
            const forumData = forum.toJSON();
            forumData.isOwner = userIdLogin ? (forumData.userId === userIdLogin) : false;
            delete forumData.userId;
            return forumData;
        });

        res.status(200).json(response);
    } catch (error) {
        console.error("Error in getForums:", error);
        res.status(500).json({ msg: "Terjadi kesalahan saat mengambil daftar forum." });
    }
};

export const getForumById = async (req, res) => {
    try {
        const forum = await ForumModel.findOne({
            where: { uuid: req.params.id },
            attributes: ['uuid', 'judul', 'konten', 'kategori', 'createdAt', 'userId', 'discordLink'],
            include: [{
                model: UserModel,
                as: 'creator',
                attributes: ['uuid', 'name']
            }]
        });

        if (!forum) {
            return res.status(404).json({ msg: "Forum tidak ditemukan." });
        }

        const userIdLogin = req.userId;
        const forumData = forum.toJSON();
        forumData.isOwner = userIdLogin ? (forumData.userId === userIdLogin) : false;
        delete forumData.userId;

        res.status(200).json(forumData);
    } catch (error) {
        console.error("Error in getForumById:", error);
        res.status(500).json({ msg: "Terjadi kesalahan saat mengambil detail forum." });
    }
};

export const createForum = async (req, res) => {
    const { judul, konten, kategori, discordLink } = req.body;
    if (!req.userId) {
        return res.status(401).json({ msg: "Autentikasi diperlukan untuk membuat forum." });
    }
    const userId = req.userId;

    if (!judul || !konten || !kategori) {
        return res.status(400).json({ msg: "Judul, konten, dan kategori tidak boleh kosong." });
    }

    try {
        await ForumModel.create({
            userId: userId,
            judul: judul,
            konten: konten,
            kategori: kategori,
            discordLink: discordLink || null
        });
        res.status(201).json({ msg: "Forum berhasil dibuat." });
    } catch (error) {
        console.error("Error in createForum:", error);
        res.status(500).json({ msg: "Terjadi kesalahan saat membuat forum." });
    }
};

export const updateForum = async (req, res) => {
    try {
        const forum = await ForumModel.findOne({
            where: { uuid: req.params.id }
        });

        if (!forum) {
            return res.status(404).json({ msg: "Forum tidak ditemukan." });
        }

        if (!req.userId || req.userId !== forum.userId) {
            return res.status(403).json({ msg: "Anda tidak berhak memperbarui forum ini." });
        }

        const { judul, konten, kategori, discordLink } = req.body;

        if (!judul || !konten || !kategori) {
            return res.status(400).json({ msg: "Judul, konten, dan kategori tidak boleh kosong." });
        }

        await ForumModel.update({
            judul: judul,
            konten: konten,
            kategori: kategori,
            discordLink: discordLink
        }, {
            where: { uuid: req.params.id }
        });
        res.status(200).json({ msg: "Forum berhasil diperbarui." });
    } catch (error) {
        console.error("Error in updateForum:", error);
        res.status(500).json({ msg: "Terjadi kesalahan saat memperbarui forum." });
    }
};

export const deleteForum = async (req, res) => {
    try {
        const forum = await ForumModel.findOne({
            where: { uuid: req.params.id }
        });

        if (!forum) {
            return res.status(404).json({ msg: "Forum tidak ditemukan." });
        }

        if (!req.userId || req.userId !== forum.userId) {
            return res.status(403).json({ msg: "Anda tidak berhak menghapus forum ini." });
        }

        await ForumModel.destroy({
            where: { uuid: req.params.id }
        });
        res.status(200).json({ msg: "Forum berhasil dihapus." });
    } catch (error) {
        console.error("Error in deleteForum:", error);
        res.status(500).json({ msg: "Terjadi kesalahan saat menghapus forum." });
    }
};