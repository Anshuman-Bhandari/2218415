import express from 'express';
import {
  createShortUrl,
  redirectToLongUrl,
  getUrlStats
} from '../controllers/url.controller.js';


const router = express.Router();

router.post('/shorturls', createShortUrl);
router.get('/:code', redirectToLongUrl);
router.get('/shorturls/:code', getUrlStats);


export default router;
