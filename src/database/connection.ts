import mongoose from "mongoose";
import env from "../config/env.js";

const connectDatabase = async () => {
  await mongoose.connect(env.MONGO_URI);
};

export default connectDatabase;
