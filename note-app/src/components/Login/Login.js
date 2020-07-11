import React from "react";

import classes from "./Login.module.css";

import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const Login = () => {
  return (
    <div className={classes.Login}>
      <h5 className={classes.welcome}>Welcome to the Sticky Note Web App</h5>
      <Form className={classes.Form}>
        <FormGroup>
          <Label for="userName">UserName</Label>
          <Input
            type="text"
            name="username"
            id="userName"
            placeholder="username"
          />
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
        </FormGroup>
        <Button color="primary" size="lg" block>
          Login
        </Button>
        <Button color="danger" size="lg" block>
          Sign Up
        </Button>
      </Form>
    </div>
  );
};

export default Login;
