// Imports
import express from "express"
import FileSystemController from "../../controllers/FileSystemController";

// Class Route
class RouteServerV1 {
    private router: express.Router;
    private fileSystemController: FileSystemController;
    private static instance: RouteServerV1;

    private constructor() {
        this.router = express.Router();
        this.fileSystemController = FileSystemController.getInstance();
    }

    // Singleton pattern
    static getInstance(): RouteServerV1 {
        if (!this.instance) {
            this.instance = new RouteServerV1();
        }
        return this.instance;
    }

    fsRoutes(): express.Router {
        this.router.get('/:path?', this.fileSystemController.foo);

        return this.router;
    }
}

// Export
export default RouteServerV1;