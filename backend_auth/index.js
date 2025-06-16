import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
// import cookieParser from "cookie-parser"; // Bisa dihapus jika tidak ada cookie lain yang tidak dihandle express-session
// import fileUpload from "express-fileupload"; // Hapus jika semua upload menggunakan Multer
import path from "path";
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Konfigurasi Session Store ---
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: db,
    tableName: 'sessions', // Pastikan nama tabel sesi sudah benar
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 24 * 60 * 60 * 1000
});

// --- Import Semua Model dan Route ---
import {
    UserModel,
    OrangTuaModel,
    PortofolioModel,
    BeasiswaModel,
    UserSavedBeasiswaModel,
    ArticleModel,
    ForumModel,
    UserSavedForumModel,
    ForumParticipantModel,
    WebinarModel,
    WebinarPesertaModel,
    KompetisiModel,
    KompetisiRegistrasiModel,
    UserSavedKompetisiModel,
    EssayModel,
    PenilaianModel,
    DiskusiModel,
    MentoringModel
} from "./models/index.js";

import AuthRoute from "./routes/AuthRoute.js";
import UserRoute from "./routes/UserRoute.js";
import UserProfileRoutes from "./routes/UserProfileRoutes.js"
import OrangTuaRoutes from "./routes/OrangTuaRoutes.js";
import PortofolioRoutes from "./routes/PortofolioRoutes.js";
import BeasiswaRoute from "./routes/BeasiswaRoute.js";
import ArticleRoute from "./routes/ArticleRoute.js";
import UserSavedBeasiswaRoutes from "./routes/UserSavedBeasiswaRoutes.js";
import ForumRoute from "./routes/ForumRoutes.js";
import UserSavedForumRoutes from "./routes/UserSavedForumRoutes.js";
import ForumParticipantRoutes from "./routes/ForumParticipantRoutes.js";
import WebinarRoute from "./routes/webinarRoutes.js";
import WebinarPesertaRoutes from "./routes/webinarPesertaRoutes.js"
import KompetisiRoute from "./routes/KompetisiRoute.js";
import KompetisiRegistrasiRoute from "./routes/KompetisiRegistrasiRoute.js";
import UserSavedKompetisiRoute from "./routes/UserSavedKompetisiRoute.js";
import EssayRoute from "./routes/EssayRoute.js";
import PenilaianRoute from "./routes/PenilaianRoute.js";
import DiskusiRoute from './routes/DiskusiRoutes.js';
import MentoringRoute from './routes/MentoringRoute.js';


// --- Sinkronisasi Database (HANYA UNTUK PENGEMBANGAN) ---
(async () => {
    try {
        await db.authenticate();
        console.log('Database Connected Successfully!');

        // HANYA AKTIFKAN SALAH SATU INI SAAT PERTAMA KALI MEMBUAT SKEMA
        // Setelah tabel terbuat, sebaiknya nonaktifkan atau gunakan { alter: true }
        // jika Anda sering memodifikasi model di tahap pengembangan.
        // Untuk produksi, hindari force: true!
        // await db.sync({ alter: true });
        // await db.sync({ force: true });

        // Pastikan tabel sesi dibuat jika belum ada.
        // Hanya jalankan ini satu kali jika tabel 'sessions' belum ada di database Anda.
        // Setelah terbuat, Anda bisa mengomentarinya.
        // await store.sync();

        console.log('Database synchronization (if configured) and Session Store Synced!');
    } catch (error) {
        console.error('Error connecting to database or during sync:', error);
        process.exit(1);
    }
})();

// --- Middleware ---

// 1. CORS
app.use(cors({
    credentials: true, // WAJIB true untuk mengirim/menerima cookies cross-origin
    // Defaultkan ke http://localhost:5173 jika FRONTEND_URL tidak didefinisikan
    origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));

// 2. Session Middleware (HARUS SEBELUM ROUTE YANG MEMBUTUHKAN SESI)
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        //secure: process.env.NODE_ENV === 'production' ? true : false,
        // httpOnly: true,
        secure: 'auto', // Gunakan true jika di HTTPS, 'auto' menyesuaikan
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        // Penting: SameSite 'none' membutuhkan 'secure: true'.
        // Untuk development (HTTP), 'sameSite' bisa disetel ke false (default) atau dihilangkan.
        // false akan menghilangkan atribut SameSite, memungkinkan cross-origin HTTP cookies.
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : false
    }
}));

// 3. Parser untuk body request (JSON)
app.use(express.json());

// 4. File upload (jika menggunakan express-fileupload, harus setelah express.json)
// app.use(fileUpload()); // Hapus baris ini jika Anda sepenuhnya beralih ke Multer

// 5. Sajikan file statis dari folder 'public'
// Ini akan melayani semua file di 'public' langsung dari root URL.
// Contoh: public/images/discussions/abc.jpg -> http://localhost:5000/images/discussions/abc.jpg
app.use(express.static(path.join(__dirname, 'public')));

// Baris berikut ini TIDAK diperlukan lagi jika semua file statis ada di dalam 'public'
// dan Anda mengaksesnya relatif terhadap root yang dilayani oleh 'public'.
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// 6. CookieParser umumnya tidak diperlukan lagi jika Anda menggunakan `express-session`
// app.use(cookieParser());


// --- Integrasi Routes ---
app.use(UserSavedBeasiswaRoutes);
app.use(UserSavedForumRoutes);
app.use(ForumParticipantRoutes);
app.use(KompetisiRegistrasiRoute);
app.use(UserSavedKompetisiRoute);

app.use(UserProfileRoutes);
app.use(OrangTuaRoutes);
app.use(PortofolioRoutes);
app.use(UserRoute);
app.use(BeasiswaRoute);
app.use(ArticleRoute);
app.use(ForumRoute);
app.use(WebinarRoute);
app.use(WebinarPesertaRoutes)
app.use(KompetisiRoute);
app.use(DiskusiRoute); // Pastikan ini ada dan berfungsi
app.use(MentoringRoute);



app.use(EssayRoute);
app.use(PenilaianRoute);
app.use(AuthRoute);

// --- Mulai Server ---
const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}...`);
    console.log(`Frontend URL (configured in CORS): ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});