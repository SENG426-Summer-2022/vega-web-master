import { Form, Button, Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';

const SignUpUser = ({ onSubmit }) => {

	const [password, setPassword] = useState('');
	const [firstname, setFirstName] = useState('');
	const [lastname, setLastName] = useState('');
	const [email, setEmail] = useState('');

	const [confirm_password, setConfirmPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const maybeError = <p>{errorMessage}</p>

	const submitForm = (evt) => {
		evt.preventDefault();
		const empty = [email, lastname, firstname, password, confirm_password].find((x) => x == "")
		if (empty != undefined) {
			return setErrorMessage("Please fill all fields");
		}
		if (password != confirm_password) {
			return setErrorMessage("Passwords Do Not Match");
		}
		setErrorMessage("")
		onSubmit({
			'firstname': firstname,
			'lastname': lastname,
			'email': email,
			'password': password
		})
	}
	// TODO ensure passwords match and handle non filled fields or
	// passwords
	return (
		<Row>
			<Col className="mx-auto" xs={6}>
				<Form onSubmit={submitForm}>
					<Form.Group className="mb-3">
						<Form.Label>FIRST NAME</Form.Label>
						<Form.Control type="text" onChange={e => setFirstName(e.target.value)} />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>LAST NAME</Form.Label>
						<Form.Control type="text" onChange={e => setLastName(e.target.value)} />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>EMAIL</Form.Label>
						<Form.Control type="text" onChange={e => setEmail(e.target.value)} />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>PASSWORD</Form.Label>
						<Form.Control type="PASSWORD" onChange={e => setPassword(e.target.value)} />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>CONFIRM PASSWORD</Form.Label>
						<Form.Control type="PASSWORD" onChange={e => setConfirmPassword(e.target.value)} />
					</Form.Group>
					<p className="alert-danger text-center">{maybeError}</p>
					<Button variant="primary" type="submit" onClick={submitForm}>
						Submit
					</Button>
				</Form>
			</Col>
		</Row>
	);
}
export default SignUpUser;
