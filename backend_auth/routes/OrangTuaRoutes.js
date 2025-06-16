// routes/OrangTuaRoutes.js
import express from "express";
import {
    getOrangTuaByUserId, // Mengambil data ortu user yang login
    createOrangTua,
    updateOrangTua,
    deleteOrangTua
} from "../controllers/OrangTuaController.js";
import { verifyUser } from "../middleware/AuthUser.js"; // Pastikan sudah AuthUser.js

const router = express.Router();

router.get('/orangtua', verifyUser, getOrangTuaByUserId);      // Ambil data ortu user yang login
router.post('/orangtua', verifyUser, createOrangTua);          // Buat data ortu (hanya sekali)
router.patch('/orangtua', verifyUser, updateOrangTua);         // Update data ortu user yang login
router.delete('/orangtua', verifyUser, deleteOrangTua);        // Hapus data ortu user yang login

export default router;