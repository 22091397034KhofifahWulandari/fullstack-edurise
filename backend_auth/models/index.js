// models/index.js
import db from '../config/Database.js';

// --- Import Semua Model ---
import UserModel from "./UserModel.js";
import OrangTuaModel from "./OrangTuaModel.js";
import PortofolioModel from "./PortofolioModel.js";
import BeasiswaModel from "./BeasiswaModel.js";
import UserSavedBeasiswaModel from "./UserSavedBeasiswaModel.js";
import ArticleModel from "./ArticleModel.js";
import ForumModel from "./ForumModel.js";
import UserSavedForumModel from "././UserSavedForumModel.js"; // Path relatif disesuaikan
import ForumParticipantModel from "./ForumParticipantModel.js";
import WebinarModel from "./WebinarModel.js";
import WebinarPesertaModel from "./WebinarPesertaModel.js";
import KompetisiModel from "./KompetisiModel.js";
import KompetisiRegistrasiModel from "./KompetisiRegistrasiModel.js";
import UserSavedKompetisiModel from "./UserSavedKompetisiModel.js";
import EssayModel from "./EssayModel.js";
import PenilaianModel from "./PenilaianModel.js";
import DiskusiModel from "./DiskusiModel.js";
import MentoringModel from "./MentoringModel.js";

// --- DEFINISI SEMUA RELASI ---

// Relasi One-to-One: User dan OrangTua
UserModel.hasOne(OrangTuaModel, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    as: 'dataOrangTua'
});
OrangTuaModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'user'
});

// Relasi One-to-Many: User dan Portofolio
UserModel.hasMany(PortofolioModel, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    as: 'portofolios'
});
PortofolioModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'user'
});

// --- Relasi Many-to-Many untuk Beasiswa yang Disimpan User ---
UserModel.belongsToMany(BeasiswaModel, {
    through: UserSavedBeasiswaModel,
    foreignKey: 'userId',
    otherKey: 'beasiswaId',
    as: 'savedBeasiswa'
});
BeasiswaModel.belongsToMany(UserModel, {
    through: UserSavedBeasiswaModel,
    foreignKey: 'beasiswaId',
    otherKey: 'userId',
    as: 'savedByUsers'
});
UserSavedBeasiswaModel.belongsTo(UserModel, { foreignKey: 'userId' });
UserSavedBeasiswaModel.belongsTo(BeasiswaModel, { foreignKey: 'beasiswaId' });

// --- Relasi One-to-Many: User (Creator) dan Forum ---
UserModel.hasMany(ForumModel, {
    foreignKey: 'userId',
    as: 'createdForums'
});
ForumModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'creator'
});

// --- Relasi Many-to-Many untuk Forum yang Disimpan User ---
UserModel.belongsToMany(ForumModel, {
    through: UserSavedForumModel,
    foreignKey: 'userId',
    otherKey: 'forumId',
    as: 'userSavedForums'
});
ForumModel.belongsToMany(UserModel, {
    through: UserSavedForumModel,
    foreignKey: 'forumId',
    otherKey: 'userId',
    as: 'savedByUsers'
});
UserSavedForumModel.belongsTo(UserModel, { foreignKey: 'userId' });
UserSavedForumModel.belongsTo(ForumModel, { foreignKey: 'forumId' });

// --- Relasi Many-to-Many untuk Anggota Forum (User Join Forum) ---
UserModel.belongsToMany(ForumModel, {
    through: ForumParticipantModel,
    foreignKey: 'userId',
    otherKey: 'forumId',
    as: 'joinedForums'
});
ForumModel.belongsToMany(UserModel, {
    through: ForumParticipantModel,
    foreignKey: 'forumId',
    otherKey: 'userId',
    as: 'participants'
});
ForumParticipantModel.belongsTo(UserModel, { foreignKey: 'userId' });
ForumParticipantModel.belongsTo(ForumModel, { foreignKey: 'forumId' });

