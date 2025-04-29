'use strict';

const fs = require('fs');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = require('../../src/config/swagger.config');

function ensureDistDirectory() {
  const distPath = path.resolve(__dirname, '../../dist');
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true });
  }
  return distPath;
}

function generateSwaggerJson() {
  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  const distPath = ensureDistDirectory();
  const outputPath = path.join(distPath, 'swagger.json');

  fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2));

  console.log('✅ Swagger JSON generated successfully at', outputPath);
}

generateSwaggerJson();

// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerOptions = require('../../src/config/swagger.config');

// const swaggerSpec = swaggerJsdoc(swaggerOptions);

// const outputDir = path.resolve(__dirname, '../dist');
// const outputPath = path.join(outputDir, 'swagger.json');

// if (!fs.existsSync(outputDir)) {
//   fs.mkdirSync(outputDir, { recursive: true });
// }

// fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2));

// console.log('✅ Swagger JSON generated successfully.');
