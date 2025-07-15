// logging-middleware/logService.js
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const LOGGING_API = 'http://20.244.56.144/evaluation-service/log';
const TOKEN = process.env.LOGGING_API_TOKEN;

export async function Log(stack, level, pkg, message) {
  try {
    await fetch(LOGGING_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message,
      }),
    });

    // Optional: local debug output
    console.log(`[${level.toUpperCase()}] ${pkg}: ${message}`);
  } catch (err) {
    console.error('[LOGGING ERROR]', err.message);
  }
}
