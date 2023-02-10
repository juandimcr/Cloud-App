// Imports
import  { Request, Response } from "express";
import IServiceFS from "../services/IServiceFS";
import ServiceFS from "../services/ServiceFS";

// Class
// The controller for file system
class FileSystemController {
    private service: IServiceFS;
    private static instance: FileSystemController;

    private constructor() {
        this.service = ServiceFS.getInstance();
    }

    // Singleton pattern
    static getInstance(): FileSystemController {
        if (!this.instance) {
            this.instance = new FileSystemController();
        }
        return this.instance;
    }

    foo = (req: Request, res: Response): Response => {
        if (!req.params.path) {
            this.service.getAllFiles('');
        } else {
            this.service.getAllFiles(req.params.path);
        }
        return res.status(200).json('prueba')
    }

   
}

// Export
export default FileSystemController;