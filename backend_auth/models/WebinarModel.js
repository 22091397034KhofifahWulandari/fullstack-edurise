// models/WebinarModel.js
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Webinar = db.define('webinar', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        primaryKey: true // <-- TAMBAHKAN INI
    },
    judul: { // Judul webinar
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 255]
        }
    },
    deskripsi: { // Deskripsi lengkap webinar
        type: DataTypes.TEXT,
        allowNull: true // Bisa dikosongkan jika deskripsi singkat
    },
    gambar: { // Sama seperti 'poster' di model sebelumnya, diubah agar konsisten dengan ArticleModel
        type: DataTypes.TEXT('long'), // Ini akan memetakan ke LONGTEXT di MySQL/MariaDB
        allowNull: true
    },
    link_webinar: { // Menggabungkan link pendaftaran/informasi utama webinar
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            isUrl: true
        }
    },
    penyelenggara: { // Sama seperti 'penyedia_acara' di model sebelumnya, diubah agar konsisten dengan 'penulis' di ArticleModel
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 150]
        }
    },
    kategori: { // Kategori webinar, mirip dengan kategori artikel
        type: DataTypes.ENUM(
            'Teknologi',
            'Bisnis & Kewirausahaan',
            'Pengembangan Diri',
            'Kesehatan & Gaya Hidup',
            'Pendidikan'
        ),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    tanggal_pelaksanaan: {
        type: DataTypes.DATEONLY, // Menggunakan DATEONLY untuk menyimpan hanya tanggal (YYYY-MM-DD)
        // Atau DataTypes.DATE jika Anda juga perlu menyimpan waktu
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Tanggal pelaksanaan tidak boleh kosong"
            },
            isDate: { // Validasi tambahan untuk memastikan format tanggal yang valid
                msg: "Format tanggal tidak valid (YYYY-MM-DD)"
            }
        }
    },
    jam_pelaksanaan: { // Jam pelaksanaan (e.g., "14.00 - 16.00 WIB")
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    narasumber: { // Nama narasumber, bisa lebih dari satu (e.g., "Dr. Budi Santoso, S.Kom., M.TI")
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    link_rekaman: { // URL rekaman webinar setelah selesai, diubah agar konsisten dengan penamaan 'link'
        type: DataTypes.STRING,
        allowNull: true
    },
    link_sertifikat: { // URL untuk mengunduh sertifikat, diubah agar konsisten dengan penamaan 'link'
        type: DataTypes.STRING,
        allowNull: true
    },
    status: { // Status webinar: upcoming, completed, cancelled
        type: DataTypes.ENUM('upcoming', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'upcoming', // Default status saat webinar dibuat
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});

export default Webinar;