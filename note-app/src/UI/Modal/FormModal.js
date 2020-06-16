import React from "react";

import {
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import classes from "./formModal.module.css";

const FormModal = (props) => {
  return (
    <Modal isOpen={props.openModal} className={classes.Modal}>
      <ModalBody>
        <ModalHeader>Add Note</ModalHeader>
        <Form>
          <FormGroup>
            <Label for="noteTitle">Note Title</Label>
            <Input
              onChange={props.changeTitle}
              type="input"
              name="noteTitle"
              value={props.title}
              required={true}
            ></Input>
            <Label for="noteText">Text Area</Label>
            <Input
              onChange={props.changeNote}
              name="noteText"
              type="textarea"
              maxLength="200"
              value={props.note}
              id="noteText"
              required={true}
            />
          </FormGroup>
          <button type="submit" onClick={props.addNote}>
            Submit
          </button>
        </Form>
        <button onClick={props.toggleModal}>close modal</button>
      </ModalBody>
    </Modal>
  );
};

export default FormModal;
