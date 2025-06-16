// models/UserSavedBeasiswaModel.js
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const UserSavedBeasiswa = db.define('user_saved_beasiswa', {
    // Anda bisa tambahkan kolom lain di sini jika ada informasi tambahan yang ingin disimpan,
    // misalnya kapan beasiswa itu disimpan.
    savedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Otomatis mengisi tanggal dan waktu saat disimpan
        allowNull: false
    }
}, {
    freezeTableName: true,
    // Menjadikan kombinasi userId dan beasiswaId sebagai primary key
    // untuk mencegah duplikasi simpan
    indexes: [
        {
            unique: true, // Pastikan setiap pasangan userId-beasiswaId hanya ada satu kali
            fields: ['userId', 'beasiswaId'] // Kolom-kolom yang membentuk indeks unik
        }
    ]
});

export default UserSavedBeasiswa;