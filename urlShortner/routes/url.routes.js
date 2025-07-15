import express from 'express'
import { createShortUrl, redirectToLongUrl, getUrlStats } from '../controllers/url.controller.js'

const r = express.Router()

r.post('/shorturls', createShortUrl)
r.get('/shorturls/:code', getUrlStats)
r.get('/:code', redirectToLongUrl)

export default r
