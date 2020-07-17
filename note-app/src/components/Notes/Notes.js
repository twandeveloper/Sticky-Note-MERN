import React from "react";

import Note from "./Note/Note";
import classes from "./Notes.module.css";

function Notes({ notes, removeNote }) {
  const note = notes.map((note) => (
    <Note
      key={note._id}
      title={note.noteTitle}
      text={note.noteText}
      id={note._id}
      removeNote={removeNote}
    />
  ));

  return <section className={classes.Notes}>{note}</section>;
}

export default Notes;
