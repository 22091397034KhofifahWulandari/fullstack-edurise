// controllers/PenilaianController.js

import PenilaianModel from "../models/PenilaianModel.js";
import EssayModel from "../models/EssayModel.js";
import UserModel from "../models/UserModel.js";
import { Op } from "sequelize";
import db from "../config/Database.js"; // Import koneksi database untuk transaksi

// --- Fungsi untuk Admin (Melakukan, Mengedit Penilaian) ---

// Menambahkan atau Memperbarui Penilaian Esai
export const createOrUpdatePenilaian = async (req, res) => {
    const adminId = req.userId;

    const {
        essayId,
        skor_struktur, feedback_struktur,
        skor_topik, feedback_topik,
        skor_grammar, feedback_grammar,
        skor_gaya, feedback_gaya,
        skor_panjang, feedback_panjang
    } = req.body;

    console.log("-----------------------------------------");
    console.log("Menerima request penilaian untuk essayId:", essayId, "oleh adminId:", adminId);
    console.log("Skor diterima:", { skor_struktur, skor_topik, skor_grammar, skor_gaya, skor_panjang });
    console.log("-----------------------------------------");


    if (!essayId || !adminId) {
        console.log("Error: Essay ID atau Admin ID tidak ada.");
        return res.status(400).json({ msg: "Essay ID dan Admin ID diperlukan." });
    }

    const validateScore = (score) => {
        return typeof score === 'number' && score >= 0 && score <= 20;
    };

    if (!validateScore(skor_struktur) || !validateScore(skor_topik) ||
        !validateScore(skor_grammar) || !validateScore(skor_gaya) ||
        !validateScore(skor_panjang)) {
        console.log("Error: Validasi skor gagal.");
        return res.status(400).json({ msg: "Skor harus berupa angka antara 0 dan 20 untuk setiap kriteria." });
    }

    // Mulai transaksi
    const transaction = await db.transaction();
    console.log("Transaksi dimulai.");

    try {
        const essay = await EssayModel.findByPk(essayId, { transaction });
        if (!essay) {
            console.log("Error: Esai tidak ditemukan untuk essayId:", essayId);
            await transaction.rollback();
            console.log("Transaksi di-rollback karena esai tidak ditemukan.");
            return res.status(404).json({ msg: "Esai tidak ditemukan." });
        }
        console.log("Esai ditemukan. Current total_skor di DB:", essay.total_skor);


        let penilaian = await PenilaianModel.findOne({
            where: {
                essayId: essayId,
                userId: adminId
            },
            transaction
        });

        const totalSkorUntukPenilaianIni = skor_struktur + skor_topik + skor_grammar + skor_gaya + skor_panjang;
        let isNewRecord = false;

        if (penilaian) {
            console.log("Penilaian sudah ada, melakukan update.");
            await penilaian.update({
                skor_struktur, feedback_struktur,
                skor_topik, feedback_topik,
                skor_grammar, feedback_grammar,
                skor_gaya, feedback_gaya,
                skor_panjang, feedback_panjang,
                tanggal_review: new Date()
            }, { transaction });
            console.log("Penilaian berhasil diupdate.");
        } else {
            console.log("Penilaian belum ada, membuat yang baru.");
            penilaian = await PenilaianModel.create({
                essayId: essayId,
                userId: adminId,
                skor_struktur, feedback_struktur,
                skor_topik, feedback_topik,
                skor_grammar, feedback_grammar,
                skor_gaya, feedback_gaya,
                skor_panjang, feedback_panjang,
            }, { transaction });
            isNewRecord = true;
            console.log("Penilaian baru berhasil dibuat.");
        }

        // --- PENTING: Perbarui total_skor dan feedback_ready di EssayModel dalam transaksi yang sama ---
        console.log("Memperbarui EssayModel. total_skor baru:", totalSkorUntukPenilaianIni);
        await essay.update({
            total_skor: totalSkorUntukPenilaianIni,
            feedback_ready: 1
        }, { transaction });
        console.log("EssayModel berhasil diupdate.");

        // Komit transaksi jika semua operasi berhasil
        await transaction.commit();
        console.log("Transaksi berhasil dikomit.");

        // Sekarang kirim respons, setelah semua update database berhasil
        res.status(isNewRecord ? 201 : 200).json({
            msg: `Penilaian esai berhasil ${isNewRecord ? 'ditambahkan' : 'diperbarui'}.`,
            penilaian: {
                ...penilaian.toJSON(),
                total_skor: totalSkorUntukPenilaianIni
            }
        });
        console.log("Respons API dikirim.");

    } catch (error) {
        // Rollback transaksi jika terjadi error
        if (transaction) {
            await transaction.rollback();
            console.log("Transaksi di-rollback karena error.");
        }
        console.error("Kesalahan saat create/update essay penilaian:", error);
        res.status(500).json({ msg: error.message || "Kesalahan server saat menyimpan penilaian esai." });
    }
};

