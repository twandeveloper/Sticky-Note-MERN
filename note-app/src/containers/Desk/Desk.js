import React, { useState, useEffect, useReducer } from "react";
import * as actionTypes from "../../actions/actionTypes";

import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

import Button from "../../UI/Button/AddButton";
import Modal from "../../UI/Modal/FormModal";
import Login from "../../components/Login/Login";
import Notes from "../../components/Notes/Notes";
import Navigation from "../../UI/Nav/Navigation";

import classes from "./Desk.module.css";

const initialState = {
  notes: [],
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SUCCESS:
      console.log("success");

      return {
        notes: action.payload,
      };

    case actionTypes.ADD_NOTE:
      console.log("added");
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case actionTypes.DELETE_NOTE:
      console.log("delete");
      return state;
    default:
      break;
  }
};

const Desk = () => {
  const [state, dispatch] = useReducer(noteReducer, initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getNotes();
  }, []);

  const addNote = async (e) => {
    e.preventDefault();
    try {
      const res = await axios
        .post("/addNote", {
          title: title,
          text: text,
        })
        .then((res) => {
          console.log(res.data);
          setShowModal(false);
          dispatch({ type: actionTypes.ADD_NOTE, payload: res.data });
        });
    } catch (err) {
      console.log(err);
    }
  };

  // sends request to backend to get all notes
  const getNotes = async () => {
    try {
      const res = await axios.get("/user/notes");
      dispatch({ type: actionTypes.GET_SUCCESS, payload: res.data });
      setIsLoading(false);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const removeNoteHandler = async (e, noteId) => {
    e.preventDefault();
    try {
      const res = await axios
        .post("/removeNote", {
          id: noteId,
        })
        .then((res) => {
          console.log(res.data);
          getNotes();
          dispatch({ type: actionTypes.DELETE_NOTE });
        });
    } catch (err) {
      console.log(err);
    }
  };

  const toggleModalHandler = () => {
    setShowModal(!showModal);
    console.log(showModal);
  };

  const noteDataHandler = (e) => {
    setText(e.target.value);
  };

  const noteTitleHandler = (e) => {
    setTitle(e.target.value);
  };

  const modalForm = (
    <Modal
      openModal={showModal}
      toggleModal={toggleModalHandler}
      changeTitle={noteTitleHandler}
      changeNote={noteDataHandler}
      // addNote={addNoteHandler}
      addNote={addNote}
      // title={notes.noteTitle}
      // note={notes.noteText}
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
            {isLoading ? (
              <h1>Notes are loading</h1>
            ) : (
              <Notes notes={state.notes} removeNote={removeNoteHandler} />
            )}

            {modalForm}
            <Button addNote={toggleModalHandler} />
          </Route>
        </div>
      </Router>
    </>
  );
};

export default Desk;
