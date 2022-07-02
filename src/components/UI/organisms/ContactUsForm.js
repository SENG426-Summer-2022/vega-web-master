import {Form, Button, Row, Col} from 'react-bootstrap';
import {useState} from "react"

const ContactUsForm = (props) => {
	const [validated, setValidated] = useState(false);

	const handleSubmit = (event) => {
	  const form = event.currentTarget;
	  if (form.checkValidity() === false) {
		event.preventDefault();
		event.stopPropagation();
	  }
  
	  setValidated(true);
	};

	return (
      <Col className="mx-auto" xs={6}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
      			<Form.Group className="mb-3" controlId="name">
        			<Form.Label>NAME</Form.Label>
        			<Form.Control required type="text" />
					<Form.Control.Feedback type="invalid">
						Please provide your name.
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
						Please provide a message.
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