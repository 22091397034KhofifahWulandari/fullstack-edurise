// models/DiskusiModel.js
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Diskusi = db.define('diskusi', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    judul: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 255]
        }
    },
    deskripsi: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    keahlian: {
        type: DataTypes.ENUM(
            'Computer',
            'Desain UI/UX',
            'Digital Marketing',
            'Sains',
            'Bisnis'
        ),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Pastikan link Discord/Zoom itu unik per diskusi
        validate: {
            notEmpty: true,
            isUrl: true
        }
    },
    diskusiPicture: { // <-- Kolom baru untuk gambar profil diskusi
        type: DataTypes.TEXT('long'), // Ini akan memetakan ke LONGTEXT di MySQL/MariaDB
        allowNull: true,
        defaultValue: null // Defaultnya null jika tidak diunggah
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});

export default Diskusi;