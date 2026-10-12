import express from "express";
import { validateMiddleware } from "../middlewares/validate.middleware.js";
import { createJob } from "./collage.controller.js";
import { createCollageJobSchema } from "./collage.validation.js";

const router = express.Router();

router.post("/jobs", validateMiddleware(createCollageJobSchema), createJob);

export default router;
