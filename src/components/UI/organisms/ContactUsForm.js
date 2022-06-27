import { Form, Button, Col } from "react-bootstrap";
import { useState } from "react";

const checkNameValidity = () => {
  let nameIsValid = true;
  // check if name has sepcial characters
  const name = document.getElementById("name").value;
  const nameRegex = /^[a-zA-Z]+$/;
  if (!nameRegex.test(name)) {
    // set bootstrap form to invalid on name
    document.getElementById("name").classList.add("is-invalid");
    nameIsValid = false;
  }
  return nameIsValid;
};

const checkMessageValidity = () => {
  let messageIsValid = true;
  // message max 1000 characters
  const message = document.getElementById("message").value;
  if (message.length > 1000) {
    // set bootstrap form to invalid on message
    document.getElementById("message").classList.add("is-invalid");
    messageIsValid = false;
  }
  return messageIsValid;
};

const resetValidation = () => {
  document.getElementById("name").classList.remove("is-invalid");
  document.getElementById("email").classList.remove("is-invalid");
  document.getElementById("message").classList.remove("is-invalid");
};

const preventEvents = (event) => {
  event.preventDefault();
  event.stopPropagation();
};

const ContactUsForm = (props) => {
  const [checked, setChecked] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const onChange = () => {
    setSubmitSuccess(false);
    setSubmitError(false);
    setChecked(false);
  };

  const handleSubmit = async (event) => {
    // remove is-invalid class from all fields
    setSubmitSuccess(false);
    setChecked(false);
    preventEvents(event);
    resetValidation();

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setChecked(true);
      return;
    }

    const nameIsValid = checkNameValidity();
    const messageIsValid = checkMessageValidity();
    if (nameIsValid && messageIsValid) {
      // submit form
      // collect name, email, and message
      const result = await props.onSubmit(
        document.getElementById("name").value,
        document.getElementById("email").value,
        document.getElementById("message").value
      );
      if (result.success) {
        // set success to true
        setSubmitSuccess(true);
      } else {
        setSubmitError(true);
      }
      setChecked(true);
    }

    // invalid
  };

  return (
    <Col className="mx-auto" xs={6}>
      {submitSuccess && (
        <div className="alert alert-success">Message sent successfully</div>
      )}
      {submitError && (
        <div className="alert alert-danger">Message failed to send</div>
      )}

      <Form
        noValidate
        id="contact-form"
        validated={checked}
        onSubmit={handleSubmit}
        onChange={onChange}
      >
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>NAME</Form.Label>
          <Form.Control required type="text" />
          <Form.Control.Feedback type="invalid">
            Please provide your name. Only letters are allowed.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>EMAIL</Form.Label>
          <Form.Control required type="email" />
          <Form.Control.Feedback type="invalid">
            Please provide your email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="message">
          <Form.Label>MESSAGE</Form.Label>
          <Form.Control required as="textarea" rows={3} />
          <Form.Control.Feedback type="invalid">
            Please provide a message. Max 1000 characters.
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Col>
  );
};
export default ContactUsForm;
