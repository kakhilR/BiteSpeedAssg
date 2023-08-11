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
exports.formateData = void 0;
const Contact_1 = __importDefault(require("../models/Contact"));
const formateData = (primaryContactId) => __awaiter(void 0, void 0, void 0, function* () {
    const primaryData = yield Contact_1.default.findOne({ where: { id: primaryContactId } });
    const data = yield Contact_1.default.findAll({ where: { linkedId: primaryContactId } });
    console.log(primaryData, " primary data");
    let existingEmails = data.map(_contact => _contact.email);
    let existingPhoneNumbers = data.map(_contact => _contact.phoneNumber);
    const secondarydata = data.filter(_contact => _contact.linkPrecedence === 'secondary');
    const secondaryIds = secondarydata.map(_contact => _contact.id);
    existingEmails.push(primaryData === null || primaryData === void 0 ? void 0 : primaryData.dataValues.email);
    existingPhoneNumbers.push(primaryData === null || primaryData === void 0 ? void 0 : primaryData.dataValues.phoneNumber);
    existingEmails = existingEmails.filter((item, index, arr) => {
        return arr.indexOf(item) === index;
    });
    existingPhoneNumbers = existingPhoneNumbers.filter((item, index, arr) => {
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
});
exports.formateData = formateData;
