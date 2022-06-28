import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Stack, Col, Container } from "react-bootstrap";
import SimplePageLayout from "../templates/SimplePageLayout.js";
import { UserContext } from "../../auth/UserProvider.js";
import { changePassword } from "../../service/auth/PasswordManager.js";

const UserAccount = () => {
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

    // compare passwords
    if (data.newPassword !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // send to backend
    const response = await changePassword(data.newPassword, user.token);

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
      <Stack gap={5} style={{ marginTop: "1rem" }}>
        <Stack direction="horizontal">
          <p>Hello, {user.username}</p>
          <Button
            onClick={logoutAndRouteChange}
            size="sm"
            style={{ maxWidth: "100px" }}
            variant="danger"
            className="ms-auto"
          >
            Sign Out
          </Button>
        </Stack>

        <Container
          style={{ marginBottom: "4rem", paddingLeft: "0", maxWidth: "30rem" }}
        >
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
      </Stack>
    </SimplePageLayout>
  );
};
export default UserAccount;
