"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contact_service_1 = __importDefault(require("../services/contact-service"));
class ContactRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.service = new contact_service_1.default();
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.post('/identity', this.service.contact);
        // this.router.get('/customer', this.controller.find);
        this.router.get('/hi', (req, res) => {
            res.send("hi");
        });
    }
}
exports.default = new ContactRoutes().router;
