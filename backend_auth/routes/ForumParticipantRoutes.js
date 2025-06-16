// routes/ForumParticipantRoutes.js
import express from 'express';
import {
    getJoinedForumsByUser,
    joinForum,
    leaveForum
} from '../controllers/ForumParticipantController.js';
import { verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/users/joined-forums', verifyUser, getJoinedForumsByUser);
router.post('/forums/join', verifyUser, joinForum); // Body: { "forumId": "UUID_FORUM" }
router.delete('/forums/leave/:forumId', verifyUser, leaveForum);

export default router;