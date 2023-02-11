// Imports

import { Dir } from "fs";

// Interface
interface IServiceFS {
    getAllFiles(path: string): Promise<{ directories: string[], files: string[] }>;
    insertFile(path: string): boolean;
    updateFile(path: string): boolean;
    getContentOfDir(dir: Dir): Promise<{ directories: string[], files: string[] }>;
}

// Export
export default IServiceFS;