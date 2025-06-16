// routes/webinarRoutes.js
import express from "express";
import {
    getWebinars,
    getWebinarById,
    createWebinar,
    updateWebinar,
    deleteWebinar,
    getWebinarsByCategoryLimit
} from "../controllers/WebinarController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js"; // Pastikan ini terimpor dengan benar

const router = express.Router();

// --- RUTE AKSES PUBLIK ---
// Rute ini dapat diakses oleh siapa saja (tidak memerlukan login)
router.get('/webinars', getWebinars); // Mendapatkan semua webinar, bisa filter by kategori & status
router.get('/webinars/:id', getWebinarById); // Mendapatkan webinar berdasarkan UUID
router.get('/webinars/category-limit', getWebinarsByCategoryLimit); // Mendapatkan webinar terbaru per kategori (upcoming)

// --- RUTE AKSES ADMIN ---
// Rute ini memerlukan autentikasi (verifyUser) dan otorisasi admin (adminOnly)
router.post('/webinars', verifyUser, adminOnly, createWebinar);
router.patch('/webinars/:id', verifyUser, adminOnly, updateWebinar);
router.delete('/webinars/:id', verifyUser, adminOnly, deleteWebinar);

export default router;