// routes/PortofolioRoutes.js
import express from "express";
import {
    getAllPortofolios,
    getPortofolioById,
    createPortofolio,
    updatePortofolio,
    deletePortofolio
} from "../controllers/PortofolioController.js";
import { verifyUser } from "../middleware/AuthUser.js"; // Middleware untuk otentikasi user

const router = express.Router();

// Rute untuk mendapatkan semua portofolio user yang sedang login
router.get('/portofolio', verifyUser, getAllPortofolios);
// Rute untuk mendapatkan portofolio berdasarkan ID spesifik
router.get('/portofolio/:id', verifyUser, getPortofolioById);
// Rute untuk membuat portofolio baru (termasuk upload file)
router.post('/portofolio', verifyUser, createPortofolio);
// Rute untuk memperbarui portofolio berdasarkan ID (termasuk opsional upload file baru)
router.patch('/portofolio/:id', verifyUser, updatePortofolio);
// Rute untuk menghapus portofolio berdasarkan ID
router.delete('/portofolio/:id', verifyUser, deletePortofolio);

export default router;