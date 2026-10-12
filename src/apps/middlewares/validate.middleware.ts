import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

export const validateMiddleware = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
};
