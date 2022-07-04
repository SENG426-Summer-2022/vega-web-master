import { useState, useContext } from "react";
import FormPageLayout from "../templates/FormPageLayout.js";
import LoginUser from "../UI/organisms/LoginUser.js";
import { login } from "../../service/auth/AuthenticationManager.js";
import CenteredHeader from "../UI/atoms/CenteredHeader.js";

import { UserContext } from "../../auth/UserProvider.js";
import { Redirect } from "react-router-dom";

const Login = (props) => {

	const { context } = props;
	const {user, setUserInfo,logout} = useContext(UserContext);
	const [auth, setAuth] = useState(false);
	const [message, setMessage] = useState(false);
	console.log("Userinfo", user);
  function onSubmit(userInfo) {
    // check if userInfo is valid
    if (userInfo.username === "" || userInfo.password === "") {
      setMessage("Please fill in all fields");
      return;
    }

    login(userInfo).then((res) => {
      if (typeof res.authorities == "object") {
        const role = res.authorities[0].authority;
        setUserInfo(userInfo.username, res.jwt, role);
        return setAuth(true);
      }
      // Login failed
      if (res.code === 401) {
        return setMessage(
          "Login failed, The username or password is incorrect."
        );
      }
      console.log("Failed to sign in");
      setMessage("Login Failed Please Try Again Later");
    });
  }

  if (!auth) {
    return (
      <FormPageLayout>
        <CenteredHeader text="Login" style={{ marginBottom: "2rem" }} />
        <LoginUser onSubmit={onSubmit} />
        <p className="alert-danger text-center">{message}</p>
      </FormPageLayout>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Login;
