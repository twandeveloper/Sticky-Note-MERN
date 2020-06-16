import React from "react";

import { Button } from "reactstrap";

import classes from "./AddButton.module.css";

const AddButton = (props) => {
  return (
    <Button onClick={props.addNote} className={classes.Button} color="primary">
      Add Note
    </Button>
  );
};

export default AddButton;
