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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContactService = exports.createContactService = exports.getAllContactsService = void 0;
const Contact_1 = require("../models/contact/Contact");
const getAllContactsService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield Contact_1.Contact.find();
        return contacts;
    }
    catch (error) {
        console.error('Error al obtener contactos en el servicio:', error);
        throw new Error('Error al obtener contactos');
    }
});
exports.getAllContactsService = getAllContactsService;
const createContactService = (name, email, balance, operations) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newContact = new Contact_1.Contact({
            name,
            email,
            balance,
            operations
        });
        yield newContact.save();
        return newContact;
    }
    catch (error) {
        console.error('Error al crear contacto en el servicio:', error);
        throw new Error('Error al crear contacto');
    }
});
exports.createContactService = createContactService;
const updateContactService = (id, name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedContact = yield Contact_1.Contact.findByIdAndUpdate(id, { name }, { new: true });
        if (!updatedContact) {
            throw new Error('Contacto no encontrado');
        }
        return updatedContact;
    }
    catch (error) {
        console.error('Error al actualizar contacto en el servicio:', error);
        throw new Error('Error al actualizar contacto');
    }
});
exports.updateContactService = updateContactService;
//# sourceMappingURL=contact.service.js.map