// ... (fungsi getPenilaianById dan deletePenilaian tetap sama dengan versi terakhir yang sudah diperbaiki)
// Pastikan getPenilaianById juga mencetak total_skor yang dihitung

export const getPenilaianById = async (req, res) => {
    const penilaianId = req.params.id;
    console.log("Menerima request getPenilaianById untuk ID:", penilaianId);

    try {
        const penilaian = await PenilaianModel.findByPk(penilaianId, {
            attributes: [
                'id', 'skor_struktur', 'feedback_struktur',
                'skor_topik', 'feedback_topik',
                'skor_grammar', 'feedback_grammar',
                'skor_gaya', 'feedback_gaya',
                'skor_panjang', 'feedback_panjang',
                'tanggal_review', 'createdAt', 'updatedAt'
            ],
            include: [
                {
                    model: EssayModel,
                    as: 'essay',
                    attributes: ['id', 'isi_essay', 'total_skor', 'feedback_ready'],
                    include: [{
                        model: UserModel,
                        as: 'userSubmitter',
                        attributes: ['uuid', 'name']
                    }]
                },
                {
                    model: UserModel,
                    as: 'adminPenilai',
                    attributes: ['uuid', 'name', 'email']
                }
            ]
        });

        if (!penilaian) {
            console.log("Detail penilaian tidak ditemukan untuk ID:", penilaianId);
            return res.status(404).json({ msg: "Detail penilaian tidak ditemukan." });
        }

        const totalSkorPenilaianIni =
            penilaian.skor_struktur +
            penilaian.skor_topik +
            penilaian.skor_grammar +
            penilaian.skor_gaya +
            penilaian.skor_panjang;

        const responseData = {
            ...penilaian.toJSON(),
            total_skor: totalSkorPenilaianIni
        };
        console.log("Mengirim respons untuk getPenilaianById. total_skor:", totalSkorPenilaianIni);
        res.status(200).json(responseData);
    } catch (error) {
        console.error("Error fetching penilaian by ID:", error);
        res.status(500).json({ msg: error.message || "Kesalahan server saat mengambil detail penilaian." });
    }
};

// deletePenilaian tetap sama seperti yang sudah diperbaiki sebelumnya
export const deletePenilaian = async (req, res) => {
    const penilaian = await PenilaianModel.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!penilaian) {
        return res.status(404).json({ msg: "Penilaian tidak ditemukan." });
    }

    const transaction = await db.transaction();

    try {
        const essay = await EssayModel.findByPk(penilaian.essayId, { transaction });
        if (essay) {
            const otherPenilaianCount = await PenilaianModel.count({
                where: {
                    essayId: penilaian.essayId,
                    id: { [Op.ne]: penilaian.id }
                },
                transaction
            });

            if (otherPenilaianCount === 0) {
                await essay.update({
                    total_skor: 0,
                    feedback_ready: 0
                }, { transaction });
            } else {
                const remainingPenilaian = await PenilaianModel.findAll({
                    where: {
                        essayId: penilaian.essayId,
                        id: { [Op.ne]: penilaian.id }
                    },
                    transaction
                });
                let newTotalScore = 0;
                remainingPenilaian.forEach(p => {
                    newTotalScore += p.skor_struktur + p.skor_topik + p.skor_grammar + p.skor_gaya + p.skor_panjang;
                });
                await essay.update({ total_skor: newTotalScore }, { transaction });
            }
        }

        await PenilaianModel.destroy({
            where: {
                id: req.params.id
            },
            transaction
        });

        await transaction.commit();

        res.status(200).json({ msg: "Penilaian berhasil dihapus." });
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        console.error("Error deleting penilaian:", error);
        res.status(500).json({ msg: error.message || "Kesalahan server saat menghapus penilaian." });
    }
};