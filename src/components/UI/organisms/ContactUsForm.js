import {Form, Button, Col} from 'react-bootstrap';
import {useState} from "react"

const checkNameValidity = () => {
    let nameIsValid = true;
	  // check if name has sepcial characters
	  const name = document.getElementById('name').value;
	  const nameRegex = /^[a-zA-Z]+$/;
	  if (!nameRegex.test(name)) {
      // set bootstrap form to invalid on name
      document.getElementById('name').classList.add('is-invalid');
      nameIsValid = false;
    }
    return nameIsValid;
  }

const checkMessageValidity = () => {
    let messageIsValid = true;
    // message max 1000 characters
    const message = document.getElementById('message').value;
    if (message.length > 1000) {
      // set bootstrap form to invalid on message
      document.getElementById('message').classList.add('is-invalid');
      messageIsValid = false;
    }
    return messageIsValid;
  }

const resetValidation = () => {
  document.getElementById("name").classList.remove("is-invalid");
  document.getElementById("email").classList.remove("is-invalid");
  document.getElementById("message").classList.remove("is-invalid");
}

const preventEvents = (event) => {
  event.preventDefault();
  event.stopPropagation();
}

const ContactUsForm = (props) => {
	const [validated, setValidated] = useState(false);

	const handleSubmit = (event) => {
    // remove is-invalid class from all fields
    resetValidation();

	  const form = event.currentTarget;
	  if (form.checkValidity() === false) {
      preventEvents(event);
	  }

    const nameIsValid = checkNameValidity();
    const messageIsValid = checkMessageValidity();
    if (nameIsValid && messageIsValid) {
      setValidated(true);
      return;
    }

    // invalid
    preventEvents(event);
	};

	return (
      <Col className="mx-auto" xs={6}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
      			<Form.Group className="mb-3" controlId="name">
        			<Form.Label>NAME</Form.Label>
        			<Form.Control required type="text" />
					<Form.Control.Feedback type="invalid">
						Please provide your name. Only letters are allowed.
					</Form.Control.Feedback>
      			</Form.Group>
      			<Form.Group className="mb-3" controlId="email">
        			<Form.Label>EMAIL</Form.Label>
        			<Form.Control required type="email"  />
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
}
export default ContactUsForm;