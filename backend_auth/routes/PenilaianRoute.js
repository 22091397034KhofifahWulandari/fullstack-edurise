// routes/PenilaianRoute.js
import express from "express";
import {
    createOrUpdatePenilaian,
    getPenilaianById,
    deletePenilaian
} from "../controllers/PenilaianController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js"; // Import middleware

const router = express.Router();

// Rute untuk admin
// POST: Digunakan untuk MENAMBAH penilaian BARU
router.post('/penilaian', verifyUser, adminOnly, createOrUpdatePenilaian);

// PATCH: Digunakan untuk MEMPERBARUI penilaian yang SUDAH ADA berdasarkan ID penilaian
router.patch('/penilaian/:id', verifyUser, adminOnly, createOrUpdatePenilaian);

// GET: Lihat detail penilaian berdasarkan ID penilaian
router.get('/penilaian/:id', verifyUser, adminOnly, getPenilaianById);

// DELETE: Hapus penilaian berdasarkan ID penilaian
router.delete('/penilaian/:id', verifyUser, adminOnly, deletePenilaian);

// Catatan:
// Anda mungkin ingin menambahkan rute untuk mendapatkan semua penilaian untuk esai tertentu,
// tapi ini sudah ditangani di `getEssayById` dan `getEssayByIdForAdmin` dengan `include`
// pada model esai, sehingga Anda bisa mendapatkan esai beserta penilaiannya.
// Jika Anda benar-benar membutuhkan daftar penilaian terpisah, Anda bisa menambahkannya
// router.get('/essays/:essayId/penilaian', verifyUser, adminOnly, getPenilaianByEssayId);
// dan membuat controller baru 'getPenilaianByEssayId'.
// Namun, untuk kasus Anda, 'include' di getEssayByIdForAdmin sudah mencukupi kebutuhan manajemen penilaian.

export default router;