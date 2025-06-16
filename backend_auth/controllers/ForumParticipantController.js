// controllers/ForumParticipantController.js
import UserModel from "../models/UserModel.js";
import ForumModel from "../models/ForumModel.js";
import ForumParticipantModel from "../models/ForumParticipantModel.js";

// Mendapatkan semua forum yang diikuti oleh user yang sedang login
export const getJoinedForumsByUser = async (req, res) => {
    const userId = req.userId; // ID user dari middleware autentikasi

    try {
        const user = await UserModel.findOne({
            where: { id: userId },
            attributes: ['uuid', 'name', 'email'],
            include: [{
                model: ForumModel,
                as: 'joinedForums', // Alias dari relasi di app.js
                through: { attributes: ['joinedAt'] }, // Sertakan joinedAt dari tabel perantara
                attributes: ['uuid', 'judul', 'konten', 'kategori', 'createdAt'],
                include: [{
                    model: UserModel, // Include creator of the forum
                    as: 'creator',
                    attributes: ['name']
                }]
            }]
        });

        if (!user) {
            return res.status(404).json({ msg: "User tidak ditemukan." });
        }

        res.status(200).json(user.joinedForums);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// User bergabung ke forum
export const joinForum = async (req, res) => {
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

        // Cek apakah user sudah menjadi anggota forum ini
        const existingParticipant = await ForumParticipantModel.findOne({
            where: {
                userId: user.id,
                forumId: forum.id
            }
        });

        if (existingParticipant) {
            return res.status(409).json({ msg: "Anda sudah menjadi anggota forum ini." });
        }

        await ForumParticipantModel.create({
            userId: user.id,
            forumId: forum.id
        });

        res.status(201).json({ msg: "Anda berhasil bergabung ke forum." });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// User meninggalkan forum
export const leaveForum = async (req, res) => {
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

        const deletedRows = await ForumParticipantModel.destroy({
            where: {
                userId: user.id,
                forumId: forum.id
            }
        });

        if (deletedRows === 0) {
            return res.status(404).json({ msg: "Anda tidak ditemukan sebagai anggota forum ini." });
        }

        res.status(200).json({ msg: "Anda berhasil meninggalkan forum." });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};