import app from './app.js';
import config from './config/config.js';

import formatPersons from './format-items-error.js';

const server = app.listen(config.port, () => {
  console.log(`Server started at http://localhost:${config.port}`);
});

export default server;
