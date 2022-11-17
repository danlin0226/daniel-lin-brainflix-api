const express = require("express");
const router = express.Router();

const { getNewId, getTimeStamp, writeJSONfile } = require("../helper/helper");

//json file
const path = require("node:path");

const videosJSONPath = path.join(__dirname, "../data/videos.json");
// console.log(videosJSONPath);
const videos = require(videosJSONPath);

router.get("/", (req, res) => {
  try {
    res.status(200).json(videos);
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id", (req, res) => {
  try {
    const found = videos.filter((video) => video.id === req.params.id);
    found
      ? res.status(200).json(found[0])
      : res.status(404).json({ video: "error" });
  } catch (error) {
    console.error(error);
  }
});

router.post("/", (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({
      error: "Please provide title and description for video",
    });
  }

  const newVideo = {
    id: getNewId(),
    title,
    channel: "Placeholder Channel",
    image: "https://i.imgur.com/l2Xfgpl.jpg",
    description,
    views: "0",
    likes: "0",
    duration: "8:88",
    video: "https://project-2-api.herokuapp.com/stream",
    timestamp: getTimeStamp(), //put a new timestamp
    comments: [],
  };

  videos.push(newVideo);
  writeJSONfile(videosJSONPath, videos);

  try {
    res.status(200).json(newVideo);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
