"use strict";

require("dotenv").config();

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const randomWords = require("random-words");

const connect = require("../../app/config/database");
const Song = mongoose.model("Song");
const { getMetadataForFile } = require("../../app/utils/metadata");

const songsDirectory = path.join(__dirname, "../../public/songs");

connect();

const fakeCovers = [
  "https://fakealbumcovers.com/images/FakeAlbums/lomondprincessGlasgow.jpg",
  "https://fakealbumcovers.com/images/FakeAlbums/Pulse_Fokou.png",
  "https://fakealbumcovers.com/images/FakeAlbums/cotten_Carnivore.jpeg",
  "https://fakealbumcovers.com/images/FakeAlbums/FozzieBear_BadBlood.png",
  "https://fakealbumcovers.com/images/FakeAlbums/Yawning_NoMaps.jpg",
  "https://fakealbumcovers.com/images/FakeAlbums/demondayz_gorillaz.jpg",
  "https://fakealbumcovers.com/images/FakeAlbums/yungvinci_selfportrait.jpg"
];

const populateDataWithAdditionalRandomData = data => {
  return data.map(song => ({
    ...song,
    artist: randomWords({ exactly: 2, join: " " }),
    coverUrl: fakeCovers[Math.floor(Math.random() * fakeCovers.length)]
  }));
};

const main = async () => {
  const files = fs.readdirSync(songsDirectory).map(async file => {
    return getMetadataForFile(songsDirectory, file);
  });

  const data = await Promise.all(files);

  const populatedDataSet1 = populateDataWithAdditionalRandomData(data);
  const populatedDataSet2 = populateDataWithAdditionalRandomData(data);
  const populatedDataSet3 = populateDataWithAdditionalRandomData(data);
  const populatedDataSet4 = populateDataWithAdditionalRandomData(data);

  const populatedData = [...populatedDataSet1, ...populatedDataSet2, ...populatedDataSet3, ...populatedDataSet4];

  try {
    await Song.collection.insertMany(populatedData);
  } catch (error) {
    console.log("Failed to populate the database");
    console.log(error);
    process.exit(1);
  }

  console.log("Successfully populated database");
  process.exit(0);
};

main();
