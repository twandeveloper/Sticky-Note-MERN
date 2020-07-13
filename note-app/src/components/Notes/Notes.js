import React from "react";

import Note from "./Note/Note";
import classes from "./Notes.module.css";

function Notes({ notes }) {
  const note = notes.map((note) => (
    <Note title={note.noteTitle} text={note.noteText} />
  ));

  return <section className={classes.Notes}>{note}</section>;
}

export default Notes;
