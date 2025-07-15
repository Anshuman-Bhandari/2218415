// urlshortner/db/store.js
const store = new Map();

export const saveUrl = (code, longUrl, expiresAt) => {
  store.set(code, {
    longUrl,
    createdAt: new Date(),
    expiresAt,
    clicks: []
  });
};

export const getUrl = (code) => {
  const data = store.get(code);
  if (!data) return null;
  if (new Date() > data.expiresAt) {
    store.delete(code);
    return null;
  }
  return data.longUrl;
};

export const exists = (code) => {
  return store.has(code);
};

export const recordClick = (code, referrer = "unknown", location = "IN") => {
  const data = store.get(code);
  if (!data) return;
  data.clicks.push({
    timestamp: new Date().toISOString(),
    referrer,
    location
  });
};

export const getStats = (code) => {
  const data = store.get(code);
  if (!data) return null;
  return {
    originalUrl: data.longUrl,
    createdAt: data.createdAt,
    expiry: data.expiresAt,
    clickCount: data.clicks.length,
    clickDetails: data.clicks
  };
};
