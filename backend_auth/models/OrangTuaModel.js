// models/OrangTuaModel.js
import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";

const OrangTua = db.define('orangtua', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: { // Foreign key ke tabel User
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true // Pastikan hanya satu entri orang tua per user
    },
    // --- Data Ayah ---
    nama_ayah: {
        type: DataTypes.STRING,
        allowNull: true, // Bisa true jika data ayah tidak wajib
        defaultValue: null,
        validate: {
            len: [0, 100] // Minimal 0 karakter jika tidak wajib
        }
    },
    ttl_ayah: { // Tanggal Lahir Ayah
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: null,
        validate: {
            isDate: true
        }
    },
    alamat_ayah: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    no_telp_ayah: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        validate: {
            is: /^[0-9+]*$/
        }
    },
    pendidikan_ayah: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    pekerjaan_ayah: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    penghasilan_ayah: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        validate: {
            min: 0
        }
    },
    // --- Data Ibu ---
    nama_ibu: {
        type: DataTypes.STRING,
        allowNull: true, // Bisa true jika data ibu tidak wajib
        defaultValue: null,
        validate: {
            len: [0, 100]
        }
    },
    ttl_ibu: { // Tanggal Lahir Ibu
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: null,
        validate: {
            isDate: true
        }
    },
    alamat_ibu: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    no_telp_ibu: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        validate: {
            is: /^[0-9+]*$/
        }
    },
    pendidikan_ibu: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    pekerjaan_ibu: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    penghasilan_ibu: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        validate: {
            min: 0
        }
    }
}, {
    freezeTableName: true,
    timestamps: true
});

export default OrangTua;