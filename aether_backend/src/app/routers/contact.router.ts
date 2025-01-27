import { Router } from 'express';
import { createContactController, getAllContactsController, updateContactController } from '../controllers/contact.controller';

const router = Router();

/**
 * @version        :1.0.0
 * @description    :Listar todos los contactos
 * @method         :GET
 */
router.get('/contacts', getAllContactsController);

/**
 * 
 * @version        :1.0.0
 * @description    :Crear un contacto
 * @method         :POST
 * @param {String} :name 
 * @param {String} :email
 * @param {Number} :balance
 * @param {Array}  :operations
 * @returns        :{Object} Contact
 * 
 */
router.post('/contact', createContactController);

/**
 * 
 * @version        :1.0.0
 * @description    :Actualizar un contacto
 * @method         :PUT
 * @param {String} :id
 * @param {String} :name
 * @return        :{Object} Contact
 * 
 */
router.put('/contact/:id', updateContactController);

export default router;
