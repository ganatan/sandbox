'use strict';

const express = require('express');
const xssClean = require('xss-clean');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xssClean());

app.get('/ping', (req, res) => {
  res.json({ success: true, message: 'pong' });
});

module.exports = app;

// 'use strict';

// const express = require('express');

// const app = express();

// const xssClean = require('xss-clean');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(xssClean());

// app.get('/ping', (req, res) => {
//     res.json({ success: true, message: 'pong' });
//   });

// module.exports = app;









// 'use strict';

// const express = require('express');

// const configureSecurity = require('./infrastructure/middleware/security/security.js');
// const responseHandler = require('./infrastructure/middleware/response/response-handler.js');
// const errorHandler = require('./infrastructure/middleware/error/error-handler.js');

// const requestLogger = require('./infrastructure/logger/request-logger.js');
// const errorLogger = require('./infrastructure/logger/error-logger.js');

// const swaggerRoutes = require('./infrastructure/swagger/swagger.routes.js');

// const appRoutes = require('./routers/app.routes.js');
// const rootRoutes = require('./routers/root.routes.js');

// const app = express();


// // app.use(express.json());

// // configureSecurity(app);

// // app.use(requestLogger);

// // app.use('/api-docs', swaggerRoutes);

// const xssClean = require('xss-clean');
// // app.use(xssClean());


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(xssClean());

// app.use(appRoutes);
// app.use(rootRoutes);

// // app.use(responseHandler);
// // app.use(errorLogger);
// // app.use(errorHandler);

// module.exports = app;
