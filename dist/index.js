"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./dbConfig/config"));
const app = (0, express_1.default)();
const port = 8000;
app.get('/hi', (req, res) => {
    res.send("hello");
});
config_1.default.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
