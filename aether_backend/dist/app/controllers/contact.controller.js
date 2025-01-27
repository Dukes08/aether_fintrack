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
exports.updateContactController = exports.createContactController = exports.getAllContactsController = void 0;
const contact_service_1 = require("../services/contact.service");
const getAllContactsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield (0, contact_service_1.getAllContactsService)();
        if (!contacts) {
            res.status(404).json({
                status: 'error',
                message: 'No se encontraron contactos',
            });
            return;
        }
        res.status(200).json({
            status: 'success',
            message: 'Contactos obtenidos correctamente',
            data: contacts,
        });
    }
    catch (error) {
        console.error('Error al obtener contactos:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener contactos',
        });
    }
});
exports.getAllContactsController = getAllContactsController;
const createContactController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            res.status(400).json({
                status: 'error',
                message: 'Todos los campos son requeridos',
            });
            return;
        }
        let balance = 0;
        let operations = [];
        const newContact = yield (0, contact_service_1.createContactService)(name, email, balance, operations);
        res.status(201).json({
            status: 'success',
            message: 'Contacto creado correctamente',
            data: newContact,
        });
    }
    catch (error) {
        console.error('Error al crear contacto:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error al crear contacto',
        });
    }
});
exports.createContactController = createContactController;
const updateContactController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name } = req.body;
        if (!id || !name) {
            res.status(400).json({
                status: 'error',
                message: 'Todos los campos son requeridos',
            });
            return;
        }
        const updatedContact = yield (0, contact_service_1.updateContactService)(id, name);
        res.status(200).json({
            status: 'success',
            message: 'Contacto actualizado correctamente',
            data: updatedContact,
        });
    }
    catch (error) {
        console.error('Error al actualizar contacto:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error al actualizar contacto',
        });
    }
});
exports.updateContactController = updateContactController;
//# sourceMappingURL=contact.controller.js.map