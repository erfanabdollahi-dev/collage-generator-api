import type { Request, Response } from "express";
import collageService from "./collage.service.js";
import type { ImageToUpload } from "./collage.types.js";
import { validateImage } from "./collage.validation.js";

export const createJob = async (req: Request, res: Response) => {
  const files = req.files;

  if (!files || !Array.isArray(files) || files.length === 0) {
    res.status(400).json({ message: "At least one image is required" });
    return;
  }
  let images: ImageToUpload[];
  try {
    images = await Promise.all(
      files.map(async (file) => {
        const metadata = await validateImage(file.buffer);
        return {
          buffer: file.buffer,
          format: metadata.format,
        };
      }),
    );
  } catch (err) {
    res.status(400).json({ message: "Image validation faild" });
    return;
  }

  const data = await collageService.createJob(req.body, images);
  res.json({ message: "Job created", data: data });
};
