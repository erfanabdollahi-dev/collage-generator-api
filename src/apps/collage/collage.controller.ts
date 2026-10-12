import type { Request, Response } from "express";
import collageService from "./collage.service.js";

export const createJob = async (req: Request, res: Response) => {
  const data = await collageService.createJob({
    borderSize: 5,
    borderColor: "#ffffff",
    direction: "horizontal",
  });
  res.json({ message: "Job created" , data : data });
};
