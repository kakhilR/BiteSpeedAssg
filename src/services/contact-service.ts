import { Request, Response } from 'express';
import ContactRepository from '../repository/contact-repository';


export default class ContactService{
        async contact(req:Request,res:Response){
        // if(!req.body){
        //     return res.send({message:"connot abe empty"})
        // }
        const { email, phoneNumber } = req.body;
        try{
            console.log(req.body,"from create controller")
            const _customer = await ContactRepository.contactInfo({email,phoneNumber})
            res.send(_customer)
        }catch(err){
            res.send({message: err})
        }
    }
}