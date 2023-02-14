// Imports
import { Request, Response, NextFunction } from "express";
import IValidator from "./IValidator";

// Class Validator
class Validator implements IValidator {
    private static instance: IValidator;

    private constructor() {}

    // Singleton pattern
    static getInstance(): IValidator {
        if (!this.instance) {
            this.instance = new Validator();
        }
        return this.instance;
    }

    checkEmptyPath(req: Request, res: Response, next: NextFunction): void {
        if (!req.params.path) {
            res.status(404).json('Path not found or path can not be the root directory');
            return;
        }

        // If there are not more errors, call the next middleware function in the stack
        next();
    }

    checkNameBodyParameter(req: Request, res: Response, next: NextFunction): void {
        if (!req.body.name) {
            res.status(400).json('Not found [name] parameter in the request body');
            return;
        }

        const name = String(req.body.name);
        if (name.includes('-')) {
            res.status(400).json('The name can not have [-] character');
            return;
        }

        // If there are not more errors, call the next middleware function in the stack
        next();
    }

}

// Exports
export default Validator;
