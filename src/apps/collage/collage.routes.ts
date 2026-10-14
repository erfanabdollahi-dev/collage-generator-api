import express from "express";
import upload from "../middlewares/upload.middleware.js";
import { validateMiddleware } from "../middlewares/validate.middleware.js";
import { createCollageJobSchema } from "./collage.validation.js";
import collageController from "./collage.controller.js";
const router = express.Router();

router.post(
  "/jobs",
  upload.array("images"),
  validateMiddleware(createCollageJobSchema),
  collageController.createJob,
);

export default router;
