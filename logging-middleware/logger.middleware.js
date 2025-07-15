// logging-middleware/logger.middleware.js
import { Log } from './logService.js';

export const requestLogger = async (req, res, next) => {
  const message = `${req.method} ${req.originalUrl} from ${req.ip}`;
  await Log('backend', 'info', 'request', message);
  next();
};
