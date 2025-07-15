import express from 'express';
import loggingMiddleware from './middlewares/logger.js';
import urlRoutes from './routes/url.routes.js';

const app = express();
app.use(express.json());
app.use(loggingMiddleware);
app.use('/', urlRoutes);

export default app;
