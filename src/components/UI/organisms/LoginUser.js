import {Form, Button, Row, Col} from 'react-bootstrap';
import React, { useState } from 'react';

const LoginUser = ({onSubmit}) => {

	const [username, setUsername]  = useState('');
	const [password, setPassword] = useState('');

	const submitForm = (evt) => {
		evt.preventDefault();
		onSubmit({
			'username' : username,
			'password' : password
		})
	}

	return (
		<Row>
      		<Col className="mx-auto" xs={6}>
        		<Form onSubmit={submitForm}>
	      			<Form.Group className="mb-3">
	        			<Form.Label>USERNAME</Form.Label>
	        			<Form.Control type="text" onChange={e => setUsername(e.target.value)}/>
	      			</Form.Group>
	      			<Form.Group className="mb-3">
	        			<Form.Label>PASSWORD</Form.Label>
	        			<Form.Control type="PASSWORD" onChange={e => setPassword(e.target.value)}/>
	      			</Form.Group>
	      			<Button variant="primary" type="submit" onClick={submitForm}>
	        			Submit
	      			</Button>
    			</Form>
      		</Col>
		    <p></p>
			<Button href="/signup">
				SignUp
			</Button>
		</Row>
		);
}
export default LoginUser;
