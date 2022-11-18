const express = require("express");
const router = express();

const { getNewId, writeJSONfile } = require("../helper/helper");

const path = require("node:path");

const videosJSONPath = path.join(__dirname, "../data/videos.json");
const videos = require(videosJSONPath);

//posting comments
router.post("/:id/comments", (req, res) => {
  const { name, comment } = req.body;
  if (!name || !comment) {
    return req.status(200).json({ error: "error" });
  }

  const newComment = {
    id: getNewId(),
    name,
    comment,
    likes: 0,
    timestamp: Date.now(),
  };
  console.log(newComment);

  index = videos.findIndex((video) => req.params.id === video.id);
  console.log("index", index);

  videos[index].comments.push(newComment);
  writeJSONfile(videosJSONPath, videos);

  try {
    res.status(200).json(newComment);
  } catch (error) {
    console.error(error);
  }
});

//deleting comments
router.delete("/:videoId/comments/:commentId", (req, res) => {
  videoIndex = videos.findIndex((video) => req.params.videoId === video.id);
  commentIndex = videos[videoIndex].comments.findIndex(
    (comment) => req.params.commentId === comment.id
  );

  const deletedComment = videos[videoIndex].comments[commentIndex];

  videos[videoIndex].comments.splice(commentIndex, 1);
  writeJSONfile(videosJSONPath, videos);

  try {
    res.status(200).json({
      message: "successfully deleted",
      deletedComment: deletedComment,
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
