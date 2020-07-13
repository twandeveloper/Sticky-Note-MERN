import React from "react";

import classes from "./Note.module.css";

function Note({ title, text }) {
  return (
    <div className={classes.Note}>
      <div className={classes.title}>{title}</div>
      <div>{text}</div>
    </div>
  );
}

export default Note;
