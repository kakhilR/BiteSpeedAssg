import { Op } from 'sequelize';
import Contact from "../models/Contact";

interface resultInterface{
    primaryContactId: number,
    emails:string[],
    phoneNumbers:string[],
    secondaryContactId:number[],
}

interface contactInterface {
    contactInfo(contacts : any): Promise<any>;
}

class ContactRepository implements contactInterface {
    async contactInfo(contact:any): Promise<any>{
        const { email, phoneNumber} = contact;
        console.log(email,phoneNumber,"email and password")
        try{
            const contacts = await Contact.findAll({
                where: {
                  [Op.or]: [{ email }, { phoneNumber }],
                }
              });
            if (contacts.length === 0) {
            // Creating a new primary contact
                console.log("from here")
                const newPrimary = await Contact.create({
                    email,
                    phoneNumber,
                    linkPrecedence: 'primary',
                });
            
                return ({
                    contact: {
                    primaryContactId: newPrimary.id,
                    emails: [email],
                    phoneNumbers: [phoneNumber],
                    secondaryContactIds: [],
                    },
                });
            }
            console.log(contacts,"contacts")
            let existingContactId;
            let contact:any ={};
            const existingContacts:any = contacts.find(contact => contact.linkPrecedence === 'primary');
            console.log(existingContacts,"contatcs")
            existingContactId = existingContacts.dataValues.id
            let existingEmails = contacts.map(_contact => _contact.email);
            console.log(existingEmails,"eistigh mails")
            let existingPhoneNumbers = contacts.map(_contact => _contact.phoneNumber);
            const secondaryContacts = contacts.filter(_contact => _contact.linkPrecedence === 'secondary')
            const secondaryIds = secondaryContacts.map(_contact => _contact.id);
            let newEmail:any=null;
            let newPhoneNumber:any =null;

            if(email!=null && !existingEmails.includes(email)){
            newEmail = email;
            newPhoneNumber=phoneNumber;
            }
    
            if(phoneNumber!=null && !existingPhoneNumbers.includes(phoneNumber)){
                newEmail = email;
                newPhoneNumber = phoneNumber;
            }
    
            if(newEmail!==null && newPhoneNumber!==null){
                console.log("from eisting one")
                const newContact = await Contact.create({
                    email:newEmail,
                    phoneNumber:newPhoneNumber,
                    linkPrecedence: 'secondary',
                    linkedId: existingContactId
                  });
                  existingEmails.push(newEmail);
                  existingPhoneNumbers.push(newPhoneNumber);
                  console.log(newContact)
                //   secondaryIds.push()
            }

            contact.primaryContactId = existingContactId;
            contact.emails = [existingEmails];
            contact.phoneNumbers = [existingPhoneNumbers];
            contact.secondaryContactIds=[secondaryIds]

            return ({contact})
        }catch(err){
            return err
        }
    }
}

export default new ContactRepository()