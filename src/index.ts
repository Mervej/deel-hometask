import { Server } from 'net';
import { createServer } from './server';
import AppConfig from './config/appConfig';
import * as dotenv from 'dotenv';
dotenv.config();


const PORT = AppConfig.app.port;

function startServer(): Server {
    const app = createServer();

    return app.listen(PORT, () => {
        console.log("listening on port", PORT)
    });
}

startServer();