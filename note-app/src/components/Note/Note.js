import React from "react";

import { Card, CardText, CardBody, CardTitle, Col } from "reactstrap";

import classes from "./Note.module.css";

const Note = (props) => {
  return (
    <Col lg="3">
      <Card className={classes.Card}>
        <CardBody>
          <CardTitle className={classes.CardTitle}>{props.title}</CardTitle>
          <CardText className={classes.CardText}>{props.text}</CardText>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Note;
