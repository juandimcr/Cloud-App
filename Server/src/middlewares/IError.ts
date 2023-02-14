// Imports
import { NextFunction, Request, Response } from "express";
import Eexist from "../errors/Eexist";
import Enoent from "../errors/Enoent";

// Interface
interface IError {
    errorDirOrFileNotExists(err: Enoent, req: Request, res: Response, next: NextFunction): void;
    errorDirOrFileExists(err: Eexist, req: Request, res: Response, next: NextFunction): void;
}

// Exports
export default IError;