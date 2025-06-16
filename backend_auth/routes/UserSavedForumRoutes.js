// routes/UserSavedForumRoutes.js
import express from 'express';
import {
    getSavedForumsByUser,
    saveForumToProfile,
    removeSavedForumFromProfile
} from '../controllers/UserSavedForumController.js';
import { verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/users/saved-forums', verifyUser, getSavedForumsByUser);
router.post('/users/saved-forums', verifyUser, saveForumToProfile);
router.delete('/users/saved-forums/:forumId', verifyUser, removeSavedForumFromProfile);

export default router;