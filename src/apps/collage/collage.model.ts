import { model, Schema } from "mongoose";

export const collageJobSchema = new Schema(
  {
    borderSize: {
      type: Number,
      required: true,
    },
    borderColor: {
      type: String,
      required: true,
    },
    direction: {
      type: String,
      enum: ["horizontal", "vertical"],
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "PROCESSING", "COMPLETED", "FAILED", "CANCELLED"],
      required: true,
      default: "PENDING",
    },
    images: {
      type: [String],
      required: true,
    },
    resultKey: {
      type: String,
      default: null,
    },
    error: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

const CollageJobModel = model("CollageJob", collageJobSchema);
export default CollageJobModel;
