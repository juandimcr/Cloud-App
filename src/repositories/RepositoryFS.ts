// Imports
import IRepositoryFS from "./IRepositoryFS";

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

    getAllFiles(path: string): string {
        return "";
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