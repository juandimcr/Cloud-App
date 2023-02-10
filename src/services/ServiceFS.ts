// Imports
import IRepositoryFS from "../repositories/IRepositoryFS";
import RepositoryFS from "../repositories/RepositoryFS";
import ConvertPath from "../util/ConvertPath";
import IConvertPath from "../util/IConvertPath";
import IServiceFS from "./IServiceFS";


// Class
class ServiceFS implements IServiceFS {
    private repositoryFS: IRepositoryFS;
    private convertPath: IConvertPath;
    private static instance: ServiceFS;

     constructor() {
        this.repositoryFS = RepositoryFS.getInstance();
        this.convertPath = new ConvertPath();
    }

    // Singleton pattern
    static getInstance(): ServiceFS {
        if (!this.instance) {
            this.instance = new ServiceFS();
        }
        
        return this.instance;
    }

    getAllFiles(path: string): string {
        console.log(this.convertPath.convertPath(path))
        this.repositoryFS.getAllFiles(path)
        
        return "dwwd";
    }

    insertFile(path: string): boolean {
        return true;
    }

    updateFile(path: string): boolean {
        return true;
    }

    getFiles(path: string): string {
        // Meter cmo parametro lo que devuelva getAllFiles y aqui devolver un json con los ficheros
        return "wwdwd";
    }

    getDirectories(path: string): string {
        // Meter cmo parametro lo que devuelva getAllFiles y aqui devolver un json con los directorios
        return "";
    }
}

// Exports
export default ServiceFS;
