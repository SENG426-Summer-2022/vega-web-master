import { useContext, useEffect, useState } from "react";
import { Button, Stack, Form } from "react-bootstrap";

import SimplePageLayout from "../templates/SimplePageLayout";

import { deleteAccount, updateUser } from "../../service/AdminPanel/AdminPanel";

const successMessage = {
  type: "success",
  message: "User updated successfully!",
};

const errorMessage = {
  type: "danger",
  message: "User update failed. Please try again later.",
};

const AdminUserManagement = (props) => {
  const { user } = useContext(UserContext);
  const {
    user: { username, firstName, lastName },
  } = props.location.state;
  const [userData, setUserData] = useState({
    username,
    firstName,
    lastName,
  });
  const [userFormData, setUserFormData] = useState({
    username,
    firstName,
    lastName,
  });
  const [formDisabled, setFormDisabled] = useState(true);
  const [message, setMessage] = useState();

  useEffect(() => {
    if (user.role !== "ROLE_ADMIN") {
      props.history.push("/");
    }
  }, [user.role]);

  const cancelEdit = () => {
    setFormDisabled(!formDisabled);
  };

  const DeleteUser = async (username) => {
    const pResult = global.confirm(
      `Are you sure you want to delete the user ${username}?`
    );
    if (!pResult) return;
    await deleteAccount(username, user.jwt);
  };

  const onSubmit = async () => {
    let response;
    const { username, firstName, lastName } = userFormData;
    const { username: existingUsername } = userData;
    try {
      response = await updateUser(
        { existingUsername, username, firstName, lastName },
        user.jwt
      );
    } catch (e) {
      setMessage(errorMessage);
    }

    if (response.status === "OK") {
      setMessage(successMessage);
    } else {
      setMessage(errorMessage);
    }
  };

  // const ChangeUserEmail = (username) => {
  //   var newEmail = prompt("enter new Email");
  //   updateAccountEmail(username, newEmail, user.jwt).then((res) => {
  //     console.log(res);
  //     alert(res);
  //   });
  // };

  return (
    <SimplePageLayout>
      <h3>User Management</h3>
      <hr />
      <Form onSubmit={onSubmit}>
        <Stack direction="horizontal" style={{ justifyContent: "flex-end" }}>
          {formDisabled ? (
            <Button
              variant="primary"
              onClick={() => setFormDisabled(!formDisabled)}
            >
              Edit User
            </Button>
          ) : (
            <>
              <Button variant="danger" onClick={() => cancelEdit()}>
                Cancel
              </Button>
              <Button
                variant="success"
                type="submt"
                style={{ marginLeft: "1rem" }}
              >
                Save
              </Button>
            </>
          )}
        </Stack>

        <Stack>
          <Stack directon="horizontal">
            <Form.Group>
              <Form.Label htmlFor="firstName">First Name</Form.Label>
              <Form.Control
                type="text"
                id="firstName"
                value={firstName}
                disabled={formDisabled}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="lastName">Last Name</Form.Label>
              <Form.Control
                type="text"
                id="lastName"
                value={lastName}
                disabled={formDisabled}
              ></Form.Control>
            </Form.Group>
          </Stack>
          <Form.Group>
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control
              type="text"
              id="username"
              value={username}
              disabled={formDisabled}
            ></Form.Control>
          </Form.Group>
          <hr />
          {formDisabled && (
            <div>
              <Button variant="danger" onClick={() => DeleteUser(username)}>
                Delete User
              </Button>
            </div>
          )}
        </Stack>
      </Form>
    </SimplePageLayout>
  );
};

export default AdminUserManagement;
