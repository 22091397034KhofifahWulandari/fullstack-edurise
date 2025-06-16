// controllers/EssayController.js
import EssayModel from "../models/EssayModel.js";
import UserModel from "../models/UserModel.js";
import PenilaianModel from "../models/PenilaianModel.js";
// import { Op } from "sequelize"; // Tidak diperlukan untuk saat ini di controller ini

// --- Fungsi untuk User Biasa (Menulis & Melihat Esai Milik Sendiri) ---

// Mengirim Esai Baru
export const createEssay = async (req, res) => {
    // userId akan didapat dari middleware autentikasi (misal: req.userId dari verifyUser)
    const userId = req.userId; // Dapatkan userId dari user yang login
    const { isi_essay } = req.body;

    if (!isi_essay) {
        return res.status(400).json({ msg: "Isi esai tidak boleh kosong." });
    }

    try {
        const newEssay = await EssayModel.create({ // Tangkap objek esai yang baru dibuat
            userId: userId,
            isi_essay: isi_essay,
            // tanggal_submit otomatis karena defaultValue di model
            // total_skor otomatis 0 karena defaultValue di model
            // feedback_ready otomatis 0 karena defaultValue di model
        });
        // PENTING: Mengembalikan ID esai yang baru dibuat
        res.status(201).json({ msg: "Esai berhasil dikirim dan menunggu penilaian.", essayId: newEssay.id });
    } catch (error) {
        console.error("Error submitting essay:", error);
        res.status(500).json({ msg: error.message || "Kesalahan server saat mengirim esai." });
    }
};

// Mendapatkan Semua Esai Milik User yang Sedang Login
export const getMyEssays = async (req, res) => {
    const userId = req.userId; // Dapatkan userId dari user yang login

    try {
        const essays = await EssayModel.findAll({
            where: {
                userId: userId
            },
            attributes: ['id', 'isi_essay', 'tanggal_submit', 'total_skor', 'feedback_ready', 'createdAt', 'updatedAt'],
            include: [{
                model: PenilaianModel,
                as: 'penilaianEssays', // Sesuai 'as' di models/index.js
                attributes: [
                    'skor_struktur', 'feedback_struktur',
                    'skor_topik', 'feedback_topik',
                    'skor_grammar', 'feedback_grammar',
                    'skor_gaya', 'feedback_gaya',
                    'skor_panjang', 'feedback_panjang',
                    'tanggal_review'
                ],
                // Anda bisa meng-include model User di dalam PenilaianModel jika ingin menampilkan nama admin penilai
                include: [{
                    model: UserModel,
                    as: 'adminPenilai', // Sesuai 'as' di models/index.js
                    attributes: ['uuid', 'name', 'email'] // Hanya ambil data yang diperlukan
                }]
            }],
            order: [['tanggal_submit', 'DESC']]
        });

        if (essays.length === 0) {
            return res.status(404).json({ msg: "Anda belum memiliki esai yang dikirim." });
        }

        res.status(200).json(essays);
    } catch (error) {
        console.error("Error fetching user's essays:", error);
        res.status(500).json({ msg: error.message || "Kesalahan server saat mengambil esai Anda." });
    }
};

// Mendapatkan Detail Esai Milik User (termasuk penilaian jika sudah ada)
export const getMyEssayById = async (req, res) => {
    const userId = req.userId; // Dapatkan userId dari user yang login
    const essayId = req.params.id; // ID esai dari parameter URL

    try {
        const essay = await EssayModel.findOne({
            where: {
                id: essayId,
                userId: userId // Pastikan hanya bisa melihat esai miliknya sendiri
            },
            attributes: ['id', 'isi_essay', 'tanggal_submit', 'total_skor', 'feedback_ready', 'createdAt', 'updatedAt'],
            include: [{
                model: PenilaianModel,
                as: 'penilaianEssays', // Sesuai 'as' di models/index.js
                attributes: [
                    'skor_struktur', 'feedback_struktur',
                    'skor_topik', 'feedback_topik',
                    'skor_grammar', 'feedback_grammar',
                    'skor_gaya', 'feedback_gaya',
                    'skor_panjang', 'feedback_panjang',
                    'tanggal_review'
                ],
                include: [{
                    model: UserModel,
                    as: 'adminPenilai', // Sesuai 'as' di models/index.js
                    attributes: ['uuid', 'name', 'email']
                }]
            }]
        });

        if (!essay) {
            return res.status(404).json({ msg: "Esai tidak ditemukan atau bukan milik Anda." });
        }

        res.status(200).json(essay);
    } catch (error) {
        console.error("Error fetching specific essay:", error);
        res.status(500).json({ msg: error.message || "Kesalahan server saat mengambil detail esai." });
    }
};

