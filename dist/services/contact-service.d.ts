import { Request, Response } from 'express';
export default class ContactService {
    contact(req: Request, res: Response): Promise<void>;
}
