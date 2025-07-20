# Installation

  Rajout de la notion de uuid et correlationId


  npm install uuid



  import { v4 as uuidv4 } from 'uuid';

  const correlationIdMiddleware = (req, res, next) => {
    req.correlationId = uuidv4();
    res.setHeader('X-Correlation-Id', req.correlationId);
    next();
  };

  export default correlationIdMiddleware;


  app.js
    app.use(correlationIdMiddleware);
    app.use(requestLogger);
