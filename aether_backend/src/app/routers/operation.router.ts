import e, { Router } from 'express';
const router = Router();

import { createOperationController, getAllOperationsController, getOperationsController } from '../controllers/operations.controller';

/**
 * 
 * @version        :1.0.0
 * @description    :Listar todas las operaciones
 * @method         :GET
 * @returns        :{Object} Operation
 * 
 */
router.get('/operations', getAllOperationsController);

/**
 * 
 * @version        :1.0.0
 * @description    :Crear una operación
 * @method         :POST
 * @param {String} :contactId
 * @param {Number} :amount
 * @param {String} :concept
 * @param {String} :type (income, expense)
 * @returns        :{Object} Operation
 * 
 */
router.post('/operation', createOperationController);

/**
 * 
 * @version        :1.0.0
 * @description    :Listar operaciones de un contacto
 * @method         :GET
 * @param {String} :contactId
 * @returns        :{Object} Operation
 * 
 */
router.get('/operations/contact/:contactId', getOperationsController);

export default router;