const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const notes = [
  { noteId: 1, noteTitle: "Note 1", noteText: "This is my express note" },
  {
    noteId: 2,
    noteTitle: "Note 2",
    noteText: "This is another express note",
  },
  {
    noteId: 3,
    noteTitle: "Note 3",
    noteText: "This is my final express notessss",
  },
];

app.get("/user/notes", (req, res) => {
  res.json(notes);
});

app.post("/user/addNote", (req, res) => {
  const newNote = req.body;
  notes.push(newNote);
  console.log(notes);
});

const port = 3001;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
