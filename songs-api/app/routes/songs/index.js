"use strict";

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Song = mongoose.model("Song");
const { logger } = require("../../config/logger");

router.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);

  if (isNaN(limit) || isNaN(page)) {
    logger.info("/songs bad request", { route: "/songs", httpMethod: "GET", statusCode: 400, query: req.query });
    return res.sendStatus(400);
  }

  try {
    const data = await Song.getPaginatedResults(page, limit);
    res.send(data);
  } catch (error) {
    logger.warn("/songs failed", { route: "/songs", httpMethod: "GET", statusCode: 500, error: error.message });
    res.sendStatus(500);
  }
});

module.exports = router;
