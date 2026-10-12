import app from "./app.js";

const bootstrap = () => {
  app.listen(3000, () => {
    console.log(`Server is listening on http://127.0.0.1:3000`);
  });
};

bootstrap()