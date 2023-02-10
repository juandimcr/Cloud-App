// Imports
import IRepositoryFS from "../repositories/IRepositoryFS";
import RepositoryFS from "../repositories/RepositoryFS";
import IServiceFS from "./IServiceFS";


// Class
class ServiceFS implements IServiceFS {
    private repositoryFS: IRepositoryFS;
    private static instance: IServiceFS;

    private constructor() {
        this.repositoryFS = RepositoryFS.getInstance();
    }

    // Singleton pattern
    static getInstance(): IServiceFS {
        if (!this.instance) {
            this.instance = new ServiceFS();
        }
        return this.instance;
    }

    getAllFiles(): string {
        this.repositoryFS.getAllFiles();
        return "";
    }

    insertFile(): boolean {
        return true;
    }

    updateFile(): boolean {
        return true;
    }

    getFiles(): string {
        return "";
    }

    getDirectories(): string {
        return "";
    }
}

// Exports
export default ServiceFS;
