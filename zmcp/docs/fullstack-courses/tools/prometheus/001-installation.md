# Installation Prometheus avec SpringBoot
  Micrometer / Actuator

# Installation Prometheus avec Javascript ou Typescript
  npm install prom-client


# metrics.js
  import client from 'prom-client';

  const PROMETHEUS_ENABLED = process.env.PROMETHEUS_ENABLED === 'true';

  if (PROMETHEUS_ENABLED) {
    client.collectDefaultMetrics();
  }

  let httpRequestCounter = null;

  if (PROMETHEUS_ENABLED) {
    httpRequestCounter = new client.Counter({
      name: 'http_requests_total',
      help: 'Nombre total de requêtes HTTP',
      labelNames: ['method', 'route', 'status'],
    });
  }

  function incrementHttpRequests(method, route, status) {
    if (httpRequestCounter) {
      httpRequestCounter.inc({
        method: method,
        route: route,
        status: String(status),
      });
    }
  }

  export { client, incrementHttpRequests };


# metrics.routes.js

  import express from 'express';
  import { client } from '../infrastructure/metrics/metrics.js';

  const router = express.Router();

  const PROMETHEUS_ENABLED = process.env.PROMETHEUS_ENABLED === 'true';
  const PROMETHEUS_MODE = process.env.PROMETHEUS_MODE || 'all';

  router.get('/metrics', async (req, res) => {
    if (!PROMETHEUS_ENABLED) {
      res.status(404).send('Prometheus monitoring disabled');

      return;
    }

    res.set('Content-Type', client.register.contentType);

    if (PROMETHEUS_MODE === 'http_requests_total') {
      const metric = await client.register.getSingleMetricAsString('http_requests_total');
      res.end(metric);

      return;
    } else {
      const metrics = await client.register.metrics();
      res.end(metrics);

      return;
    }
  });

  export default router;

