import express from 'express';
import ContactService from "../services/contact-service";


class ContactRoutes {
    router = express.Router();
    service = new ContactService();
    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.post('/identity', this.service.contact);
        // this.router.get('/customer', this.controller.find);
        this.router.get('/hi',(req,res) => {
            res.send("hi")
        });
    }
}

export default new ContactRoutes().router;