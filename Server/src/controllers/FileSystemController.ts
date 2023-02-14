// Imports
import { NextFunction, Request, Response } from "express";
import mime from "mime";
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

    async getContentOfDir(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let path = '';
            if (req.params.path) {
                path = req.params.path;
            }
            const content = await this.service.getAllFiles(path);
            // Log content
            console.log(content)
            res.status(200).json(content);
            return;
        } catch (error) {
            next(error);
        }
    }

    async updateDirOrFileName(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const path = req.params.path;

            console.log(path);
            console.log(req.body);

            await this.service.updateDirOrFileName(path, req.body.name);
            console.log(`The file or directory [${path}] has been updated to name [${req.body.name}]`);
            res.status(200).json(`The file or directory [${path}] has been updated to name [${req.body.name}]`);
            return;
        } catch (error) {
            next(error);
        }
    }

    async deleteFileOrDir(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const path = req.params.path;
            
            await this.service.deleteFileOrDir(path);
            res.status(200).json(`The file or directory [${path}] has been removed`);
            return;
        } catch (error) {
            next(error);
        }
    }

    async createDir(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const path = req.params.path;
            
            await this.service.insertDir(path);
            res.status(201).json(`The directory [${path}] has been created`);
            return;
        } catch (error) {
            next(error);
        }
    }

    async insertFilesFromClient(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let path = '';
            if (req.params.path) {
                path = req.params.path;
            } 

            if (!req.files) {
                res.status(404).json('Files not provided');
                return;
            }
            
            if (!req.files.files) {
                res.status(400).json('The body key of form-data must be [files]');
                return;
            }

            await this.service.insertFiles(req.files.files, path);
            res.status(201).json(`The files has been added`);
            return;
        } catch (error) {
            next(error);
        }
    }

    async downloadFiles(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const path = req.params.path;
            
            const content = await this.service.downloadFile(path);
            const mimeType = mime.getType(content.pathProc) || "";
            
            res.setHeader('Content-Disposition', `attachment; filename=${content.pathProc}`);
            res.setHeader('Content-Type', mimeType);
            res.status(200).send(content.file);
            return;
        } catch (error) {
            next(error);
        }
    }
}

// Export
export default FileSystemController;