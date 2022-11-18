const { v4: uuidv4 } = require("uuid");

const { writeFileSync } = require("fs");

const getNewId = () => {
  return uuidv4();
};

const writeJSONfile = (filename, data) => {
  try {
    writeFileSync(filename, JSON.stringify(data), "utf-8");
    console.log("write success");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getNewId, writeJSONfile };
