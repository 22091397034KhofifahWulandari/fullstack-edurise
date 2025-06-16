import { Sequelize } from "sequelize";

const db = new Sequelize('edurise_db', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;