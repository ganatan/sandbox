import app from './app';
import appConfig from './config/app.config';
import { Server } from 'http';

const server: Server = app.listen(appConfig.app.port, () => {
  console.log(`API listening on http://localhost:${appConfig.app.port}`);
});

export default server;
