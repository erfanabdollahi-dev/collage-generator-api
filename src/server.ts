import app from "./app.js";
import env from "./config/env.js";


const bootstrap = () => {
  const PORT = env.PORT
  app.listen(PORT, () => {
    console.log(`Server is listening on http://127.0.0.1:${PORT}`);
  });
};

bootstrap()