import React from "react";

import { Card, CardText, CardBody, CardTitle, Col } from "reactstrap";

import classes from "./Note.module.css";

const Note = (props) => {
  return props.isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <Col lg="3">
      <Card
        className={classes.Card}
        onClick={(e) => props.removeNote(e, props.id)}
      >
        <CardBody>
          <CardTitle className={classes.CardTitle}>{props.title}tt</CardTitle>
          <CardText className={classes.CardText}>
            {props.text} " " {props.id}
          </CardText>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Note;
