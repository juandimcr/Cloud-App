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

    getAllFiles(): string {
        return "";
    }

    insertFile(): boolean {
        return true;
    }

    updateFile(): boolean {
        return true;
    }
}

// Export
export default RepositoryFS;