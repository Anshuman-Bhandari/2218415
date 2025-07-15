// urlshortner/controllers/url.controller.js
import { saveUrl, getUrl, getStats, recordClick, exists } from '../db/store.js';
import { generateShortCode } from '../utils/shortener.js';
import { Log } from '../logging-middleware/logService.js';

export const createShortUrl = async (req, res) => {
  try {
    const { url, validity = 30, shortcode } = req.body;

    if (!url || typeof url !== 'string') {
      await Log("backend", "error", "url", "Invalid or missing URL");
      return res.status(400).json({ error: "Invalid URL" });
    }

    const code = shortcode || generateShortCode();

    if (exists(code)) {
      await Log("backend", "warn", "url", `Shortcode '${code}' already exists`);
      return res.status(409).json({ error: "Shortcode already exists" });
    }

    const expiry = new Date(Date.now() + validity * 60 * 1000);
    saveUrl(code, url, expiry);

    await Log("backend", "info", "url", `Created short URL '${code}' for '${url}'`);

    res.status(201).json({
      shortLink: `http://localhost:3000/${code}`,
      expiry: expiry.toISOString()
    });
  } catch (err) {
    await Log("backend", "fatal", "url", `Create failed: ${err.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

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
