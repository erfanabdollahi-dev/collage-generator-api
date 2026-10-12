import type { Request, Response } from "express";
import collageService from "./collage.service.js";
import { createCollageJobSchema } from "./collage.validation.js";

export const createJob = async (req: Request, res: Response) => {
  const result = createCollageJobSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: "Invalid collage configuration",
      errors: result.error.issues,
    });
  }
  const data = await collageService.createJob(result.data);
  res.json({ message: "Job created", data: data });
};
