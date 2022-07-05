import { useContext, useEffect, useState } from "react";
import { Button, Stack, Form } from "react-bootstrap";

import SimplePageLayout from "../templates/SimplePageLayout";
import DeleteUserButton from "../UI/molecules/DeleteUser";

import { deleteAccount, updateUser } from "../../service/AdminPanel/AdminPanel";

const editSuccessMessage = {
  type: "success",
  message: "User updated successfully!",
};

const editErrorMessage = {
  type: "danger",
  message: "User update failed. Please try again later.",
};

const deleteSuccessMessage = {
  type: "success",
  text: "User deleted successfully.",
};

const deleteErrorMessage = {
  type: "danger",
  text: "User deletion was not successful. Please try again later.",
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
  const [userDeleted, setUserDeleted] = useState(false);

  useEffect(() => {
    if (user.role !== "ROLE_ADMIN") {
      props.history.push("/");
    }
  }, [user.role]);

  const cancelEdit = () => {
    setFormDisabled(!formDisabled);
  };

  const deleteUser = async () => {
    const response = await deleteAccount(userData.username, user.jwt);
    if (response.status === "OK") {
      setMessage(deleteSuccessMessage);
      setUserDeleted(true);
    } else {
      setMessage(deleteErrorMessage);
    }
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

      if (response.status === "OK") {
        setMessage(editSuccessMessage);
        setUserData(userFormData);
        setFormDisabled(true);
      } else {
        setMessage(editErrorMessage);
      }
    } catch (e) {
      setMessage(editErrorMessage);
    }

    if (response.status === "OK") {
      setMessage(successMessage);
    } else {
      setMessage(errorMessage);
    }
  };

  if (userDeleted) {
    return (
      <SimplePageLayout>
        <h3>User Management</h3>
        <hr />
        {message && (
          <div className={`alert alert-${message.type}`}>{message.text}</div>
        )}
        <a href="/adminpanel">
          <Button variant="primary">Return to Admin Panel</Button>
        </a>
      </SimplePageLayout>
    );
  }

  return (
    <SimplePageLayout>
      <h3>User Management</h3>
      <hr />
      <Form onSubmit={onSubmit} style={{ marginBottom: "4rem" }}>
        <Stack
          direction="horizontal"
          style={{ justifyContent: "flex-end", marginBottom: "1rem" }}
        >
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
          <hr style={{ marginTop: "2rem", marginBottom: "2rem" }} />
          {formDisabled && <DeleteUserButton onClick={deleteUser} />}
        </Stack>
      </Form>
    </SimplePageLayout>
  );
};

export default AdminUserManagement;
