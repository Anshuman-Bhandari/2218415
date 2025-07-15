import { nanoid } from 'nanoid';
import { exists } from '../db/store.js';

export const generateShortCode = (customCode = null) => {
  if (customCode && !exists(customCode)) return customCode;

  let code;
  do {
    code = nanoid(7);
  } while (exists(code));

  return code;
};
