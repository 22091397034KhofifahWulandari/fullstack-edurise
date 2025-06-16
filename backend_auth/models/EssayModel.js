// models/EssayModel.js
import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";

const Essay = db.define('essays', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isi_essay: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    tanggal_submit: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    total_skor: {
        type: DataTypes.INTEGER(3),
        defaultValue: 0,
        allowNull: false
    },
    feedback_ready: {
        type: DataTypes.TINYINT(1),
        defaultValue: 0,
        allowNull: false
    },
        total_skor: { // <-- Ini adalah kolom database
        type: DataTypes.INTEGER(3), // INT(3)
        defaultValue: 0,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: true
});

export default Essay;