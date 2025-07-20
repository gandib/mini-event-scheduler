import express, { Request, Response } from 'express';
import cors from 'cors';
import routes from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Route
app.use('/api', routes);

// Health check route
app.get('/', (req: Request, res: Response) => {
  res.send('Mini Event Scheduler server is running!');
});

// Global Error handler
app.use(globalErrorHandler);

// No routes found
app.use(notFound);

export default app;
