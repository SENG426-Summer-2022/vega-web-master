import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Stack, Col, Container } from "react-bootstrap";
import SimplePageLayout from "../templates/SimplePageLayout.js";
import { UserContext } from "../../auth/UserProvider.js";

/**
 * 
 * 
Add a container containing two password inputs and a submission button to that /account path
Add front-end verification that the entered passwords match
Add front-end password encoding and send to /changepassword backend endpoint (to be implemented)} props 
 */

const UserAccount = (props) => {
  const { user, logout } = useContext(UserContext);
  const history = useHistory();

  const logoutAndRouteChange = () => {
    logout();
    history.push("/");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // get the values from the react-bootstrap form
    const data = {
      newPassword: e.target.newPassword.value,
      confirmPassword: e.target.confirmPassword.value,
    };
    console.log({ data });

    // compare passwords
    if (data.newPassword !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // send to backend
    const response = await fetch("/changepassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.jwt}`,
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      alert("Password changed successfully");
      // clear password fields
      document.getElementById("newPassword").value = "";
      document.getElementById("confirmPassword").value = "";
    } else {
      alert("Password change failed");
    }
  };

  return (
    <SimplePageLayout>
      <Stack gap={3} style={{ maxWidth: "400px" }}>
        <p>Hello,</p>
        <p>{user.username}</p>
        <Container style={{ marginBottom: "4rem" }}>
          <b>Change Password</b>
          <Col style={{ marginTop: "1rem" }}>
            <Form onSubmit={onSubmit}>
              <Form.Group
                controlId="newPassword"
                style={{ marginBottom: "1rem" }}
              >
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group
                controlId="confirmPassword"
                style={{ marginBottom: "1rem" }}
              >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Container>
        <Button
          onClick={logoutAndRouteChange}
          size="sm"
          style={{ maxWidth: "100px" }}
        >
          Sign Out
        </Button>
      </Stack>
    </SimplePageLayout>
  );
};
export default UserAccount;
