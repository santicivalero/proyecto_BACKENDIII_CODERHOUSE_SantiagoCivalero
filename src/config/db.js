import mongoose from "mongoose";
import logger from "../utils/logger.js";

export const connectMongo = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://civalerosantiago:12456@cluster0.9t8jj.mongodb.net/"
    );
    logger.info("Conectado a MongoDB Atlas");
  } catch (error) {
    logger.error(`Error al conectar con MongoDB: ${error.message}`);
    process.exit(1);
  }
};
