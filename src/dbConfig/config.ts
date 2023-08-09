import dotEnv from 'dotenv';
import { Sequelize } from 'sequelize';
dotEnv.config();

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbHost = process.env.DB_HOST
const dbPassword = process.env.DB_PASSWORD as string

console.log(dbName,"process.env.DB_NAME")
console.log(dbHost,"process.env.DB_NAME")
console.log(dbPassword,"process.env.DB_NAME")

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;