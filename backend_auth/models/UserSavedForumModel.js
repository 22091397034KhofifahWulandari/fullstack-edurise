// models/UserSavedForumModel.js
import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";

const UserSavedForum = db.define('user_saved_forum', {
    savedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['userId', 'forumId'] // Kombinasi userId dan forumId harus unik
        }
    ]
});

export default UserSavedForum;