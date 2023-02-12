// Imports
import fileUpload from "express-fileupload";
import { Dir } from "fs";

// Interface
interface IRepositoryFS {
    getAllFiles(path: string): Promise<Dir>;
    insertDir(path: string): Promise<boolean>;
    insertFile(files: fileUpload.UploadedFile, path: string): Promise<boolean>; // Files from the client
    insertFiles(files: fileUpload.UploadedFile[], path: string): Promise<boolean>; // Files from the client
    updateFile(path: string, newName: string): Promise<boolean>;
    deleteFile(path: string): Promise<boolean>;
    downloadFile(path: string): Promise<Buffer>;
}

// Exports
export default IRepositoryFS;