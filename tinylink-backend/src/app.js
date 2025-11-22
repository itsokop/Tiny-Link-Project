import express from 'express';
import linksRoutes from './routes/links.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(express.json());
app.use('/api/links', linksRoutes);

// Health check
app.get('/healthz', (req, res) => {
  res.status(200).json({ ok: true, version: '1.0' });
});

// Error middleware
app.use(errorHandler);

export default app;
