// routes/ArticleRoutes.js
import express from "express";
import {
    getArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
    getArticlesByCategoryLimit
} from "../controllers/ArticleController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js"; // Pastikan path ini benar

const router = express.Router();

router.get('/articles-by-category-limit', getArticlesByCategoryLimit);
router.get('/articles', getArticles); // Endpoint ini akan menerima parameter query 'kategori'
router.get('/articles/:id', getArticleById);
router.post('/articles', verifyUser, adminOnly, createArticle);
router.patch('/articles/:id', verifyUser, adminOnly, updateArticle);
router.delete('/articles/:id', verifyUser, adminOnly, deleteArticle);

export default router;