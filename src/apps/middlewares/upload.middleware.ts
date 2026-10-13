import multer from "multer";
import env from "../../config/env.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: env.MAX_UPLOAD_FILES,
    fileSize: env.MAX_UPLOAD_FILE_SIZE_MB * 1024 * 1024,
  },
  fileFilter: (_req, file, callback) => {
    if (!env.ALLOWED_IMAGE_MIME_TYPES.includes(file.mimetype)) {
      callback(new Error("Only JPEG and PNG images are allowed"));
      return;
    }

    callback(null, true);
  },
});

export default upload;
