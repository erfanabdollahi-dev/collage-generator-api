import type z from "zod";
import type { createCollageJobSchema } from "./collage.validation.js";

export type CreateCollageJobInput = z.infer<typeof createCollageJobSchema>
