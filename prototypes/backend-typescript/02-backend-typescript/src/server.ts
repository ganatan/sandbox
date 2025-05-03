import app from './app';
import config from './core/config/config';

const server = app.listen(config.port, () => {
  console.log(`Server started at http://localhost:${config.port}`);
});

export default server;
