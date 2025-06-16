// models/PortofolioModel.js
import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";

const Portofolio = db.define('portofolios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: { // Akan diisi otomatis oleh relasi Many-to-One dengan User
        type: DataTypes.INTEGER,
        allowNull: false
    },
    judul: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 255] // Judul minimal 3 karakter, maksimal 255
        }
    },
    deskripsi: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    file_path: {
        type: DataTypes.STRING, // Path lokal file PDF di server
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    file_url: {
        type: DataTypes.STRING, // URL publik untuk mengakses file PDF
        allowNull: false,
        validate: {
            notEmpty: true
            // isUrl: true DIHAPUS karena URL dibentuk di backend
        }
    },
    tanggal_dibuat: {
        type: DataTypes.DATEONLY, // Tanggal format YYYY-MM-DD
        allowNull: true,
        defaultValue: DataTypes.NOW // Default akan diisi tanggal saat ini jika tidak disediakan
    }
}, {
    freezeTableName: true, // Nama tabel akan persis 'portofolios'
    timestamps: true,      // Mengaktifkan createdAt dan updatedAt
});

export default Portofolio;