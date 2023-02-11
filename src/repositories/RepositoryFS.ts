// Imports
import IRepositoryFS from "./IRepositoryFS";
import fs from 'fs/promises';
import { Dir } from "fs";

// Class
class RepositoryFS implements IRepositoryFS {
    private static instance: IRepositoryFS;

    private constructor() {}

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

    insertFile(path: string): boolean {
        return true;
    }

    updateFile(path: string): boolean {
        return true;
    }
}

// Export
export default RepositoryFS;