// --- RELASI UNTUK WEBINAR DAN PESERTA WEBINAR ---
// Webinar memiliki banyak Peserta Webinar
WebinarModel.hasMany(WebinarPesertaModel, {
    foreignKey: 'webinarId', // foreignKey di WebinarPesertaModel
    sourceKey: 'uuid',     // Kolom di WebinarModel yang direferensikan (UUID)
    onDelete: 'CASCADE',
    as: 'pesertaWebinar'
});
// Setiap Peserta Webinar dimiliki oleh satu Webinar
WebinarPesertaModel.belongsTo(WebinarModel, {
    foreignKey: 'webinarId', // foreignKey di WebinarPesertaModel
    targetKey: 'uuid',       // Kolom di WebinarModel yang direferensikan (UUID)
    as: 'webinar'
});

// Relasi User (Pendaftar) dan WebinarPeserta
UserModel.hasMany(WebinarPesertaModel, {
    foreignKey: 'userId',
    onDelete: 'SET NULL', // Jika user dihapus, userId di WebinarPeserta akan menjadi NULL
    as: 'pendaftaranWebinar'
});
WebinarPesertaModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'userPendaftar'
});


// --- RELASI UNTUK KOMPETISI ---

// Relasi Many-to-Many: User dan Kompetisi (untuk "save/simpan kompetisi")
UserModel.belongsToMany(KompetisiModel, {
    through: UserSavedKompetisiModel,
    foreignKey: 'userId',
    otherKey: 'kompetisiId',
    as: 'savedKompetisi'
});
KompetisiModel.belongsToMany(UserModel, {
    through: UserSavedKompetisiModel,
    foreignKey: 'kompetisiId',
    otherKey: 'userId',
    as: 'savedByUsers'
});
UserSavedKompetisiModel.belongsTo(UserModel, { foreignKey: 'userId' });
UserSavedKompetisiModel.belongsTo(KompetisiModel, { foreignKey: 'kompetisiId' });


// Relasi Many-to-Many: User dan Kompetisi (untuk "registrasi kompetisi")
UserModel.belongsToMany(KompetisiModel, {
    through: KompetisiRegistrasiModel,
    foreignKey: 'userId',
    otherKey: 'kompetisiId',
    as: 'registeredKompetisi'
});
KompetisiModel.belongsToMany(UserModel, {
    through: KompetisiRegistrasiModel,
    foreignKey: 'kompetisiId',
    otherKey: 'userId',
    as: 'registrants'
});
KompetisiRegistrasiModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'registrantUser' });
KompetisiRegistrasiModel.belongsTo(KompetisiModel, { foreignKey: 'kompetisiId', as: 'registeredKompetisiDetail' });

// --- RELASI UNTUK ESSAY DAN PENILAIAN ---

// Relasi One-to-Many: User (Siswa/Penulis) dan Essay
UserModel.hasMany(EssayModel, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    as: 'submittedEssays'
});
EssayModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'userSubmitter'
});

// Relasi One-to-Many: Essay dan Penilaian
EssayModel.hasMany(PenilaianModel, {
    foreignKey: 'essayId',
    onDelete: 'CASCADE',
    as: 'penilaianEssays'
});
PenilaianModel.belongsTo(EssayModel, {
    foreignKey: 'essayId',
    as: 'essay'
});

// Relasi One-to-Many: User (Admin/Penilai) dan Penilaian
UserModel.hasMany(PenilaianModel, {
    foreignKey: 'userId',
    onDelete: 'SET NULL',
    as: 'givenPenilaian'
});
PenilaianModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'adminPenilai'
});

// --- RELASI UNTUK DISKUSI ---
// Relasi One-to-Many: User (Pembuat Diskusi) dan Diskusi
UserModel.hasMany(DiskusiModel, {
    foreignKey: 'userId',
    as: 'createdDiscussions'
});
DiskusiModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'creator'
});

// --- RELASI UNTUK MENTORING ---
// Relasi One-to-Many: User (Pembuat Mentoring/Admin) dan Mentoring
UserModel.hasMany(MentoringModel, {
    foreignKey: 'userId',
    as: 'createdMentoring' // Alias untuk user yang membuat sesi mentoring
});
MentoringModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'creator' // Alias untuk creator sesi mentoring
});


// --- Export Semua Model ---
export {
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
};