import { Sequelize } from "sequelize";
import dotenv from "dotenv";

const env = dotenv.config();

const db = new Sequelize('cqadb', 'root',process.env.MYSQL_PASSWORD, {
    host: "localhost",
    dialect: "mysql"
});

export default db;