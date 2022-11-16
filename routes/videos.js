const express = require("express");
const router = express.Router();

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
      ? res.status(200).json(found)
      : res.status(404).json({ video: "error" });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
