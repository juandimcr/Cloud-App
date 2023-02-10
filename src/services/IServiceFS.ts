// Imports

// Interface
interface IServiceFS {
    getAllFiles(): string;
    insertFile(): boolean;
    updateFile(): boolean;
    getFiles(): string;
    getDirectories(): string;
}

// Export
export default IServiceFS;