// Importar módulos
import 'tsconfig-paths/register';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import registerRoutes from './app/routers/index';
import connectDb from './app/configs/database';

dotenv.config();

// Crear la aplicación de Express
const App: Application = express();
const port: number = parseInt(process.env.PORT || '3001', 10);

// Configuración de middleware
App.use(express.json());
App.use(cors());

// Rutas o controladores que utilizan la conexión
App.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    res.send('It works!');
  } catch (error) {
    console.error('Error al realizar operaciones en la base de datos:', error);
    res.status(500).send('Internal Server Error, check logs');
  }
});

// Registrar las rutas
registerRoutes(App);

// Iniciar el servidor
const startServer = async (): Promise<void> => {
  try {
    await connectDb();
    App.listen(port, () => {
      console.log(`Mi port ${port}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error starting the server:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
    process.exit(1);
  }
};

startServer();