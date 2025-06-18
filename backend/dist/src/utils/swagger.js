// src/utils/swagger.ts
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
// const swaggerPath = path.resolve(__dirname, '../../docs/swagger.yaml');
// const swaggerPath = '../../docs/swagger.yaml'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const swaggerPath = resolve(__dirname, '../../../docs/swagger.yaml');
const swaggerDocument = yaml.load(fs.readFileSync(swaggerPath, 'utf8'));
export { swaggerUi, swaggerDocument };
