import express from "express";
import uploadMentorPhoto from '../middleware/uploadMentorPhoto.js';
import {
    getMentoring,
    getMentoringById,
    createMentoring,
    updateMentoring,
    deleteMentoring,
    joinMentoring
} from "../controllers/MentoringController.js";
import { verifyUser, adminOnly} from "../middleware/AuthUser.js"; // Asumsi middleware otorisasi Anda

const router = express.Router();

// Rute untuk Admin
router.post('/mentoring', verifyUser, adminOnly, createMentoring);
router.patch('/mentoring/:id', verifyUser, adminOnly, updateMentoring);
router.delete('/mentoring/:id', verifyUser, adminOnly, deleteMentoring);

// Rute untuk Semua Pengguna (Admin & User)
router.get('/mentoring', verifyUser, getMentoring); // User juga bisa melihat
router.get('/mentoring/:id', verifyUser, getMentoringById); // User juga bisa melihat detail

// Rute untuk User saja
router.post('/mentoring/:id/join', verifyUser, joinMentoring); // User bisa bergabung

export default router;