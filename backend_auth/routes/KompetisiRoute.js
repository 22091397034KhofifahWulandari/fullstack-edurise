// routes/KompetisiRoute.js
import express from "express";
import {
    getKompetisis,
    getKompetisiById,
    createKompetisi,
    updateKompetisi,
    deleteKompetisi
} from "../controllers/KompetisiController.js";
// Asumsi ada middleware autentikasi Anda
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

// Public routes
router.get('/kompetisi', getKompetisis);
router.get('/kompetisi/:id', getKompetisiById); // Menggunakan UUID sebagai :id

// Admin routes (membutuhkan autentikasi dan otorisasi admin)
// Tambahkan middleware verifyUser dan adminOnly sesuai implementasi Anda
router.post('/kompetisi', verifyUser, adminOnly, createKompetisi);
router.patch('/kompetisi/:id', verifyUser, adminOnly, updateKompetisi); // Menggunakan UUID sebagai :id
router.delete('/kompetisi/:id', verifyUser, adminOnly, deleteKompetisi); // Menggunakan UUID sebagai :id

export default router;