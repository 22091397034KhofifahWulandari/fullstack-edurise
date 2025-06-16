// models/ArticleModel.js
import { Sequelize } from "sequelize";
import db from "../config/Database.js";


const { DataTypes } = Sequelize;

const Article = db.define('articles', {
    uuid:{
        type: DataTypes.UUID, // <-- UBAH KE DataTypes.UUID
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,    // <-- TAMBAHKAN INI
        unique: true,        // <-- TAMBAHKAN INI (walaupun primaryKey sudah menyiratkan unique)
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
        allowNull: true
    },
    gambar: {
        type: DataTypes.TEXT('long'), // Ini akan memetakan ke LONGTEXT di MySQL/MariaDB
        allowNull: true
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            isUrl: true
        }
    },
    penulis: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 150]
        }
    },
    kategori: {
        type: DataTypes.ENUM(
            'Beasiswa & Pendidikan',
            'Pengembangan Diri & Karir',
            'Tips Belajar & Produktivitas'
        ),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});

export default Article;