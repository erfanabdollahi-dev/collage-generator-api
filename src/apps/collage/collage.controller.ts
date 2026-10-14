import type { Request, Response } from "express";
import collageService from "./collage.service.js";
import type { ImageToUpload } from "./collage.types.js";
import { validateImage } from "./collage.validation.js";
import { isValidObjectId } from "mongoose";

class CollageController {
  async createJob(req: Request, res: Response): Promise<void> {
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
  }

  async getJobById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Job ID is required" });
      return;
    }
    if (typeof id !== "string" || !isValidObjectId(id)) {
      res.status(400).json({ message: "Invalid job ID" });
      return;
    }

    const job = await collageService.findCollageJobById(id);
    if (!job) {
      res.status(404).json({ message: "Job not found" });
      return;
    }
    res.status(200).json({
      message: "Job retrieved",
      data: job,
    });
  }
}

export default new CollageController();
