import { Request, Response, NextFunction } from "express";
import { createContactService, getAllContactsService, updateContactService } from "../services/contact.service";

export const getAllContactsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const contacts = await getAllContactsService();

        if (contacts.length === 0) {
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
    } catch (error) {
        console.error('Error al obtener contactos:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener contactos',
        });
    }
};

export const createContactController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
        let operations: string[] = [];

        // Crea un nuevo contacto
        const newContact = await createContactService( name, email, balance, operations);

        res.status(201).json({
            status: 'success',
            message: 'Contacto creado correctamente',
            data: newContact,
        });
    } catch (error) {
        console.error('Error al crear contacto:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error al crear contacto',
        });
    }
};

export const updateContactController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

        // Actualiza el contacto
        const updatedContact = await updateContactService(id, name);

        res.status(200).json({
            status: 'success',
            message: 'Contacto actualizado correctamente',
            data: updatedContact,
        });
    } catch (error) {
        console.error('Error al actualizar contacto:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error al actualizar contacto',
        });
    }
};
