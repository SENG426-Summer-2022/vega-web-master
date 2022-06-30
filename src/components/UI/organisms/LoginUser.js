import { Container, Form, Button, Row, Col } from "react-bootstrap";
import React, { useState } from "react";

const LoginUser = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = (evt) => {
    evt.preventDefault();
    onSubmit({
      username: username,
      password: password,
    });
  };

  return (
    <Container>
      <Row>
        <Col className="mx-auto" xs={6}>
          <Form onSubmit={submitForm}>
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
            <Button variant="primary" type="submit" onClick={submitForm}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
      <Row
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          variant="outline-primary"
          size="lg"
          href="/signup"
          style={{ marginTop: "8rem", maxWidth: "20rem" }}
        >
          Sign Up
        </Button>
      </Row>
    </Container>
  );
};
export default LoginUser;
