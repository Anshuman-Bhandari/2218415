import { recordClick } from '../db/store.js';
import { getStats } from '../db/store.js';
import { Log } from '../logService.js';
import { saveUrl, exists } from '../db/store.js';
import { generateShortCode } from '../utils/shortener.js';


export const redirectToLongUrl = async (req, res) => {
  const code = req.params.code;
  const data = getUrl(code);

  if (!data) {
    await Log("backend", "warn", "url", `Shortcode '${code}' not found or expired`);
    return res.status(404).json({ error: "Short URL not found or expired" });
  }

  const referrer = req.get("Referrer") || "direct";
  recordClick(code, referrer, "IN"); 
  await Log("backend", "info", "url", `Redirected '${code}'`);
  res.redirect(data);
};

export const getUrlStats = async (req, res) => {
  const code = req.params.code;
  const stats = getStats(code);

  if (!stats) {
    await Log("backend", "warn", "url", `Stats not found for '${code}'`);
    return res.status(404).json({ error: "Shortcode not found" });
  }

  await Log("backend", "info", "url", `Stats served for '${code}'`);
  res.status(200).json(stats);
};


export const createShortUrl = async (req, res) => {
  try {
    const { url, validity = 30, shortcode } = req.body;

    if (!url || typeof url !== 'string') {
      await Log("backend", "error", "url", "Invalid or missing URL");
      return res.status(400).json({ error: "Invalid URL" });
    }

    const code = generateShortCode(shortcode);
    const now = new Date();
    const expiryDate = new Date(now.getTime() + validity * 60000); 

    saveUrl(code, url, expiryDate);

    await Log("backend", "info", "url", `Shortened URL '${url}' to '${code}' for ${validity} minutes`);

    res.status(201).json({
      shortLink: `http://localhost:3000/${code}`,
      expiry: expiryDate.toISOString()
    });
  } catch (err) {
    await Log("backend", "fatal", "url", "Failed to create short URL");
    res.status(500).json({ error: "Something went wrong" });
  }
};
