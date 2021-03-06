import { Form, Button, Row, Col } from "react-bootstrap";
import React, { useState } from "react";

const SignUpUser = ({ onSubmit }) => {
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");

  const [confirm_password, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const maybeError = <p>{errorMessage}</p>;

  const submitForm = (evt) => {
    evt.preventDefault();
    const empty = [
      username,
      lastname,
      firstname,
      password,
      confirm_password,
    ].find((x) => x == "");
    if (empty != undefined) {
      return setErrorMessage("Please fill all fields");
    }
    if (password != confirm_password) {
      return setErrorMessage("Passwords Do Not Match");
    }
    setErrorMessage("");
    onSubmit({
      username: username,
      firstname: firstname,
      lastname: lastname,
      password: password,
    });
  };
  // TODO ensure passwords match and handle non filled fields or
  // passwords
  return (
    <Row>
      <Col className="mx-auto" xs={6}>
        <Form onSubmit={submitForm}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="firstname">FIRST NAME</Form.Label>
            <Form.Control
              id="firstname"
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="lastname">LAST NAME</Form.Label>
            <Form.Control
              id="lastname"
              type="text"
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="username">USERNAME</Form.Label>
            <Form.Control
              id="username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="password">PASSWORD</Form.Label>
            <Form.Control
              id="password"
              type="PASSWORD"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="confirmPassword">CONFIRM PASSWORD</Form.Label>
            <Form.Control
              id="confirmPassword"
              type="PASSWORD"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Text className="alert-danger text-center">
            {maybeError}
          </Form.Text>
          <Button variant="primary" type="submit" onClick={submitForm}>
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};
export default SignUpUser;
