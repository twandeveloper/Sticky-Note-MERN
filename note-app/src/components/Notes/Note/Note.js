import React from "react";

import classes from "./Note.module.css";

function Note({ title, text, id, removeNote }) {
  return (
    <div className={classes.Note} onClick={(e) => removeNote(e, id)}>
      <div className={classes.title}>{title}</div>
      <div className={classes.text}>{text}</div>
      <div>{id}</div>
    </div>
  );
}

export default Note;
