// Imports
import { Request, Response } from "express";
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
            console.error(`The path '${req.params.path}' does not exit`);
            return res.status(404).json('Directory or file not found');
        }
    }

    async updateDirOrFileName(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            let path = '';
            if (req.params.path) {
                path = req.params.path;
            } else {
                return res.status(404).json('Path not found')
            }
            console.log(path);
            console.log(req.body);
            if (!req.body.name) {
                return res.status(400).json('Not found "name" parameter in the request body');
            }

            await this.service.updateDirOrFileName(path, req.body.name);
            console.log(`The file or directory [${path}] has been updated to name [${req.body.name}]`);
            return res.status(200).json(`The file or directory [${path}] has been updated to name [${req.body.name}]`);
        } catch (error) {
            console.error(error);
            return res.status(404).json('Directory or file not found, or file extension not provided');
        }
    }

    async deleteFileOrDir(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            let path = '';
            if (req.params.path) {
                path = req.params.path;
            } else {
                return res.status(404).json('The path can not be the root directory, otherwise the entire directory will be removed')
            }
            
            await this.service.deleteFileOrDir(path);
            return res.status(200).json(`The file or directory [${path}] has been removed`);
        } catch (error) {
            console.error(error);
            return res.status(404).json('Directory or file not found');
        }
    }

    async insertDir(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            let path = '';
            if (req.params.path) {
                path = req.params.path;
            } else {
                return res.status(404).json('Path not found')
            }
            
            await this.service.insertDir(path);
            return res.status(200).json(`The directory [${path}] has been added`);
        } catch (error) {
            console.error(error);
            return res.status(404).json('Directory already exists');
        }
    }

    async insertFilesFromClient(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            let path = '';
            if (req.params.path) {
                path = req.params.path;
            } 

            if (!req.files) {
                return res.status(404).json('Files not provided');
            }
            
            await this.service.insertFiles(req.files.files, path);
            return res.status(200).json(`The files has been added`);
        } catch (error) {
            console.error(error);
            return res.status(404).json('Directory not found');
        }
    }

    async downloadFiles(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            let path = '';
            if (req.params.path) {
                path = req.params.path;
            } else {
                res.status(404).json('Path not found');
            }
            
            const content = await this.service.downloadFile(path);
            const mimeType = mime.getType(content.pathProc) || "";
            
            res.setHeader('Content-Disposition', `attachment; filename=${content.pathProc}`)
            res.setHeader('Content-Type', mimeType);
            return res.status(200).send(content.file);
        } catch (error) {
            console.error(error);
            return res.status(404).json('File not found');
        }
    }

}

// Export
export default FileSystemController;