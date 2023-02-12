// Imports
import fileUpload from "express-fileupload";
import { Dir } from "fs";
import IRepositoryFS from "../repositories/IRepositoryFS";
import RepositoryFS from "../repositories/RepositoryFS";
import ConvertPath from "../util/ConvertPath";
import IConvertPath from "../util/IConvertPath";
import IServiceFS from "./IServiceFS";


// Class
class ServiceFS implements IServiceFS {
    private repositoryFS: IRepositoryFS;
    private convertPath: IConvertPath;
    private static instance: ServiceFS;

    constructor() {
        this.repositoryFS = RepositoryFS.getInstance();
        this.convertPath = new ConvertPath();
    }

    // Singleton pattern
    static getInstance(): ServiceFS {
        if (!this.instance) {
            this.instance = new ServiceFS();
        }

        return this.instance;
    }

    async getAllFiles(path: string): Promise<{ directories: string[], files: string[] }> {
        try {
            const pathProcessed = this.convertPath.convertPath(path);
            const dir = await this.repositoryFS.getAllFiles(pathProcessed);

            // Return content of directory
            const content = await this.getContentOfDir(dir);
            return content;
        } catch (error) {
            throw error;
        }
    }

    async insertDir(path: string): Promise<boolean> {
        try {
            const pathProcessed = this.convertPath.convertPath(path);
            return await this.repositoryFS.insertDir(pathProcessed);
            
        } catch (error) {
            throw error;
        }
    }

    async insertFiles(files: fileUpload.UploadedFile | fileUpload.UploadedFile[], path: string ): Promise<boolean> {
        try {
            const pathProcessed = this.convertPath.convertPath(path);
            console.log(pathProcessed);
            if (Array.isArray(files)) {
                return await this.repositoryFS.insertFiles(files, pathProcessed);
            } else {
                return await this.repositoryFS.insertFile(files, pathProcessed);
            }
    
        } catch (error) {
            throw error;
        }
    }

    async updateDirOrFileName(path: string, newName: string): Promise<boolean> {
        try {
            const oldPath = this.convertPath.convertPath(path);
            const newPath = this.convertPath.updatePath(oldPath, newName);
            return await this.repositoryFS.updateFile(oldPath, newPath);
        } catch (error) {
            throw error;
        }
    }

    async deleteFileOrDir(path: string): Promise<boolean> {
        try {
            const pathProcessed = this.convertPath.convertPath(path);
            return await this.repositoryFS.deleteFile(pathProcessed);
        } catch (error) {
            throw error;
        }
    }

    async getContentOfDir(dir: Dir): Promise<{ directories: string[], files: string[] }> {
        try {
            const content: { directories: string[], files: string[] } = { directories: [], files: [] };
            for await (const dirent of dir) {
                if (dirent.isFile()) {
                    content.files.push(dirent.name);
                } else if (dirent.isDirectory()) {
                    content.directories.push(dirent.name);
                }
            }
            return content;

        } catch (error) {
            console.log("dir closed");
            throw error;
        }
    }

    async downloadFile(path: string): Promise<{ pathProc: string; file: Buffer; }> {
        try {
            const pathProcessed = this.convertPath.convertPath(path);
            const file = await this.repositoryFS.downloadFile(pathProcessed);
            const content = { pathProc: pathProcessed, file: file };
            return content;
        } catch (error) {
            throw error;
        }
    }
}

// Exports
export default ServiceFS;
