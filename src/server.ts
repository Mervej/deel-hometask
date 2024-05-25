import cors from 'cors';
import routes from './api/routes';
import express from 'express';
import { Application } from 'express';
const {sequelize} = require('./models/model')

export function createServer(): Application {
    const app = express();
    const corsOption = {
        origin: '*',
        credentials: true
    };

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors(corsOption));
    app.set('sequelize', sequelize)
    app.set('models', sequelize.models)
    app.use(routes);

    return app;
}