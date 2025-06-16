// routes/UserRoute.js
import express from "express";
import {
    Login,
    Register, // <<< Pastikan ini diimpor
    Me,
    logOut
} from "../controllers/AuthController.js";

const router = express.Router();

router.post('/login', Login);
router.post('/register', Register);
router.get('/me', Me);
router.delete('/logout', logOut);

export default router;