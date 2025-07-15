import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

const url = 'http://20.244.56.144/evaluation-service/log'
const key = process.env.LOGGING_API_TOKEN

export async function log(x, y, z, msg) {
  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
      },
      body: JSON.stringify({
        stack: x,
        level: y,
        package: z,
        message: msg,
      }),
    })

    console.log(`[${y}] ${z}: ${msg}`)
  } catch (e) {
    console.error('err', e.message)
  }
}
