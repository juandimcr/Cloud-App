// Imports
import { Request, Response, NextFunction } from "express";
import Eexist from "../errors/Eexist";
import Enoent from "../errors/Enoent";
import IError from "./IError";

// Class 
class ErrorMiddleware implements IError {
    private static instance: IError;

    constructor() {}

    // Singleton pattern
    static getInstance(): IError {
        if (!this.instance) {
            this.instance = new ErrorMiddleware();
        }
        return this.instance;
    }

    errorDirOrFileExists(err: Eexist, req: Request, res: Response, next: NextFunction): void {
        if (err.code === 'EEXIST') {
            res.status(409).json('Directory or file already exists');
            return;
        }
        next(err);
    }

    errorDirOrFileNotExists(err: Enoent, req: Request, res: Response, next: NextFunction): void {
        if (err.code === 'ENOENT') {
            res.status(404).json('Directory or file does not exists');
            return;
        }
        next(err);
    }

}

// Exports
export default ErrorMiddleware;