// --- Fungsi untuk Admin (Melihat Semua Esai, Filter, Update Status) ---

// Mendapatkan Semua Esai (untuk admin, bisa difilter berdasarkan status penilaian)
export const getAllEssays = async (req, res) => {
    // Diasumsikan middleware verifyAdmin sudah berjalan sebelum fungsi ini
    const { feedbackReady } = req.query; // Query param: '0' (belum dinilai) atau '1' (sudah dinilai)

    let whereClause = {};
    if (feedbackReady !== undefined) {
        // Konversi string '0'/'1' ke boolean jika perlu, atau biarkan string jika DB menangani TINYINT(1) sebagai 0/1
        whereClause.feedback_ready = feedbackReady;
    }

    try {
        const essays = await EssayModel.findAll({
            where: whereClause,
            attributes: ['id', 'isi_essay', 'tanggal_submit', 'total_skor', 'feedback_ready', 'createdAt', 'updatedAt'],
            include: [
                {
                    model: UserModel,
                    as: 'userSubmitter', // Sesuai 'as' di models/index.js
                    attributes: ['uuid', 'name', 'email'] // Tampilkan informasi user yang submit
                },
                {
                    model: PenilaianModel,
                    as: 'penilaianEssays', // Sesuai 'as' di models/index.js
                    attributes: [
                        'id', 'skor_struktur', 'feedback_struktur',
                        'skor_topik', 'feedback_topik',
                        'skor_grammar', 'feedback_grammar',
                        'skor_gaya', 'feedback_gaya',
                        'skor_panjang', 'feedback_panjang',
                        'tanggal_review'
                    ],
                    // Include admin penilai di dalam penilaian jika perlu
                    include: [{
                        model: UserModel,
                        as: 'adminPenilai', // Sesuai 'as' di models/index.js
                        attributes: ['uuid', 'name']
                    }]
                }
            ],
            order: [['tanggal_submit', 'ASC']] // Esai yang paling lama belum dinilai muncul duluan
        });
        res.status(200).json(essays);
    } catch (error) {
        console.error("Error fetching all essays for admin:", error);
        res.status(500).json({ msg: error.message || "Kesalahan server saat mengambil semua esai." });
    }
};

// Mendapatkan Detail Esai untuk Admin (termasuk semua penilaian)
export const getEssayByIdForAdmin = async (req, res) => {
    // Diasumsikan middleware verifyAdmin sudah berjalan
    const essayId = req.params.id;

    try {
        const essay = await EssayModel.findOne({
            where: {
                id: essayId
            },
            attributes: ['id', 'isi_essay', 'tanggal_submit', 'total_skor', 'feedback_ready', 'createdAt', 'updatedAt'],
            include: [
                {
                    model: UserModel,
                    as: 'userSubmitter',
                    attributes: ['uuid', 'name', 'email']
                },
                {
                    model: PenilaianModel,
                    as: 'penilaianEssays',
                    attributes: [
                        'id', 'skor_struktur', 'feedback_struktur',
                        'skor_topik', 'feedback_topik',
                        'skor_grammar', 'feedback_grammar',
                        'skor_gaya', 'feedback_gaya',
                        'skor_panjang', 'feedback_panjang',
                        'tanggal_review'
                    ],
                    include: [{
                        model: UserModel,
                        as: 'adminPenilai',
                        attributes: ['uuid', 'name']
                    }]
                }
            ]
        });

        if (!essay) {
            return res.status(404).json({ msg: "Esai tidak ditemukan." });
        }
        res.status(200).json(essay);
    } catch (error) {
        console.error("Error fetching essay by ID for admin:", error);
        res.status(500).json({ msg: error.message || "Kesalahan server saat mengambil detail esai." });
    }
};

// Fungsi untuk menghapus esai (khusus admin)
export const deleteEssay = async (req, res) => {
    // Diasumsikan middleware verifyAdmin sudah berjalan
    const essay = await EssayModel.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!essay) {
        return res.status(404).json({ msg: "Esai tidak ditemukan." });
    }

    try {
        await EssayModel.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Esai berhasil dihapus." });
    } catch (error) {
        console.error("Error deleting essay:", error);
        res.status(500).json({ msg: error.message || "Kesalahan server saat menghapus esai." });
    }
};