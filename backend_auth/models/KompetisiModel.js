// models/KompetisiModel.js
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Kompetisi = db.define('kompetisi', {
    id: { // Tambahkan ID sebagai primary key untuk relasi FK
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    judul: { // Judul kompetisi, contoh: "Lomba Olimpiade Sains (Jan-Mar 2025)"
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 255]
        }
    },
    gambar: { // Gambar poster kompetisi
        type: DataTypes.TEXT('long'), // Ini akan memetakan ke LONGTEXT di MySQL/MariaDB
        allowNull: true
    },
    // *** REMOVED: link_pendaftaran karena pendaftaran internal ***
    tanggal_mulai_pendaftaran: { // Tanggal mulai pendaftaran
        type: DataTypes.DATEONLY, // Hanya tanggal, tanpa waktu
        allowNull: true
    },
    tanggal_akhir_pendaftaran: { // Tanggal akhir pendaftaran
        type: DataTypes.DATEONLY, // Hanya tanggal, tanpa waktu
        allowNull: true
    },
    biaya_pendaftaran: { // Biaya pendaftaran, bisa "Gratis" atau nominal
        type: DataTypes.STRING, // Contoh: "Gratis", "Rp 50.000", "Rp 100.000 / tim"
        allowNull: true
    },
    tingkat_kompetisi: { // Nasional, Internasional, Provinsi, Regional, Internal Kampus
        type: DataTypes.ENUM(
            'Nasional',
            'Internasional',
            'Provinsi',
            'Regional',
            'Internal Kampus'
        ),
        allowNull: true
    },
    tentang_kompetisi: { // Deskripsi lengkap tentang kompetisi
        type: DataTypes.TEXT,
        allowNull: true
    },
    syarat_ketentuan: { // Syarat dan ketentuan peserta
        type: DataTypes.TEXT,
        allowNull: true
    },
    ketentuan_penilaian: { // Ketentuan penilaian atau mekanisme kompetisi
        type: DataTypes.TEXT,
        allowNull: true
    },
    manfaat_partisipasi: { // Manfaat yang didapat peserta (e.g., medali, e-piagam, sertifikat, relasi)
        type: DataTypes.TEXT,
        allowNull: true
    },
    bantuan_didapat: { // Bantuan yang didapat (misal: "Uang tunai (Rp 1.000.000)")
        type: DataTypes.TEXT,
        allowNull: true
    },
}, {
    freezeTableName: true
});

export default Kompetisi;