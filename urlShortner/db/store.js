const db = new Map()

export const save = (k, v, t) => {
  db.set(k, {
    long: v,
    created: new Date(),
    end: t,
    hits: []
  })
}

export const get = (k) => {
  const d = db.get(k)
  if (!d) return null
  if (new Date() > d.end) {
    db.delete(k)
    return null
  }
  return d.long
}

export const has = (k) => {
  return db.has(k)
}

export const addHit = (k, from = 'unknown', loc = 'IN') => {
  const d = db.get(k)
  if (!d) return
  d.hits.push({
    time: new Date().toISOString(),
    from,
    loc
  })
}

export const stats = (k) => {
  const d = db.get(k)
  if (!d) return null
  return {
    url: d.long,
    made: d.created,
    till: d.end,
    count: d.hits.length,
    list: d.hits
  }
}
