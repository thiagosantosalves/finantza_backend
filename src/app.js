import express from 'express';
import router from './routes';
import path from 'path';
import cors from 'cors';

import './database';

class App {
    constructor() {
        this.server = express();

        this.middlewares();
        this.router();
    }

    middlewares() {
        this.server.use(cors());
        //this.server.use(cors( { origin: 'https://site.com.br' }));
        this.server.use(express.json());
        this.server.use('/files', express.static(path.resolve(__dirname, '.', '..', 'src', 'upload')));
    }
    
    router() {
        this.server.use(router);
    }
}


export default new App().server;