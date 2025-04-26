'use strict';

const express = require('express');
const request = require('supertest');

const configureSecurity = require('../../security');
const config = require('../../../../../config/config');

describe('Security Middleware', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    configureSecurity(app);

    app.get('/test', (req, res) => {
      return res.status(200).json({ success: true });
    });

    app.post('/test', (req, res) => {
      if (!req.body) {
        return res.status(400).json({ success: false });
      }

      return res.status(200).json({
        success: true,
        sanitizedBody: req.body,
      });
    });
  });

  it('should set security headers with helmet', async () => {
    const response = await request(app).get('/test');

    expect(response.headers['x-dns-prefetch-control']).toBeDefined();
    expect(response.headers['x-frame-options']).toBeDefined();
    expect(response.headers['x-content-type-options']).toBeDefined();
    expect(response.headers['x-xss-protection']).toBeDefined();
  });

  it('should allow configured CORS origin', async () => {
    const response = await request(app).get('/test');
    const expectedOrigin = config.security.corsOrigin;

    expect(response.headers['access-control-allow-origin']).toBe(expectedOrigin);
  });
});
