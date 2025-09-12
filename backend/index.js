const serverlessHttp = require('serverless-http');
const app = require('./server.js');

module.exports.handler = serverlessHttp(app);