import React, { useState, useEffect, useCallback } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import { Row } from "reactstrap";

import Button from "../../UI/Button/AddButton";
import Modal from "../../UI/Modal/FormModal";
import Login from "../../components/Login/Login";
import Notes from "../../components/Note/Note";
import Navigation from "../../UI/Nav/Navigation";

import classes from "./Desk.module.css";

const Desk = () => {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      const res = await axios.get("/user/notes");
      const newNotes = res.data;
      console.log(newNotes);

      setNotes(newNotes);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  let noteTitle = "";
  let noteText = "";

  //Adds new note to notes array
  const addNoteHandler = (e) => {
    if (noteTitle && noteText) {
      e.preventDefault();

      axios.post("/addNote", {
        title: noteTitle,
        text: noteText,
      });
      getNotes();
      toggleModalHandler();
    } else {
      return;
    }
  };

  const removeNoteHandler = (e, noteId) => {
    if (noteId) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: noteId,
        }),
      };
      fetch("/removeNote", requestOptions).then((res) => res.json());

      e.preventDefault();
      getNotes();
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
    <Notes
      loading={isLoading}
      key={note._id}
      id={note._id}
      text={note.noteText}
      title={note.noteTitle}
      removeNote={(e) => removeNoteHandler(e, note._id)}
    />
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
