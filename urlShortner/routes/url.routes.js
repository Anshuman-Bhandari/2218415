// urlshortner/routes/url.routes.js
import express from 'express';
import {
  createShortUrl,
  redirectToLongUrl,
  getUrlStats
} from '../controllers/url.controller.js';

const router = express.Router();

router.post('/shorturls', createShortUrl);
router.get('/shorturls/:code', getUrlStats);
router.get('/:code', redirectToLongUrl);

export default router;
