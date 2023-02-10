// Imports

// Interface
interface IServiceFS {
    getAllFiles(path: string): string;
    insertFile(path: string): boolean;
    updateFile(path: string): boolean;
    getFiles(path: string): string;
    getDirectories(path: string): string;
}

// Export
export default IServiceFS;