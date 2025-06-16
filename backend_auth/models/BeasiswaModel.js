// models/BeasiswaModel.js
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Beasiswa = db.define('beasiswa', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    img: {
        type: DataTypes.TEXT('long'), // Ini akan memetakan ke LONGTEXT di MySQL/MariaDB
        allowNull: true
    },
    title: { // Sesuai dengan 'nama' di frontend
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 255]
        }
    },
    description: { // Sesuai dengan 'deskripsi' di frontend
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    // Menambahkan kolom 'penyelenggara'
    penyelenggara: { // BARU: Sesuai dengan 'penyelenggara' di frontend
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 255]
        }
    },
    // Menambahkan kolom 'link'
    link: { // BARU: Sesuai dengan 'link' di frontend
        type: DataTypes.STRING,
        allowNull: true, // Bisa true karena mungkin ada beasiswa tanpa link langsung
        validate: {
            isUrl: true // Validasi URL
        }
    },
    // 'detail' bisa tetap ada jika Anda punya informasi detail lain yang tidak tercover oleh kolom lain
    // Atau bisa dihapus jika 'description', 'penyelenggara', dan 'link' sudah cukup
    detail: { // Kolom ini tetap ada, jika masih diperlukan untuk detail tambahan
        type: DataTypes.TEXT,
        allowNull: true // Mengubah ke true, karena informasi penting sudah dipecah ke penyelenggara dan link
    },
    // PERBAIKAN: Menyesuaikan ENUM 'kategori' dengan opsi di frontend
    kategori: {
        type: DataTypes.ENUM(
            'Beasiswa',
            'Pelatihan',
        ),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    // PERBAIKAN: Menyesuaikan ENUM 'jenjang' dengan opsi di frontend
    jenjang: {
        type: DataTypes.ENUM(
            'D3',
            'S1/D4', // Disatukan untuk mencocokkan frontend
            'S2',
        ),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    lokasi: {
    type: DataTypes.ENUM(
        'DKI Jakarta', 
        'Jawa Barat', 
        'Jawa Timur'),
    allowNull: false,
    validate: {
        notEmpty: true, 
    }
},
    deadline: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: true,
            isDate: true // Memastikan ini adalah tanggal yang valid
        }
    }
}, {
    freezeTableName: true
});

export default Beasiswa;