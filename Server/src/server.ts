// Imports
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import RouteServerV1 from './v1/routes/RouteServerV1';
import IError from './middlewares/IError';
import ErrorMiddleware from './middlewares/ErrorMiddleware';

// Class server

class Server {
    private server: express.Application;
    private port: number;
    private routerV1: RouteServerV1;
    private errors: IError;
    private static instance: Server;

    private constructor(port: number) {
        this.server = express();
        this.port = port;
        this.routerV1 = RouteServerV1.getInstance();
        this.errors = ErrorMiddleware.getInstance();
    }

    // Singleton Pattern
    static getInstance(port: number): Server {
        if (!this.instance) {
            this.instance = new Server(port);
        }
        return this.instance;
    }

    setMiddlewares(): void {
        this.server.use(cors());
        this.server.use(morgan('dev'));
        this.server.use(express.json());
    }

    routes(): void {
        this.server.use('/api/v1/', this.routerV1.fsRoutes());
    }

    setErrorMiddlewares(): void {
        this.server.use(this.errors.errorDirOrFileExists);
        this.server.use(this.errors.errorDirOrFileNotExists);
    }

    start(): void {
        this.server.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }
}

// Exports
export default Server;