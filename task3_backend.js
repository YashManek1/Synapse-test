const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const uri =
  "mongodb+srv://yashmanek2001:fRrlr5iHO91aCyLs@cluster0.nqw17.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const { ObjectId } = mongoose.Types;

app.use(bodyParser.json());

const BooksSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  genre: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    required: true,
  },
});

mongoose
  .connect(uri)
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const Books = new mongoose.model("Books", BooksSchema);
app.post("/postData", async (req, res) => {
  const body = req.body;
  const result = await Books.create({
    fullName: body.fullName,
    id: body.id,
    genre: body.genre,
    author: body.author,
    availability: body.availability,
  });
  console.log(result);
  return res.status(200).json({ message: "Successfully added data" });
});

app.get("/getData", async (req, res) => {
  try {
    const books = await Books.find();
    return res.status(200).json({ books });
  } catch (err) {
    console.log(err);
  }
});

app.put("/updateData/:id", async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;
    const books = await Books.findByIdAndUpdate(id, body, { new: true });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/deleteData/:id", async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;
    const books = await Books.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
});

app.listen(5000, async (req, res) => {
  console.log("Server is connected");
});
