import Contact from "../models/Contact";

export const formateData = async (primaryContactId:any) =>{
    try{
        const primaryData:any = await Contact.findOne({where:{id:primaryContactId}})
    const data = await Contact.findAll({where:{linkedId:primaryContactId}})
    console.log(primaryData," primary data")
    let existingEmails = data.map(_contact => _contact.email)
    let existingPhoneNumbers = data.map(_contact => _contact.phoneNumber)
    const secondarydata = data.filter(_contact => _contact.linkPrecedence === 'secondary')
    const secondaryIds = secondarydata.map(_contact => _contact.id);
    existingEmails.push(primaryData?.dataValues.email)
    existingPhoneNumbers.push(primaryData?.dataValues.phoneNumber)

    existingEmails=existingEmails.filter((item, index, arr) => {
        return arr.indexOf(item) === index;
    });

    existingPhoneNumbers=existingPhoneNumbers.filter((item, index, arr) => {
        return arr.indexOf(item) === index;
    });
    return ({
        contact: {
            primaryContactId,
            emails: [existingEmails],
            phoneNumbers: [existingPhoneNumbers],
            secondaryContactIds: [secondaryIds],
        },
    });
    }catch(err){
        return {message:"something went wrong"}
    }
    
}
