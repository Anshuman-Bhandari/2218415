import { log } from './logService.js'


export const requestLogger = async (req, res, next) => {
  const msg = req.method + ' ' + req.url + ' ' + req.ip;
  await log('backend', 'info', 'req', msg);
  next();
};
