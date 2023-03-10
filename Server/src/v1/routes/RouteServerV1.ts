// Imports
import express from "express";
import fileUplodad from "express-fileupload";
import FileSystemController from "../../controllers/FileSystemController";
import IValidator from "../../middlewares/IValidator";
import Validator from "../../middlewares/Validator";

// Class Route
class RouteServerV1 {
    private router: express.Router;
    private fileSystemController: FileSystemController;
    private validator: IValidator;
    private static instance: RouteServerV1;

    private constructor() {
        this.router = express.Router();
        this.router.use(fileUplodad());
        this.fileSystemController = FileSystemController.getInstance();
        this.validator = Validator.getInstance();
    }

    // Singleton pattern
    static getInstance(): RouteServerV1 {
        if (!this.instance) {
            this.instance = new RouteServerV1();
        }
        return this.instance;
    }

    fsRoutes(): express.Router {
        this.router.get('/:path?', this.fileSystemController.getContentOfDir.bind(this.fileSystemController));
        this.router.get('/files/download/:path?', this.validator.checkEmptyPath, this.fileSystemController.downloadFiles.bind(this.fileSystemController));
        this.router.post('/:path?', this.validator.checkEmptyPath, this.fileSystemController.createDir.bind(this.fileSystemController));
        this.router.post('/files/upload/:path?', this.fileSystemController.insertFilesFromClient.bind(this.fileSystemController));
        this.router.put('/:path?', this.validator.checkEmptyPath, this.validator.checkNameBodyParameter, this.fileSystemController.updateDirOrFileName.bind(this.fileSystemController));
        this.router.delete('/:path?', this.validator.checkEmptyPath, this.fileSystemController.deleteFileOrDir.bind(this.fileSystemController));

        return this.router;
    }
}

// Export
export default RouteServerV1;