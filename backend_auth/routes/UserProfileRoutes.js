// routes/UserProfileRoutes.js
import express from "express";
import {
    getUserProfile,
    updateProfileInfo,
    uploadProfilePicture,
    uploadCoverPicture,
    deleteProfilePicture,
    deleteCoverPicture
} from "../controllers/UserProfileController.js";
 import { verifyUser } from "../middleware/AuthUser.js"; // Jika Anda memiliki middleware otentikasi

const router = express.Router();

// Semua route profil harus dilindungi dengan middleware otentikasi (misalnya verifyUser)
router.get('/profile', verifyUser, getUserProfile);
router.patch('/profile', verifyUser, updateProfileInfo);
router.post('/profile/upload/cover-picture', verifyUser, uploadCoverPicture); // <--- PASTIKAN BARIS INI ADA
router.post('/profile/upload/profile-picture', verifyUser, uploadProfilePicture); // Pastikan ini juga ada
router.delete('/profile/data/delete-picture', verifyUser, deleteProfilePicture); // <--- PASTIKAN BARIS INI ADA
router.delete('/profile/data/delete-cover-picture', verifyUser, deleteCoverPicture);



export default router; // <<--- Ini adalah default export!