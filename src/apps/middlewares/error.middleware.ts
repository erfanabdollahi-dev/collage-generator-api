import type {
  ErrorRequestHandler
} from "express";
import { ZodError } from "zod";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  // Invalid JSON body
  if (err instanceof SyntaxError) {
    return res.status(400).json({
      message: "Invalid JSON format",
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  return res.status(500).json({
    message: "Internal Server Error",
  });
};
