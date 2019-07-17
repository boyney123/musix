"use strict";

require("dotenv").config();
const mongoose = require("mongoose");
const { logger } = require("../logger");

//get models
require("../../models/song");

function connect() {
  mongoose.connection.on("error", logger.error).on("disconnected", () => {
    logger.warn("Disconnected from mongo");
    // only try to reconnect if not in test
    if (process.env.NODE_ENV !== "test") {
      connect();
    }
  });
  return mongoose.connect(process.env.MONGODB_URL, { keepAlive: 1, useNewUrlParser: true });
}

module.exports = connect;
