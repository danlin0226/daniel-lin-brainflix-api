const { v4: uuidv4 } = require("uuid");

const { writeFileSync } = require("fs");

const getNewId = () => {
  return uuidv4();
};

const getTimeStamp = () => {
  const date = new Date();
  timeStampSeconds = date.getTime() / 1000;
  return timeStampSeconds;
};

const writeJSONfile = (filename, data) => {
  try {
    writeFileSync(filename, JSON.stringify(data), "utf-8");
    console.log("write success");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getNewId, getTimeStamp, writeJSONfile };
