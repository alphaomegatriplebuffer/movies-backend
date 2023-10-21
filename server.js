const express = require("express");
const cors = require("cors");
const DataModel = require("./fileModel");
require("./dbConn");
require("dotenv").config();


const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public/images"));

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + "_" + file.originalname);
//   },
// });

// const upload = multer({
//   storage: storage,
// });

// app.post("/upload", upload.single("file"), async (req, res) => {
//   const { title, genre, duration, description } = req.body;

//   const data = {
//     title: title,
//     genre: genre,
//     duration: duration,
//     banner: req.file.filename,
//     description: description,
//   };
//   console.log(data);

//   const saveResult = await DataModel.insertMany(data);
//   console.log(saveResult);
//   res.json(saveResult);
// });

app.get("/records", async (req, res) => {
  const data = await DataModel.find({});
  console.log(data);
  res.json(data);
});

app.get('/', (req,res)=>{
  res.json('hello')
})


require("mongoose")
  .connect(process.env.MONGO_URI)
  .then((res) => {
    app.listen("mongodb+srv://dbuser:012345@cluster0.wytfhtw.mongodb.net/", () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
    console.log("Database Connected!");
  })
  .catch((err) => {
    console.log(err);
  });


