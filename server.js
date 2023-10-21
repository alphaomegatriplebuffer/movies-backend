const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const DataModel = require("./fileModel");
require("./dbConn");

const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public/images"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

app.post("/upload", upload.single("file"), async (req, res) => {
  const { title, genre, duration, description } = req.body;

  const data = {
    title: title,
    genre: genre,
    duration: duration,
    banner: req.file.filename,
    description: description,
  };
  console.log(data);

  const saveResult = await DataModel.insertMany(data);
  console.log(saveResult);
  res.json(saveResult);
});

app.get("/records", async (req, res) => {
  const data = await DataModel.find({});
  console.log(data);
  res.json(data);
});

mongoose
  .connect(`mongodb+srv://dbuser:012345@cluster0.wytfhtw.mongodb.net/`)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    console.log(`Database Connected!`);
  });


