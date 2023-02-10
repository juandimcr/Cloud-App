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
        let pathProcessed = path.join(process.env.PATH_API || 'E:\CloudAPI', pathUser);
        return pathProcessed;
    }
}

// Export
export default ConvertPath;
