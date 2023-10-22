const express = require("express");
const multer = require("multer");
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://movies-backend-3d1e3.firebaseio.com",
});

const db = admin.firestore();
const moviesDb = db.collection("movies");

const app = express();
app.use(express.json())
app.use(cors())


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




app.post("/", upload.single("file"), async (req, res) => {
  const { title, genre, duration, description } = req.body;

  const data = {
    title: title,
    genre: genre,
    duration: duration,
    banner: req.file.filename,
    description: description,
  };
  
  console.log(data);

  const newDoc = moviesDb.doc();
  const result = await newDoc.set(data);
  res.json(result);
  console.log(result);
});


// Endpoint to get data from Firestore
app.get("/records", async (req, res) => {
  const movies = await db.collection("movies")
  const data = []

  const snapshot = await movies.get();
  snapshot.forEach(doc => {
    console.log(doc.data());
    data.push(doc.data())
  })

  res.json(data)


});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
