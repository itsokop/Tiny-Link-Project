import { Router } from 'express';
import { createShortLink } from '../controllers/linksController.js';

const router = Router();

router.post('/', createShortLink);

export default router;
