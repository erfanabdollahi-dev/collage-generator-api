import z from "zod"
export const createCollageJobSchema = z.strictObject({
  borderSize: z
    .number()
    .int()
    .min(0)
    .max(100),
  borderColor: z
    .string()
    .trim()
    .min(1, "borderColor is required"),
  direction : z.enum(["horizontal", "vertical"])
})