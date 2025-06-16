// routes/KompetisiRegistrasiRoute.js

import express from "express";
import {
    registerKompetisi,
    getUserRegistrations,
    getUserRegistrationByKompetisiUuid,
    getRegistrationsByKompetisiUuid,
    updateRegistrationStatus,
    deleteRegistration,
    // Import fungsi controller baru ini
    getAllKompetisiRegistrations // Ini adalah fungsi yang perlu Anda buat
} from "../controllers/KompetisiRegistrasiController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

// User Routes
router.post('/kompetisi-registrasi', verifyUser, registerKompetisi);
router.get('/me/kompetisi-registrasi', verifyUser, getUserRegistrations);
router.get('/kompetisi-registrasi/user/:kompetisiUuid', verifyUser, getUserRegistrationByKompetisiUuid);

// Admin Routes
// Endpoint untuk mengambil pendaftaran berdasarkan UUID kompetisi tertentu
router.get('/admin/kompetisi-registrasi/:kompetisiUuid', verifyUser, adminOnly, getRegistrationsByKompetisiUuid);
// Endpoint BARU untuk mengambil SEMUA pendaftaran dari SEMUA kompetisi
router.get('/admin/kompetisi-registrasi', verifyUser, adminOnly, getAllKompetisiRegistrations); // <-- Tambahkan baris ini!
router.patch('/admin/kompetisi-registrasi/:uuid', verifyUser, adminOnly, updateRegistrationStatus);
router.delete('/admin/kompetisi-registrasi/:uuid', verifyUser, adminOnly, deleteRegistration);

export default router;