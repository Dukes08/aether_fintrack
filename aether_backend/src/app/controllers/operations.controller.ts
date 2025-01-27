import { Request, Response, NextFunction } from "express";

import { createOperationService, getAllOperationsService, getOperationsService } from "../services/operation.service";

export const getAllOperationsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        const operations = await getAllOperationsService();

        if (operations.length === 0) {
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
    } catch (error) {
        console.error('Error al obtener operaciones:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener operaciones',
        });
    }
};

export const createOperationController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { contactId, amount, concept, type } = req.body;

        if (!contactId || !amount || !concept || !type) {
            res.status(400).json({
                status: 'error',
                message: 'Todos los campos son requeridos',
            });
            return;
        }

        // Crear operación
        const operation = await createOperationService(contactId, amount, concept, type);

        res.status(201).json({
            status: 'success',
            message: 'Operación creada correctamente',
            data: operation,
        });
    } catch (error) {
        console.error('Error al crear operación:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error al crear operación',
        });
    }
};

export const getOperationsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        const { contactId } = req.params;

        if (!contactId) {
            res.status(400).json({
                status: 'error',
                message: 'El id del contacto es requerido',
            });
            return;
        }

        const operations = await getOperationsService(contactId);

        if (operations.length === 0) {
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
    } catch (error) {
        console.error('Error al obtener operaciones:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener operaciones',
        });
    }
};