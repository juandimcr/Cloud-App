// Imports

// Interface
interface IRepositoryFS {
    getAllFiles(path: string): string;
    insertFile(path: string): boolean;
    updateFile(path: string): boolean;
}

// Exports
export default IRepositoryFS;