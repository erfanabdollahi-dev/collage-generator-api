import express from "express";
import upload from "../middlewares/upload.middleware.js";
import { validateMiddleware } from "../middlewares/validate.middleware.js";
import { createJob } from "./collage.controller.js";
import { createCollageJobSchema } from "./collage.validation.js";
const router = express.Router();

router.post(
  "/jobs",
  upload.array("images"),
  validateMiddleware(createCollageJobSchema),
  createJob,
);

export default router;
