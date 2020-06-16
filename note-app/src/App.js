import React from "react";

import { Container } from "reactstrap";

import Desk from "./containers/Desk/Desk";
import "./App.css";

const App = (props) => {
  return (
    <Container fluid="true" className="App">
      <Desk />
    </Container>
  );
};

export default App;
