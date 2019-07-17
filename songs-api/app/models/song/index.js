"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  title: { type: String },
  artist: { type: String },
  coverUrl: { type: String },
  duration: { type: String }
});

SongSchema.statics = {
  getPaginatedResults: function(page, limit) {
    const skip = (page - 1) * limit;
    return this.find({}, "title duration artist coverUrl", { skip, limit });
  }
};

mongoose.model("Song", SongSchema);
