// Imports
import { Request, Response } from "express";
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

    async getContentOfDir(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            let path = '';
            if (req.params.path) {
                path = req.params.path;
            }
            const content = await this.service.getAllFiles(path);
            // Log content
            console.log(content)
            return res.status(200).json(content);
        } catch (error) {
            console.error(`The path '${req.params.path}' does not exit`)
            return res.status(404).json('Directory or file not found');
        }
    }

    async updateDirOrFileName(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            let path = '';
            if (req.params.path) {
                path = req.params.path;
            }
            console.log(req.body);
            if (!req.body.name) {
                return res.status(400).json('Not found "name" parameter in the body ');
            }
            return res.status(200).json(path);
        } catch (error) {
            console.error(`The path '${req.params.path}' does not exit`)
            return res.status(404).json('Directory or file not found');
        }
    }


}

// Export
export default FileSystemController;