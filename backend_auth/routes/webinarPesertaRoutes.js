// routes/WebinarPesertaRoute.js
import express from "express";
import { 
    registerWebinarPeserta, 
    getAllWebinarPeserta, 
    getWebinarPesertaById, 
    updateWebinarPeserta, 
    deleteWebinarPeserta, 
    getPesertaByWebinarId 
} from "../controllers/WebinarPesertaController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js"; // Asumsi path middleware AuthUser.js

const router = express.Router();

// Rute untuk pendaftaran peserta
// Bisa diakses setelah verifikasi pengguna (jika userId diperlukan), atau tanpa jika allowNull: true di model
router.post('/webinar-peserta/register', verifyUser, registerWebinarPeserta);

// --- Routes untuk Admin (membutuhkan verifikasi user dan admin role) ---

// PENTING: Rute yang lebih spesifik harus diletakkan sebelum rute yang lebih umum
// Contoh: /webinar-peserta/webinar/:id harus sebelum /webinar-peserta/:id

// Mendapatkan peserta berdasarkan ID Webinar (lebih spesifik)
router.get('/webinar-peserta/webinar/:uuid', verifyUser, adminOnly, getPesertaByWebinarId);

// Mendapatkan detail pendaftar berdasarkan UUID pendaftaran (umum)
router.get('/webinar-peserta/:id', verifyUser, adminOnly, getWebinarPesertaById);

// Mendapatkan semua pendaftar (opsional dengan filter query)
router.get('/webinar-peserta', verifyUser, adminOnly, getAllWebinarPeserta);

// Memperbarui status atau data pendaftar
router.patch('/webinar-peserta/:id', verifyUser, adminOnly, updateWebinarPeserta);

// Menghapus pendaftar
router.delete('/webinar-peserta/:id', verifyUser, adminOnly, deleteWebinarPeserta);

export default router;