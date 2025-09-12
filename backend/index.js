import serverlessHttp from 'serverless-http';
import app from './server.js';

export const handler = serverlessHttp(app);