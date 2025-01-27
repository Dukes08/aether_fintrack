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
exports.getOperationsService = exports.createOperationService = exports.getAllOperationsService = void 0;
const Operation_1 = require("../models/operations/Operation");
const Contact_1 = require("../models/contact/Contact");
const getAllOperationsService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const operations = yield Operation_1.Operation.find();
        return operations;
    }
    catch (error) {
        console.error("Error al obtener operaciones en el servicio:", error);
        throw new Error("Error al obtener operaciones");
    }
});
exports.getAllOperationsService = getAllOperationsService;
const createOperationService = (contactId, amount, concept, type) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const operation = yield Operation_1.Operation.create({
            contactId,
            amount,
            concept,
            type,
        });
        const update = type === "income"
            ? { $inc: { balance: amount } }
            : { $inc: { balance: -amount } };
        const contact = yield Contact_1.Contact.findByIdAndUpdate(contactId, update, {
            new: true,
        });
        if (contact) {
            contact.operations.push(operation._id);
            yield contact.save();
        }
        return operation;
    }
    catch (error) {
        console.error("Error al crear operación en el servicio:", error);
        throw new Error("Error al crear operación");
    }
});
exports.createOperationService = createOperationService;
const getOperationsService = (contactId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const operations = yield Operation_1.Operation.find({ contactId });
        yield Promise.all(operations.map((operation) => operation.populate("contactId")));
        return operations;
    }
    catch (error) {
        console.error("Error al obtener operaciones en el servicio:", error);
        throw new Error("Error al obtener operaciones");
    }
});
exports.getOperationsService = getOperationsService;
//# sourceMappingURL=operation.service.js.map