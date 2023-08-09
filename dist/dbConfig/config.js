"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
dotenv_1.default.config();
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;
console.log(dbName, "process.env.DB_NAME");
console.log(dbHost, "process.env.DB_NAME");
console.log(dbPassword, "process.env.DB_NAME");
const sequelize = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
    host: 'localhost',
    dialect: 'mysql',
});
exports.default = sequelize;
