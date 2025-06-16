// models/ForumParticipantModel.js
import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";

const ForumParticipant = db.define('forum_participants', {
    joinedAt: {
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

export default ForumParticipant;