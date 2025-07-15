import { Log } from './logService.js';

export const logReq = async (req, res, next) => {
  const msg = req.method + ' ' + req.url + ' ' + req.ip;
  await Log('backend', 'info', 'req', msg);
  next();
};
