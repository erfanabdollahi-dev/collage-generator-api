import type { z } from "zod";
import type { createCollageJobSchema } from "./collage.validation.js";

// The complete job representation used by our application.
export type CollageJob = {
  id: string;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED" | "CANCELLED";
  borderSize: number;
  borderColor: string;
  direction: "horizontal" | "vertical";
  images: string[];
  resultKey: string | null;
  error: string | null;
  createdAt: Date;
  updatedAt: Date;
};

// The validated settings received from the client.
export type CreateCollageJobInput = z.infer<typeof createCollageJobSchema>;

// The complete data our service prepares for database creation.
export type CreateCollageJobRecord = {
  status: CollageJob["status"];
  borderSize: number;
  borderColor: string;
  direction: CollageJob["direction"];
  images: string[];
  resultKey: string | null;
  error: string | null;
};

export type ImageToUpload = {
  buffer: Buffer;
  format: string;
};

export type CreateCollageJobData = {
  settings: CreateCollageJobInput;
  images: ImageToUpload[];
};
