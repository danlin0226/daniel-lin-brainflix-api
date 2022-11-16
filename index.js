const path = require("node:path");

const express = require("express");
const app = express();

const videoRouter = require("./routes/videos");
console.log(videoRouter);

// app.use(express.json()); // next()

app.use("/videos", videoRouter);

app.use(express.static(path.join(__dirname, "public")));

app.listen(8080, () => {
  console.log("Server is running");
});
