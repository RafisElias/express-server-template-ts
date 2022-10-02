import fs, { promises as fsPromises } from 'fs';
import path from 'path';

import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import type { Request, Response, NextFunction } from 'express';

const PATH_LOG = path.join(__dirname, '..', 'logs');
const PATH_LOG_FILE = (logFileName: string) =>
  path.join(__dirname, '..', 'logs', logFileName);

export const logEvents = async (
  message: string,
  logFileName: 'errLog.log' | 'reqLog.log' | 'mongoErrLog.log'
) => {
  const dateTime = format(new Date(), 'yyyyMMdd HH:mm:ss');
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(PATH_LOG)) {
      await fsPromises.mkdir(PATH_LOG);
    }
    await fsPromises.appendFile(PATH_LOG_FILE(logFileName), logItem);
  } catch (err) {
    console.log('err');
  }
};

export const logger = (req: Request, _: Response, next: NextFunction) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log');
  next();
};
