import React from "react";

import classes from "./Login.module.css";

import { Form, FormGroup, Label, Input } from "reactstrap";

const Login = () => {
  return (
    <div className={classes.Login}>
      <Form>
        <FormGroup>
          <Label for="userName">UserName</Label>
          <Input
            type="text"
            name="username"
            id="userName"
            placeholder="username"
          />
          <Label for="password">Password</Label>
          <Input type="password" name="password" id="password" />
        </FormGroup>
      </Form>
    </div>
  );
};

export default Login;
