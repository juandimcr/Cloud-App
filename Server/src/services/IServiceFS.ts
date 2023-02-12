// Imports
import fileUpload from "express-fileupload";
import { Dir } from "fs";

// Interface
interface IServiceFS {
    getAllFiles(path: string): Promise<{ directories: string[], files: string[] }>;
    insertDir(path: string): Promise<boolean>;
    insertFiles(files: fileUpload.UploadedFile | fileUpload.UploadedFile[], path: string): Promise<boolean>; // Files from the client
    updateDirOrFileName(path: string, newName: string): Promise<boolean>;
    deleteFileOrDir(path: string): Promise<boolean>;
    getContentOfDir(dir: Dir): Promise<{ directories: string[], files: string[] }>;
    downloadFile(path: string): Promise<{ pathProc: string; file: Buffer; }>;
}

// Export
export default IServiceFS;