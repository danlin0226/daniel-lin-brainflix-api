const path = require("node:path");

require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const app = express();
const cors = require("cors");

const videoRouter = require("./routes/videos");
const commentsRouter = require("./routes/comments");

app.use(cors());

app.use(express.json());

app.use("/videos", videoRouter);
app.use("/videos", commentsRouter);

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} `);
});
