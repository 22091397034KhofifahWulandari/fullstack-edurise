// routes/DiskusiRoute.js
import express from "express";
import {
    getDiskusi,
    getDiskusiById,
    createDiskusi,
    updateDiskusi,
    deleteDiskusi,
    joinDiskusi
} from "../controllers/DiskusiController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

// Rute yang memerlukan akses Admin
router.post('/diskusi', verifyUser, adminOnly, createDiskusi);
router.patch('/diskusi/:id', verifyUser, adminOnly, updateDiskusi);
router.delete('/diskusi/:id', verifyUser, adminOnly, deleteDiskusi);

// Rute yang dapat diakses oleh semua pengguna terautentikasi (Admin & User)
router.get('/diskusi', verifyUser, getDiskusi);
router.get('/diskusi/:id', verifyUser, getDiskusiById);
router.get('/diskusi/join/:id', verifyUser, joinDiskusi);

export default router;