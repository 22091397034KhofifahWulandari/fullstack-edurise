import express from 'express';
import {
    getSavedBeasiswaByUser,
    saveBeasiswaToProfile,
    removeSavedBeasiswaFromProfile
} from '../controllers/UserSavedBeasiswaController.js';
import { verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();
router.get('/users/saved-beasiswa', verifyUser, getSavedBeasiswaByUser);
router.post('/users/saved-beasiswa', verifyUser, saveBeasiswaToProfile);
router.delete('/users/saved-beasiswa/:beasiswaId', verifyUser, removeSavedBeasiswaFromProfile);
export default router;