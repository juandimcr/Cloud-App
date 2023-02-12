// Import
import IConvertPath from "./IConvertPath";
import path from 'path';
import { config } from "dotenv";

// Config
config();

// Class
class ConvertPath implements IConvertPath {
    constructor() {}

    convertPath(pathUser: string): string {
        let pathProcessed = path.join(process.env.PATH_API || 'E:\CloudAPI', pathUser.replaceAll('-', '/'));
        return pathProcessed;
    }

    updatePath(oldPath: string, newName: string): string {
        const splitPath = oldPath.split('\\');
        splitPath[splitPath.length - 1] = newName;
        const newPath = splitPath.join('\\');
        return newPath;
    }
}

// Export
export default ConvertPath;
