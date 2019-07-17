const { createLogger, format, transports } = require("winston");
const path = require("path");

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    format.json()
  ),
  defaultMeta: { service: "songs-api" },
  transports: [
    new transports.File({ timestamp: true, filename: path.join(__dirname, "../../../logs/info.log"), level: "info" }),
    new transports.File({ timestamp: true, filename: path.join(__dirname, "../../../logs/warn.log"), level: "warn" }),
    new transports.File({ timestamp: true, filename: path.join(__dirname, "../../../logs/error.log"), level: "error" })
  ]
});

const middleware = (req, res, next) => {
  logger.info(req.originalUrl);
  next();
};

module.exports = {
  logger,
  middleware
};
