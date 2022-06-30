import { useState } from "react";
import UserRegistrationPageLayout from "../templates/UserRegistrationPageLayout.js";
import SignUpUser from "../UI/organisms/SignUpUser.js";
import { signup } from "../../service/auth/AuthenticationManager.js";
import CenteredHeader from "../UI/atoms/CenteredHeader.js";

import { Redirect } from "react-router-dom";

const SignUp = () => {
  const [created, setCreated] = useState(false);
  const [message, setMessage] = useState("");

  function onSubmit(userInfo) {
    signup(userInfo).then((res) => {
      console.log(JSON.stringify(res));
      if (res.errno) {
        setMessage(
          "Failed To Process Your Registration Please Try Again Later"
        );
        return;
      } // Login failed
      if (res.code === 401) {
        setMessage("Unauthorized Sign Up.");
        return;
      }
      setMessage("");
      alert("Your account will soon be created");
      setCreated(true);
    });
  }

  if (!created) {
    return (
      <UserRegistrationPageLayout>
        <CenteredHeader text="Sign Up" style={{ marginBottom: "2rem" }} />
        <SignUpUser onSubmit={onSubmit} />
        <p className="alert-danger text-center">{message}</p>
      </UserRegistrationPageLayout>
    );
  } else {
    return <Redirect to="/login" />;
  }
};

export default SignUp;
