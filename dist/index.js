"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./dbConfig/config"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(body_parser_1.default.json());
new routes_1.default(app);
config_1.default.sync();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
