/**
 * - Insert test data
 * - Drop the collection
 * - Disconnect
 */

const mongoose = require("mongoose");
const Song = mongoose.model("Song");
const testData = require("./test-data.json");

const populate = () => {
  return Song.collection.insertMany(testData);
};

const drop = () => {
  return Song.collection.drop();
};

const disconnect = () => {
  mongoose.connection.close();
};

module.exports = {
  disconnect,
  drop,
  populate
};
