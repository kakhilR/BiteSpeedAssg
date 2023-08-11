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
const helper_1 = require("../helper");
const Contact_1 = __importDefault(require("../models/Contact"));
class ContactRepository {
    contactInfo(contact) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, phoneNumber } = contact;
            console.log(email, phoneNumber, "email and password");
            try {
                if ((email !== null && email !== "") && (phoneNumber !== null && phoneNumber !== "")) {
                    let byEmail = yield Contact_1.default.findOne({
                        where: { email }
                    });
                    let byPhoneNumber = yield Contact_1.default.findOne({
                        where: { phoneNumber }
                    });
                    console.log(byEmail === null || byEmail === void 0 ? void 0 : byEmail.linkPrecedence, byPhoneNumber === null || byPhoneNumber === void 0 ? void 0 : byPhoneNumber.linkPrecedence, "phone number and email");
                    if ((byEmail === null || byEmail === void 0 ? void 0 : byEmail.linkPrecedence) === 'primary' && (byPhoneNumber === null || byPhoneNumber === void 0 ? void 0 : byPhoneNumber.linkPrecedence) === 'primary') {
                        console.log("entred in");
                        const setSecondary = yield Contact_1.default.update({
                            linkedId: byEmail === null || byEmail === void 0 ? void 0 : byEmail.dataValues.id,
                            linkPrecedence: 'secondary',
                        }, { where: { id: byPhoneNumber.dataValues.id } });
                        const idToUpdate = yield Contact_1.default.findAll({ where: { linkedId: byPhoneNumber === null || byPhoneNumber === void 0 ? void 0 : byPhoneNumber.dataValues.id } });
                        const updateId = idToUpdate.map(up => up.id);
                        yield Contact_1.default.update({ linkedId: byEmail === null || byEmail === void 0 ? void 0 : byEmail.dataValues.id }, { where: { id: updateId } });
                        return (0, helper_1.helper)(byEmail === null || byEmail === void 0 ? void 0 : byEmail.dataValues.id);
                    }
                }
                let contacts = yield Contact_1.default.findAll({
                    where: {
                        [sequelize_1.Op.or]: [{ email }, { phoneNumber }],
                    }
                });
                console.log(contacts, "contacts");
                if (contacts.length == 0 && (email !== null && email !== "") && (phoneNumber !== null && phoneNumber !== "")) {
                    // Creating a new primary contact
                    console.log("creating new contact");
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
                const existingContacts = contacts.find(_contact => _contact.linkPrecedence === 'primary');
                let contactId;
                if (existingContacts) {
                    contactId = existingContacts === null || existingContacts === void 0 ? void 0 : existingContacts.dataValues.id;
                }
                else {
                    const isEmail = yield Contact_1.default.findOne({ where: { email } });
                    contactId = isEmail === null || isEmail === void 0 ? void 0 : isEmail.dataValues.linkedId;
                }
                console.log(contactId);
                if ((email !== null && email !== "") && (phoneNumber !== null && phoneNumber !== "")) {
                    const isEmail = yield Contact_1.default.findOne({ where: { email } });
                    const isNumber = yield Contact_1.default.findOne({ where: { phoneNumber } });
                    if (isEmail && isNumber) {
                        console.log("from eisting one");
                        return (0, helper_1.helper)(contactId);
                    }
                    console.log("from eisting 2");
                    const newContact = yield Contact_1.default.create({
                        email: email,
                        phoneNumber: phoneNumber,
                        linkPrecedence: 'secondary',
                        linkedId: contactId
                    });
                }
                return (0, helper_1.helper)(contactId);
            }
            catch (err) {
                return err;
            }
        });
    }
}
exports.default = new ContactRepository();
