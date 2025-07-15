import { save, get, stats, addHit, has } from '../db/store.js'
import { makeCode } from '../utils/shortener.js'
import { log } from '../../logging-middleware/logService.js'

export const createShortUrl = async (req, res) => {
  try {
    const { url, validity = 30, shortcode } = req.body

    if (!url || typeof url !== 'string') {
      await log('b', 'error', 'url', 'bad url')
      return res.status(400).json({ error: 'invalid' })
    }

    const code = shortcode || makeCode()

    if (has(code)) {
      await log('b', 'warn', 'url', `${code} exists`)
      return res.status(409).json({ error: 'exists' })
    }

    const time = new Date(Date.now() + validity * 60000)
    save(code, url, time)

    await log('b', 'info', 'url', `made ${code} for ${url}`)

    res.status(201).json({
      shortLink: `http://localhost:3000/${code}`,
      expiry: time.toISOString()
    })
  } catch (e) {
    await log('b', 'fatal', 'url', `fail ${e.message}`)
    res.status(500).json({ error: 'server err' })
  }
}

export const redirectToLongUrl = async (req, res) => {
  const code = req.params.code
  const data = get(code)

  if (!data) {
    await log('b', 'warn', 'url', `${code} gone`)
    return res.status(404).json({ error: 'not found' })
  }

  const ref = req.get('Referrer') || 'direct'
  addHit(code, ref, 'IN')

  await log('b', 'info', 'url', `go ${code}`)
  res.redirect(data)
}

export const getUrlStats = async (req, res) => {
  const code = req.params.code
  const s = stats(code)

  if (!s) {
    await log('b', 'warn', 'url', `no stats ${code}`)
    return res.status(404).json({ error: 'no data' })
  }

  await log('b', 'info', 'url', `stats for ${code}`)
  res.status(200).json(s)
}
