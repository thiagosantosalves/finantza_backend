import express from 'express';
import router from './routes';
import path from 'path';
import cors from 'cors';
import ControllerCronRelease from './utils/ControllerCronRelease';

import './database';

class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.router();
        this.cronReleases();
    }

    middlewares() {
        this.server.use(cors());
        //this.server.use(cors( { origin: 'https://site.com.br' }));
        this.server.use(express.json());
        this.server.use('/files', express.static(path.resolve(__dirname, '.', '..', 'src', 'upload')));
    }

    cronReleases() {
        ControllerCronRelease.fixedReleases();
        ControllerCronRelease.installmentsReleases();
    }
    
    router() {
        this.server.use(router);
    }
}


export default new App().server;