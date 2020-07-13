const express = require("express");
require("dotenv").config();

const Notes = require("./notes");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// const notes = [
//   { noteId: 1, noteTitle: "Note 1", noteText: "This is my express note" },
//   {
//     noteId: 2,
//     noteTitle: "Note 2",
//     noteText: "This is another express note",
//   },
//   {
//     noteId: 3,
//     noteTitle: "Note 3",
//     noteText: "This is my final express notessss",
//   },
// ];

app.get("/user/notes", (req, res) => {
  Notes.find().then((notes) => res.json(notes));
});

app.post("/addNote", (req, res) => {
  console.log(req.body);

  const note = new Notes({
    _id: new mongoose.Types.ObjectId(),
    noteTitle: req.body.title,
    noteText: req.body.text,
  });
  note
    .save()
    .then((note) => res.json(note))
    .catch((err) => console.log(err));
});

app.post("/removeNote", (req, res) => {
  const id = req.body.id;
  console.log(id);

  Notes.findByIdAndDelete(id)
    .then(console.log("item delelte"))
    .then((id) => res.json(id))
    .catch((err) => {
      console.log(err);
    });
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
