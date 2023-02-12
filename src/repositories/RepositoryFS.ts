// Imports
import IRepositoryFS from "./IRepositoryFS";
import fs from 'fs/promises';
import pathModule from "path";
import { Dir } from "fs";
import fileUpload from "express-fileupload";

// Class
class RepositoryFS implements IRepositoryFS {
    private static instance: IRepositoryFS;

    private constructor() { }

    // Singleton pattern
    static getInstance(): IRepositoryFS {
        if (!this.instance) {
            this.instance = new RepositoryFS();
        }
        return this.instance;
    }

    async getAllFiles(path: string): Promise<Dir> {
        try {
            console.log(`The path is: ${path}`);
            const dir = await fs.opendir(path);
            return dir;
        } catch (err) {
            throw err;
        }
    }

    async insertDir(path: string): Promise<boolean> {
        try {
            await fs.mkdir(path);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async insertFile(files: fileUpload.UploadedFile, path: string): Promise<boolean> {
        try {
            const pathFile = pathModule.join(path, files.name);
            await files.mv(pathFile);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async insertFiles(files: fileUpload.UploadedFile[], path: string): Promise<boolean> {
        try {
            for (const file of files) {
                const pathFile = pathModule.join(path, file.name);
                await file.mv(pathFile);
            }
            return true;
        } catch (error) {
            throw error;
        }
    }

    async updateFile(path: string, newName: string): Promise<boolean> {
        try {
            await fs.rename(path, newName);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async deleteFile(path: string): Promise<boolean> {
        try {
            await fs.rm(path, {
                recursive: true,
                force: true,
            });
            return true;
        } catch (error) {
            throw error;
        }
    }
}

// Export
export default RepositoryFS;