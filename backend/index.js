import serverlessHttp from 'serverless-http';
import app from './server.js';
import { connectDB } from './config/db.js';

const serverlessHandler = serverlessHttp(app, {
    binary: false,
    request: (request, event, context) => {
        request.serverless = { event, context };
    },
    response: (response, event, context) => {
        response.headers = {
            ...response.headers,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        };
    }
});

export const handler = async (event, context) => {
    // Connect to database before handling request
    await connectDB();
    return serverlessHandler(event, context);
};