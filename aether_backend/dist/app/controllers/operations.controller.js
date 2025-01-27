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
exports.getOperationsController = exports.createOperationController = exports.getAllOperationsController = void 0;
const operation_service_1 = require("../services/operation.service");
const getAllOperationsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const operations = yield (0, operation_service_1.getAllOperationsService)();
        if (!operations) {
            res.status(404).json({
                status: 'error',
                message: 'No se encontraron operaciones',
            });
            return;
        }
        res.status(200).json({
            status: 'success',
            message: 'Operaciones obtenidas correctamente',
            data: operations,
        });
    }
    catch (error) {
        console.error('Error al obtener operaciones:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener operaciones',
        });
    }
});
exports.getAllOperationsController = getAllOperationsController;
const createOperationController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contactId, amount, concept, type } = req.body;
        if (!contactId || !amount || !concept || !type) {
            res.status(400).json({
                status: 'error',
                message: 'Todos los campos son requeridos',
            });
            return;
        }
        const operation = yield (0, operation_service_1.createOperationService)(contactId, amount, concept, type);
        res.status(201).json({
            status: 'success',
            message: 'Operación creada correctamente',
            data: operation,
        });
    }
    catch (error) {
        console.error('Error al crear operación:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error al crear operación',
        });
    }
});
exports.createOperationController = createOperationController;
const getOperationsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contactId } = req.params;
        if (!contactId) {
            res.status(400).json({
                status: 'error',
                message: 'El id del contacto es requerido',
            });
            return;
        }
        const operations = yield (0, operation_service_1.getOperationsService)(contactId);
        if (!operations) {
            res.status(404).json({
                status: 'error',
                message: 'No se encontraron operaciones',
            });
            return;
        }
        res.status(200).json({
            status: 'success',
            message: 'Operaciones obtenidas correctamente',
            data: operations,
        });
    }
    catch (error) {
        console.error('Error al obtener operaciones:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener operaciones',
        });
    }
});
exports.getOperationsController = getOperationsController;
//# sourceMappingURL=operations.controller.js.map