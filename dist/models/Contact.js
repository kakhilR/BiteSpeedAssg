"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../dbConfig/config"));
class Contact extends sequelize_1.Model {
}
Contact.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    phoneNumber: sequelize_1.DataTypes.STRING,
    email: sequelize_1.DataTypes.STRING,
    linkedId: sequelize_1.DataTypes.INTEGER,
    linkPrecedence: sequelize_1.DataTypes.ENUM('primary', 'secondary'),
}, {
    sequelize: config_1.default,
    modelName: 'Contact',
});
exports.default = Contact;
