// controllers/OrangTuaController.js
import { OrangTuaModel, UserModel } from "../models/index.js";

// Mendapatkan data orang tua untuk user yang sedang login
export const getOrangTuaByUserId = async (req, res) => {
    try {
        const userId = req.userId; // Dari verifyUser middleware
        const orangTua = await OrangTuaModel.findOne({
            where: { userId: userId }
        });
        if (!orangTua) return res.status(404).json({ msg: "Data orang tua tidak ditemukan untuk user ini." });
        res.status(200).json(orangTua);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Membuat data orang tua baru (hanya boleh satu per user)
export const createOrangTua = async (req, res) => {
    // Ambil semua kolom yang relevan dari request body
    const {
        nama_ayah, ttl_ayah, alamat_ayah, no_telp_ayah, pendidikan_ayah, pekerjaan_ayah, penghasilan_ayah,
        nama_ibu, ttl_ibu, alamat_ibu, no_telp_ibu, pendidikan_ibu, pekerjaan_ibu, penghasilan_ibu
    } = req.body;

    try {
        const userId = req.userId; // Dari verifyUser middleware

        const existingOrangTua = await OrangTuaModel.findOne({ where: { userId: userId } });
        if (existingOrangTua) {
            return res.status(400).json({ msg: "Data orang tua sudah ada untuk user ini. Silakan perbarui." });
        }

        const orangTua = await OrangTuaModel.create({
            userId,
            nama_ayah, ttl_ayah, alamat_ayah, no_telp_ayah, pendidikan_ayah, pekerjaan_ayah, penghasilan_ayah,
            nama_ibu, ttl_ibu, alamat_ibu, no_telp_ibu, pendidikan_ibu, pekerjaan_ibu, penghasilan_ibu
        });
        res.status(201).json({ msg: "Data orang tua berhasil ditambahkan", data: orangTua });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Memperbarui data orang tua user yang sedang login
export const updateOrangTua = async (req, res) => {
    // Ambil semua kolom yang relevan dari request body
    const {
        nama_ayah, ttl_ayah, alamat_ayah, no_telp_ayah, pendidikan_ayah, pekerjaan_ayah, penghasilan_ayah,
        nama_ibu, ttl_ibu, alamat_ibu, no_telp_ibu, pendidikan_ibu, pekerjaan_ibu, penghasilan_ibu
    } = req.body;

    try {
        const userId = req.userId; // Dari verifyUser middleware

        const [updatedRows] = await OrangTuaModel.update({
            nama_ayah, ttl_ayah, alamat_ayah, no_telp_ayah, pendidikan_ayah, pekerjaan_ayah, penghasilan_ayah,
            nama_ibu, ttl_ibu, alamat_ibu, no_telp_ibu, pendidikan_ibu, pekerjaan_ibu, penghasilan_ibu
        }, {
            where: { userId: userId }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ msg: "Data orang tua tidak ditemukan atau tidak ada perubahan." });
        }
        res.status(200).json({ msg: "Data orang tua berhasil diperbarui" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Menghapus data orang tua user yang sedang login
export const deleteOrangTua = async (req, res) => {
    try {
        const userId = req.userId; // Dari verifyUser middleware
        const deletedRows = await OrangTuaModel.destroy({
            where: { userId: userId }
        });

        if (deletedRows === 0) {
            return res.status(404).json({ msg: "Data orang tua tidak ditemukan." });
        }
        res.status(200).json({ msg: "Data orang tua berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};