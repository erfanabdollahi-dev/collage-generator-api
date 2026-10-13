import app from "./app.js";
import env from "./config/env.js";
import connectDatabase from "./database/connection.js";

const bootstrap = async () => {
  try {
    await connectDatabase();
    console.log("Database connected successfully");

    const { PORT } = env;
    app.listen(PORT, () => {
      console.log(`Server is listening on http://127.0.0.1:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:");
    console.log("Exiting now...");
    process.exit(1);
    
  }
};

bootstrap();
