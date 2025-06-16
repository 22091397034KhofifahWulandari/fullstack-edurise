// models/MentoringModel.js
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Mentoring = db.define('mentoring', {
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
    namaMentor: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    keahlianMentor: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    fotoMentor: {
        type: DataTypes.TEXT('long'),
        allowNull: true
    },
    jumlahPeserta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            notEmpty: true,
            min: 0
        }
    },
    statusMentoring: {
        type: DataTypes.ENUM(
            'Tersedia',
            'Penuh'
        ),
        allowNull: false,
        defaultValue: 'Tersedia',
        validate: {
            notEmpty: true
        }
    },
    kategoriMentoring: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    link: { // <--- FOKUS UTAMA: KOLOM LINK
        type: DataTypes.STRING,
        allowNull: false, // Ini yang menyebabkan error "notNull Violation" jika tidak diisi
        unique: true,     // Memastikan setiap link sesi mentoring itu unik (opsional, tapi bagus untuk menghindari duplikasi link yang sama)
        validate: {
            notEmpty: true,
            isUrl: true   // Memastikan formatnya adalah URL yang valid
        }
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


export default Mentoring;