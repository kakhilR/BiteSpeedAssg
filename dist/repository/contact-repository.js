"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Contact_1 = __importDefault(require("../models/Contact"));
class ContactRepository {
    contactInfo(contact) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, phoneNumber } = contact;
            console.log(email, phoneNumber, "email and password");
            try {
                const contacts = yield Contact_1.default.findAll({
                    where: {
                        [sequelize_1.Op.or]: [{ email }, { phoneNumber }],
                    }
                });
                if (contacts.length === 0) {
                    // Creating a new primary contact
                    console.log("from here");
                    const newPrimary = yield Contact_1.default.create({
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
                console.log(contacts, "contacts");
                let existingContactId;
                let contact = {};
                const existingContacts = contacts.find(contact => contact.linkPrecedence === 'primary');
                console.log(existingContacts, "contatcs");
                existingContactId = existingContacts.dataValues.id;
                let existingEmails = contacts.map(_contact => _contact.email);
                console.log(existingEmails, "eistigh mails");
                let existingPhoneNumbers = contacts.map(_contact => _contact.phoneNumber);
                const secondaryContacts = contacts.filter(_contact => _contact.linkPrecedence === 'secondary');
                const secondaryIds = secondaryContacts.map(_contact => _contact.id);
                let newEmail = null;
                let newPhoneNumber = null;
                if (email != null && !existingEmails.includes(email)) {
                    newEmail = email;
                    newPhoneNumber = phoneNumber;
                }
                if (phoneNumber != null && !existingPhoneNumbers.includes(phoneNumber)) {
                    newEmail = email;
                    newPhoneNumber = phoneNumber;
                }
                if (newEmail !== null && newPhoneNumber !== null) {
                    console.log("from eisting one");
                    const newContact = yield Contact_1.default.create({
                        email: newEmail,
                        phoneNumber: newPhoneNumber,
                        linkPrecedence: 'secondary',
                        linkedId: existingContactId
                    });
                    existingEmails.push(newEmail);
                    existingPhoneNumbers.push(newPhoneNumber);
                    console.log(newContact);
                    //   secondaryIds.push()
                }
                contact.primaryContactId = existingContactId;
                contact.emails = [existingEmails];
                contact.phoneNumbers = [existingPhoneNumbers];
                contact.secondaryContactIds = [secondaryIds];
                return ({ contact });
            }
            catch (err) {
                return err;
            }
        });
    }
}
exports.default = new ContactRepository();
