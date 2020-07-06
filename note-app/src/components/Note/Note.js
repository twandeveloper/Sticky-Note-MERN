import React from "react";

import { Card, CardText, CardBody, CardTitle, Col } from "reactstrap";

import classes from "./Note.module.css";

const Note = ({ notes, isLoading }) => {
  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section>
      {notes.map((note) => (
        <Col lg="3">
          <Card
            className={classes.Card}
            // onClick={(e) => props.removeNote(e, note.id)}
          >
            <CardBody>
              <CardTitle className={classes.CardTitle}>{note.title}</CardTitle>
              <CardText className={classes.CardText}>
                {note.text} " " {note.id}
              </CardText>
            </CardBody>
          </Card>
        </Col>
      ))}
    </section>
  );

  // <Col lg="3">
  // <Card
  //   className={classes.Card}
  //   onClick={(e) => props.removeNote(e, props.id)}
  // >
  //   <CardBody>
  //     <CardTitle className={classes.CardTitle}>{props.title}</CardTitle>
  //     <CardText className={classes.CardText}>
  //       {props.text} " " {props.id}
  //     </CardText>
  //   </CardBody>
  // </Card>
  // </Col>
};

export default Note;
