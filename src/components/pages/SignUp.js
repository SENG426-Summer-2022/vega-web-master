import { useState, useContext } from 'react';
import UserRegistrationPageLayout from '../templates/UserRegistrationPageLayout.js';
import SignUpUser from '../UI/organisms/SignUpUser.js';
import { signup } from '../../service/auth/AuthenticationManager.js';

import { UserContext } from '../../auth/UserProvider.js';
import { Redirect } from 'react-router-dom'

const SignUp = (props) => {

	const { context } = props;
	const { user, setUserInfo, logout } = useContext(UserContext);
	const [created, setCreated] = useState(false);
	const [message, setMessage] = useState("");
	console.log("Userinfo", user);
	function onSubmit(userInfo) {
		signup(userInfo)
			.then(res => {
			    console.log(JSON.stringify(res))
			    if (res.errno){
				setMessage("Failed To Process Your Registration Please Try Again Later");
				return;
			    }				// Login failed
			    if (res.code === 401) {
				setMessage("Unauthorized Sign Up.");
				return
			    }
			    setMessage("")
			    alert("Your account will soon be created");
			    setCreated(true);
			})
	}

	if (!created) {
		return (
			<UserRegistrationPageLayout>
			<SignUpUser onSubmit={onSubmit} />
			<p></p>
			<p className="alert-danger text-center">{message}</p>
			</UserRegistrationPageLayout>
		);
	} else {
	    return <Redirect to='/login' />;
	}
}

export default SignUp;
