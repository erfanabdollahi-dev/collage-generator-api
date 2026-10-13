import "dotenv/config";

const getEnv = (var_name: string, default_value?: string) => {
  const value = process.env[var_name];

  if (!value) {
    if (default_value) {
      console.log(
        `${var_name} was not found. using default value : ${default_value}`,
      );
      return default_value;
    }
    throw new Error(`${var_name} does not exist!`);
  }

  return value;
};

const env = {
  PORT: Number(getEnv("PORT", "3000")),
  MONGO_URI: getEnv("MONGO_URI", "mongodb://127.0.0.1:27017"),
  MAX_UPLOAD_FILES: Number(getEnv("MAX_UPLOAD_FILES", "10")),
  MAX_UPLOAD_FILE_SIZE_MB: Number(getEnv("MAX_UPLOAD_FILE_SIZE_MB", "5")),
  ALLOWED_IMAGE_MIME_TYPES: getEnv(
    "ALLOWED_IMAGE_MIME_TYPES",
    "image/jpeg,image/png",
  )
    .split(",")
    .map((type) => type.trim()),
  OBS_ENDPOINT: getEnv("OBS_ENDPOINT"),
  OBS_ACCESS_KEY: getEnv("OBS_ACCESS_KEY"),
  OBS_SECRET_KEY: getEnv("OBS_SECRET_KEY"),
  OBS_BUCKET_NAME: getEnv("OBS_BUCKET_NAME"),
  OBS_REGION: getEnv("OBS_REGION"),
};

export default env;
