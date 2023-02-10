// Imports
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import RouteServerV1 from './v1/routes/route';

// Class server

class Server {
    private server: express.Application;
    private port: number;
    private routerV1: RouteServerV1;
    private static instance: Server;

    private constructor(port: number) {
        this.server = express();
        this.port = port;
        this.routerV1 = RouteServerV1.getInstance();
    }

    // Singleton Pattern
    static getInstance(port: number): Server {
        if (!this.instance) {
            this.instance = new Server(port);
        }
        return this.instance;
    }

    config(): void {
        this.server.use(cors());
        this.server.use(morgan('dev'));
        this.server.use(express.json());
    }

    routes(): void {
        this.server.use(this.routerV1.fsRoutes());
    }

    start(): void {
        this.server.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }
}

// Exports
export default Server;