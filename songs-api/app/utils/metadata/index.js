"use strict";

const mm = require("music-metadata");
const path = require("path");

const getMetadataForFile = async (songDirectory, filename) => {
  const { format } = await mm.parseFile(path.join(songDirectory, filename));

  return {
    title: filename,
    ...format
  };
};

module.exports = {
  getMetadataForFile
};
