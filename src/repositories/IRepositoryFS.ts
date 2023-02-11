// Imports

import { Dir } from "fs";

// Interface
interface IRepositoryFS {
    getAllFiles(path: string): Promise<Dir>;
    insertFile(path: string): boolean;
    updateFile(path: string): boolean;
}

// Exports
export default IRepositoryFS;