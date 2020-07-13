import React, { useState, useEffect, useReducer } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

import Button from "../../UI/Button/AddButton";
import Modal from "../../UI/Modal/FormModal";
import Login from "../../components/Login/Login";
import Notes from "../../components/Notes/Notes";
import Navigation from "../../UI/Nav/Navigation";

import classes from "./Desk.module.css";

// import notes from "../../../../notes";

const initialState = {
  notes: [],
};

const ACTIONS = {
  GET_SUCCESS: "get-success",
  ADD_NOTE: "add-note",
  DELETE_NOTE: "delete-note",
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_SUCCESS:
      console.log("success");

      return {
        notes: action.payload,
      };

    case ACTIONS.ADD_NOTE:
      console.log("added");
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case ACTIONS.DELETE_NOTE:
      console.log("delete");
      return state;
    default:
      break;
  }
};

// const newNote = (text, title) => {
//   return { text: text, title: title };
// };

const Desk = () => {
  const [state, dispatch] = useReducer(noteReducer, initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  // const [notes, setNotes] = useState([]);
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
          dispatch({ type: ACTIONS.ADD_NOTE, payload: res.data });
        });
    } catch (err) {
      console.log(err);
    }
    // getNotes();
  };

  // console.log(state.notes[2]);

  const getNotes = async () => {
    try {
      const res = await axios.get("/user/notes");
      dispatch({ type: ACTIONS.GET_SUCCESS, payload: res.data });
      setIsLoading(false);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // let noteTitle = "";
  // let noteText = "";

  //Adds new note to notes array
  // const addNoteHandler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post("/addnote", {
  //       noteTitle: "Note 5",
  //       noteText: "Hello",
  //     });
  //     console.log(res.data);
  //     dispatch({ type: ACTIONS.ADD_NOTE, payload: res.data });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
    // noteText = e.target.value;
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
            <Notes notes={state.notes} />
            {/* {isLoading ? "loading" : stickyNotes} */}

            {modalForm}
            <Button addNote={toggleModalHandler} />
          </Route>
        </div>
      </Router>
    </>
  );
};

export default Desk;
