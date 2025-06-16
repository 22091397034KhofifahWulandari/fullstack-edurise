// models/PenilaianModel.js
import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";

const Penilaian = db.define('penilaian', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    essayId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: { // Ini adalah userId dari admin/penilai
        type: DataTypes.INTEGER,
        allowNull: true
    },
    skor_struktur: {
        type: DataTypes.INTEGER(2),
        defaultValue: 0,
        allowNull: false
    },
    feedback_struktur: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    skor_topik: {
        type: DataTypes.INTEGER(2),
        defaultValue: 0,
        allowNull: false
    },
    feedback_topik: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    skor_grammar: {
        type: DataTypes.INTEGER(2),
        defaultValue: 0,
        allowNull: false
    },
    feedback_grammar: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    skor_gaya: {
        type: DataTypes.INTEGER(2),
        defaultValue: 0,
        allowNull: false
    },
    feedback_gaya: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    skor_panjang: {
        type: DataTypes.INTEGER(2),
        defaultValue: 0,
        allowNull: false
    },
    feedback_panjang: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },

    tanggal_review: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: true
});

export default Penilaian;