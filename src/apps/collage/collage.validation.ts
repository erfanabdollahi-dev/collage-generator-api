import sharp from "sharp";
import z from "zod";
import env from "../../config/env.js";
export const createCollageJobSchema = z.strictObject({
  borderSize: z.coerce.number().int().min(0).max(100),
  borderColor: z.string().trim().min(1, "borderColor is required"),
  direction: z.enum(["horizontal", "vertical"]),
});

const ALLOWED_FORMATS = env.ALLOWED_IMAGE_MIME_TYPES.map(
  (type) => type.split("/")[1],
);
export const validateImage = async (buffer: Buffer) => {
  const metadata = await sharp(buffer).metadata();

  if (
    !metadata ||
    !ALLOWED_FORMATS.includes(
      metadata.format as (typeof ALLOWED_FORMATS)[number],
    )
  ) {
    throw new Error("Only JPEG and PNG images are allowed");
  }
  if (!metadata.width || !metadata.height) {
    throw new Error("Image dimensions could not be determined");
  }
  return {
    format: metadata.format,
    width: metadata.width,
    height: metadata.height,
  };
};
