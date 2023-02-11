// Imports
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

    insertFile(path: string): boolean {
        return true;
    }

    updateDirOrFileName(path: string, newName: string): boolean {

        return true;
    }

    async getContentOfDir(dir: Dir): Promise<{ directories: string[], files: string[] }> {
        try {
            const content: { directories: string[], files: string[] } = {directories: [], files: []};
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
}

// Exports
export default ServiceFS;
