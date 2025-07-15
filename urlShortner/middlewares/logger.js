import { Log } from '../services/logService.js';

const loggerMiddleware = async (req, res, next) => {
  const start = Date.now();

  res.on('finish', async () => {
    const duration = Date.now() - start;
    await Log("backend", "info", "middleware", `Handled ${req.method} ${req.originalUrl} in ${duration}ms`);

    if (res.statusCode >= 400) {
      await Log("backend", "error", "middleware", `Error ${res.statusCode} on ${req.originalUrl}`);
    }
  });

  next();
};

export default loggerMiddleware;
