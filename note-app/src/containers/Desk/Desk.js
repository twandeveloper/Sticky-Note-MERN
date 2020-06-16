import React, { useState, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Row } from "reactstrap";

import Button from "../../UI/Button/AddButton";
import Modal from "../../UI/Modal/FormModal";
import Login from "../../components/Login/Login";
import Notes from "../../components/Note/Note";
import Navigation from "../../UI/Nav/Navigation";

import classes from "./Desk.module.css";

const Desk = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("/user/notes")
      .then((res) => res.json())
      .then((stickNotes) => setNotes(stickNotes));
  }, []);

  const [showModal, setShowModal] = useState(false);

  let noteTitle = "";
  let noteText = "";

  //Adds new note to notes array
  const addNoteHandler = (e) => {
    if (noteTitle && noteText) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          noteId: uuidv4(),
          noteTitle: noteTitle,
          noteText: noteText,
        }),
      };

      fetch("/user/addNote", requestOptions).then((res) => res.json());

      e.preventDefault();
      setNotes(
        notes.concat({
          noteId: uuidv4(),
          noteTitle: noteTitle,
          noteText: noteText,
        })
      );
      console.log(notes);
      toggleModalHandler();
    } else {
      return;
    }
  };

  const toggleModalHandler = () => {
    setShowModal(!showModal);
    console.log(showModal);
  };

  const noteDataHandler = (e) => {
    noteText = e.target.value;
  };

  const noteTitleHandler = (e) => {
    noteTitle = e.target.value;
  };

  const stickyNotes = notes.map((note) => (
    <Notes key={note.noteId} text={note.noteText} title={note.noteTitle} />
  ));

  const modalForm = (
    <Modal
      openModal={showModal}
      toggleModal={toggleModalHandler}
      changeTitle={noteTitleHandler}
      changeNote={noteDataHandler}
      addNote={addNoteHandler}
      title={notes.noteTitle}
      note={notes.noteText}
    />
  );

  return (
    <>
      <Router>
        <Navigation />
        <div className={classes.Desk}>
          <Route path="/" exact>
            <h1>Home page</h1>
          </Route>
          <Route path="/login" component={Login} />
          <Route path="/notes">
            <Row>{stickyNotes}</Row>
            {modalForm}
            <Button addNote={toggleModalHandler} />
          </Route>
        </div>
      </Router>
    </>
  );
};

export default Desk;
