import {useState, useContext} from 'react';
import UserRegistrationPageLayout from '../templates/UserRegistrationPageLayout.js';
import LoginUser from '../UI/organisms/LoginUser.js';
import {login} from '../../service/auth/AuthenticationManager.js';

import {UserContext} from '../../auth/UserProvider.js';
import  { Redirect } from 'react-router-dom'

const Login = (props) => {

	const { context } = props;
	const {user, setUserInfo,logout} = useContext(UserContext);
	const [auth, setAuth] = useState(false);
	const [message, setMessage] = useState(false);
	console.log("Userinfo", user);
	function onSubmit(userInfo){
		login(userInfo)
			.then(res => {
				console.log("Response", res);
				console.log(res.jwt);
				if (typeof (res.authorities) == 'object') {
				    const role = res.authorities[0].authority;
				    setUserInfo(userInfo.username, res.jwt, role);
				    return setAuth(true);
				}
				// Login failed
				if (res.code != 401) {
				    return setMessage("Login failed, The username or password is incorrect.");
				}
				console.log("Failed to sign in");
				setMessage("Login Failed Please Try Again Later");
			})
	}

		if(!auth){
			return (
				<UserRegistrationPageLayout>
					<LoginUser onSubmit={onSubmit} />
					<p></p>
					<p className="alert-danger text-center">{message}</p>
				</UserRegistrationPageLayout>
			);
		} else {
			return <Redirect to='/' />;
		}
}

export default Login;
