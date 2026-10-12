import type { Request, Response } from "express";
import collageService from "./collage.service.js";
import { createCollageJobSchema } from "./collage.validation.js";

export const createJob = async (req: Request, res: Response) => {

  const data = await collageService.createJob(req.body);
  res.json({ message: "Job created", data: data });
};
