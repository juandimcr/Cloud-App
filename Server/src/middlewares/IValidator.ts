// Imports

import { NextFunction, Request, Response } from "express";


// Interface
interface IValidator {
    checkEmptyPath(req: Request, res: Response, next: NextFunction): void;
    checkNameBodyParameter(req: Request, res: Response, next: NextFunction): void;
}

// Exports
export default IValidator;