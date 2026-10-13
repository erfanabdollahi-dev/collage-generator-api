import "dotenv/config";

const getEnv = (var_name: string, default_value?: string) => {
  const value = process.env[var_name];

  if (!value) {
    if (default_value) {
      console.log(`${var_name} was not found. using default value : ${default_value}`)
      return default_value;
    }
    throw new Error(`${var_name} does not exist!`);
  }

  return value;
};

const env = {
  PORT: Number(getEnv("PORT", "3000")),
  MONGO_URI: getEnv("MONGO_URI", "mongodb://127.0.0.1:27017"),
};

export default env;
