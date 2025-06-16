// routes/UserSavedForumRoute.js
import express from "express";
import {
    saveForumToProfile,
    removeSavedForumFromProfile,
    getSavedForumsByUser
} from "../controllers/UserSavedForumController.js";
import { verifyUser } from "../middleware/AuthUser.js"; // Pastikan path ini benar

const router = express.Router();

// User routes (membutuhkan autentikasi user)
router.post('/me/saved-forum', verifyUser, saveForumToProfile);
router.delete('/me/saved-forum/:forumId', verifyUser, removeSavedForumFromProfile);
router.get('/me/saved-forum', verifyUser, getSavedForumsByUser);

export default router;