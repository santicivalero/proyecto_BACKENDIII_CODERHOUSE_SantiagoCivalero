import logger from "../utils/logger.js";

export default (err, req, res, next) => {
  logger.error(`${req.method} ${req.url} - ${err.message}`);

  res.status(500).json({
    status: "error",
    message: err.message || "Error interno del servidor",
  });
};
