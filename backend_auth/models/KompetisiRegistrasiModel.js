// models/KompetisiRegistrasiModel.js
import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js"; // Asumsikan Anda memiliki model User
import Kompetisi from "./KompetisiModel.js"; // Import model Kompetisi

const { DataTypes } = Sequelize;

const KompetisiRegistrasi = db.define('kompetisi_registrasi', {
    // Tambahkan ID numerik sebagai primary key tunggal untuk setiap pendaftaran
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, // Ini adalah primary key tunggal untuk tabel pendaftaran ini
        allowNull: false
    },
    uuid:{ // UUID untuk identifikasi unik pendaftaran ini secara eksternal jika diperlukan
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        // primaryKey: true, // Hapus ini, karena 'id' di atas sudah jadi primary key
        allowNull: false,
        references: {
            model: User, // Mengacu ke model User
            key: 'id'
        },
        validate: {
            notEmpty: true
        }
    },
    kompetisiId: {
        type: DataTypes.INTEGER,
        // primaryKey: true, // Hapus ini, karena 'id' di atas sudah jadi primary key
        allowNull: false,
        references: {
            model: Kompetisi, // Mengacu ke model Kompetisi
            key: 'id'
        },
        validate: {
            notEmpty: true
        }
    },
    status_pendaftaran: {
        type: DataTypes.ENUM('diproses', 'seleksi berkas', 'diterima', 'ditolak'),
        allowNull: false,
        defaultValue: 'diproses',
        validate: {
            notEmpty: true
        }
    },
    tanggal_pendaftaran: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    // --- KOLOM UNTUK FORM PENDAFTARAN ---
    nama_lengkap: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 255]
        }
    },
    jenjang_pendidikan: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [0, 100]
        }
    },
    instansi_pendidikan: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [0, 255]
        }
    },
    jurusan: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [0, 255]
        }
    },
    no_telp: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            is: /^\+?[0-9\s-()]{7,20}$/
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true,
        }
    },
    alasan_mengikuti: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    freezeTableName: true,
    // Tambahkan unique constraint untuk memastikan user tidak mendaftar dua kali di kompetisi yang sama
    indexes: [
        {
            unique: true,
            fields: ['userId', 'kompetisiId']
        }
    ]
});

export default KompetisiRegistrasi;