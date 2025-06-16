// models/PendaftaranWebinarModel.js
import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import WebinarModel from './WebinarModel.js'; // Import model Webinar

const PendaftaranWebinarModel = db.define('pendaftaran_webinar', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    jenjang_pendidikan: {
        type: DataTypes.ENUM('SMA/SMK', 'D3', 'S1', 'S2', 'S3'), // Enum sesuai permintaan
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    instansi_pendidikan: {
        type: DataTypes.ENUM('Universitas Indonesia', 'Universitas Gajah Mada', 'Universitas Teknologi Bandung'), // Enum sesuai permintaan
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    jurusan: {
        type: DataTypes.ENUM('Teknik Informatika', 'Sistem Informasi', 'Ilmu Komputer', 'Manajemen'), // Enum sesuai permintaan
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false, // Setiap email bisa mendaftar ke banyak webinar
        validate: {
            notEmpty: true,
            isEmail: true // Validasi format email
        }
    },
    alasan_mengikuti_webinar: {
        type: DataTypes.TEXT,
        allowNull: true // Alasan bisa opsional
    }
}, {
    freezeTableName: true // Nama tabel akan persis 'pendaftaran_webinar'
});

// Definisi relasi: Setiap pendaftaran milik satu webinar
WebinarModel.hasMany(PendaftaranWebinarModel, {
    foreignKey: 'webinarId' // Kunci asing di tabel pendaftaran_webinar
});
PendaftaranWebinarModel.belongsTo(WebinarModel, {
    foreignKey: 'webinarId'
});

export default PendaftaranWebinarModel;