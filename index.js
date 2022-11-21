const path = require("node:path");

require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload"); /////

const videoRouter = require("./routes/videos");
const commentsRouter = require("./routes/comments");

app.use(cors());

app.use(express.json());

app.use(fileUpload()); ///

app.use("/videos", videoRouter);
app.use("/videos", commentsRouter);

app.use(express.static(path.join(__dirname, "public")));

app.post("/upload", function (req, res) {
  let sampleFile;
  let uploadPath;
  console.log("hi");

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  console.log("hi");
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile;
  console.log(req.files.sampleFile);
  uploadPath = __dirname + "/public/images/" + sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    // res.send("File uploaded!");
    console.log(uploadPath);
    console.log("file uploaded");
  });
});

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} `);
});
