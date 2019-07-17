"use strict";

require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { middleware: logger } = require("../app/config/logger");
const connect = require("./config/database");
const songsRouter = require("./routes/songs");

const app = express();

app.use(cors());
app.use(logger);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/songs", songsRouter);
app.use("/download", express.static("public/songs"));

connect();

module.exports = app;
