import mongoose from 'mongoose';
import config from 'config';

import app from './app';
import connectDataBase from './dbConnection';
import { logEvents } from './middleware/logger.middleware';

const port = config.get<number>('port');

connectDataBase();

mongoose.connection.once('open', () => {
  console.log('Conectado ao mongoDB');
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
});

mongoose.connection.on('error', (err) => {
  const message = `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`;
  logEvents(message, 'mongoErrLog.log');
});
