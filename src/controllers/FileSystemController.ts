// Imports
import { Request, Response } from "express";
import IServiceFS from "../services/IServiceFS";
import ServiceFS from "../services/ServiceFS";

// Class
// The controller for file system
class FileSystemController {
    private serviceFS: IServiceFS;
    private static instance: FileSystemController;

    private constructor() {
        this.serviceFS = ServiceFS.getInstance();
    }

    // Singleton pattern
    static getInstance(): FileSystemController {
        if (!this.instance) {
            this.instance = new FileSystemController();
        }
        return this.instance;
    }

    foo(req: Request, res: Response): void {
        this.serviceFS.getAllFiles();
        res.json('prueba');
    }
}

// Export
export default FileSystemController;