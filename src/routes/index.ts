import { Application } from 'express';
import contactRoutes from './contactRouter';

export default class Routes {
    constructor (app: Application){
        app.use("/api",contactRoutes)
    }
}