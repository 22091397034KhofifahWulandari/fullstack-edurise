// routes/BeasiswaRoutes.js
import express from "express";
import {
    getBeasiswa,        // Dapat dilihat semua (user biasa & admin)
    getBeasiswaById,    // Dapat dilihat semua (user biasa & admin)
    createBeasiswa,     // Hanya admin
    updateBeasiswa,     // Hanya admin
    deleteBeasiswa      // Hanya admin
} from "../controllers/BeasiswaController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js"; // Pastikan path ini benar

const router = express.Router();

// Rute yang dapat diakses oleh siapa saja (termasuk user biasa) untuk melihat beasiswa
router.get('/beasiswa', getBeasiswa);
router.get('/beasiswa/:id',  getBeasiswaById);

// Rute khusus untuk admin (CRUD Beasiswa)
// Pastikan middleware 'verifyUser' berjalan dulu untuk mengautentikasi pengguna,
// lalu 'adminOnly' untuk memeriksa perannya.
router.post('/beasiswa', verifyUser, adminOnly, createBeasiswa);
router.patch('/beasiswa/:id', verifyUser, adminOnly, updateBeasiswa);
router.delete('/beasiswa/:id', verifyUser, adminOnly, deleteBeasiswa);

export default router;