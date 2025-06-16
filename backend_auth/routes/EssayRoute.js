// routes/EssayRoute.js
import express from "express";
import {
    createEssay,
    getMyEssays,
    getMyEssayById,
    getAllEssays,
    getEssayByIdForAdmin,
    deleteEssay
} from "../controllers/EssayController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js"; // Import middleware

const router = express.Router();

// Rute untuk user biasa (siswa)
router.post('/essays', verifyUser, createEssay); // Submit esai
router.get('/myessays', verifyUser, getMyEssays); // Lihat semua esai milik sendiri
router.get('/myessays/:id', verifyUser, getMyEssayById); // Lihat detail esai milik sendiri

// Rute untuk admin
router.get('/admin/essays', verifyUser, adminOnly, getAllEssays); // Lihat semua esai (bisa filter)
router.get('/admin/essays/:id', verifyUser, adminOnly, getEssayByIdForAdmin); // Lihat detail esai untuk admin
router.delete('/admin/essays/:id', verifyUser, adminOnly, deleteEssay); // Hapus esai oleh admin

export default router;