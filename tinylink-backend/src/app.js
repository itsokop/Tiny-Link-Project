import express from 'express';
import cors from 'cors';
import linksRoutes from './routes/links.js';
import { redirectLink } from './controllers/linksController.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/links', linksRoutes);    // Other operations + stats endpoints
app.get('/:code', redirectLink);      // only for Redirect endpoint

// Health check 
app.get('/healthz', (req, res) => {
    res.status(200).json({ ok: true, version: '1.0' });
});

// Global error handler
app.use(errorHandler);

export default app;
