import { Op } from 'sequelize';
import { formateData } from '../helper';
import Contact from "../models/Contact";

interface contactInterface {
    contactInfo(contacts : any): Promise<any>;
}


class ContactRepository implements contactInterface {
    async contactInfo(contact:any): Promise<any>{
        const { email, phoneNumber} = contact;
        console.log(email,phoneNumber,"email and password")
        try{
            if((email!==null && email!=="") && (phoneNumber!==null && phoneNumber!=="")){
                let byEmail = await Contact.findOne({
                    where: { email }
                });

                let byPhoneNumber = await Contact.findOne({
                    where: { phoneNumber }
                });

                if(byEmail?.linkPrecedence==='primary' && byPhoneNumber?.linkPrecedence==='primary'){
                    console.log("entred in")
                    const setSecondary = await Contact.update({
                            linkedId:byEmail?.dataValues.id,
                            linkPrecedence: 'secondary',
                        },
                        {where:{id:byPhoneNumber.dataValues.id}}
                    );
                    const idToUpdate = await Contact.findAll({where:{linkedId:byPhoneNumber?.dataValues.id}})
                    const updateId = idToUpdate.map(up=>up.id);
                    await Contact.update({linkedId:byEmail?.dataValues.id},{where:{id:updateId}});

                    return formateData(byEmail?.dataValues.id)
                }
            }
            let contacts = await Contact.findAll({
                where: {
                  [Op.or]: [{ email }, { phoneNumber }],
                }
              });

              console.log(contacts,"contacts")

            if (contacts.length==0 && (email!==null && email!=="") && (phoneNumber!==null && phoneNumber!=="")) {
            // Creating a new primary contact
                console.log("creating new contact")
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

            const existingContacts = contacts.find(_contact => _contact.linkPrecedence === 'primary');
            let contactId;
            if(existingContacts){
                contactId = existingContacts?.dataValues.id
            }else{
                const isEmail =await Contact.findOne({where:{email}});
                contactId = isEmail?.dataValues.linkedId;
            }

            console.log(contactId)
            if((email!==null && email!=="") && (phoneNumber!== null && phoneNumber!=="")){
                const isEmail =await Contact.findOne({where:{email}});
                const isNumber =await Contact.findOne({where:{phoneNumber}})
                if(isEmail && isNumber){
                    console.log("from eisting one")
                    return formateData(contactId)
                }
                console.log("from eisting 2")
                const newContact = await Contact.create({
                    email:email,
                    phoneNumber:phoneNumber,
                    linkPrecedence: 'secondary',
                    linkedId: contactId
                  });
            }

            return formateData(contactId)
        }catch(err){
            return err
        }
    }
}

export default new ContactRepository()