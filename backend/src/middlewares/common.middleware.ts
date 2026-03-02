import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { StatusCodes } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";

export class CommonMiddleware {
    public isIdValid(key: string) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const id = req.params[key];

                if (!isObjectIdOrHexString(id)) {
                    throw new ApiError(`${key}: ${id} is invalid id`, 400);
                }

                next();
            } catch (error) {
                next(error);
            }
        };
    }

    public validateBody(validator: ObjectSchema) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                req.body = await validator.validateAsync(req.body || {});
                next();
            } catch (error) {
                next(new ApiError(error.details[0].message, 400));
            }
        };
    }

    public isFileExists() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                if (!req.file) {
                    throw new ApiError(
                        "No file uploaded",
                        StatusCodes.BAD_REQUEST,
                    );
                }
                next();
            } catch (e) {
                next(e);
            }
        };
    }

    public query(validator: ObjectSchema) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                (req as any).validatedQuery = await validator.validateAsync(
                    req.query,
                );
                next();
            } catch (e) {
                next(new ApiError(e.message, StatusCodes.BAD_REQUEST));
            }
        };
    }
}

export const commonMiddleware = new CommonMiddleware();
