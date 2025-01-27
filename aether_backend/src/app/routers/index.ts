// Importar módulos
import { Application } from 'express';
import contactRouter from './contact.router';
import operationRouter from './operation.router';

// Función para registrar las rutas
const registerRoutes = (app: Application): void => {
    app.use('/v1', contactRouter);
    app.use('/v1', operationRouter);
};

export default registerRoutes;