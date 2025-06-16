// models/UserSavedKompetisiModel.js
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const UserSavedKompetisi = db.define('user_saved_kompetisi', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    kompetisiId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
}, {
    freezeTableName: true
});

export default UserSavedKompetisi;