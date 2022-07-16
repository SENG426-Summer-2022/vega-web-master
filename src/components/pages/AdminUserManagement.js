import { useContext, useEffect, useState } from "react";
import { Button, Stack, Form } from "react-bootstrap";

import SimplePageLayout from "../templates/SimplePageLayout";
import DeleteUserButton from "../UI/molecules/DeleteUser";
import { UserContext } from "../../auth/UserProvider";

import { deleteAccount, updateUser } from "../../service/AdminPanel/AdminPanel";

const editSuccessMessage = {
  type: "success",
  text: "User updated successfully!",
};

const editErrorMessage = {
  type: "danger",
  text: "User update failed. Please try again later.",
};

const emptyUsernameMessage = {
  type: "danger",
  text: "Please enter a username.",
};

const invalidUsernameMessage = {
  type: "danger",
  text: "Please enter a valid email address.",
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
  const { username, firstName, lastName } = props.location.state;
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

  // if (user.role !== "ROLE_ADMIN") {
  //   return <div>You are not authorized to access this page.</div>;
  // }

  const cancelEdit = () => {
    setUserFormData(userData);
    setFormDisabled(!formDisabled);
  };

  const deleteUser = async () => {
    try {
      await deleteAccount(userData.username, user.jwt);
      setMessage(deleteSuccessMessage);
      setUserDeleted(true);
    } catch (e) {
      setMessage(deleteErrorMessage);
    }
  };

  const onChange = (e) => {
    const { id, value } = e.target;
    setUserFormData({ ...userFormData, [id]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { username, firstName, lastName } = userFormData;
    const { username: existingUsername } = userData;

    // check for invalid username
    if (!username?.length) {
      setMessage(emptyUsernameMessage);
      return;
    }

    if (!username.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      setMessage(invalidUsernameMessage);
      return;
    }

    try {
      await updateUser(
        {
          username: existingUsername,
          newusername: username,
          newFirstname: firstName,
          newLastname: lastName,
        },
        user.jwt
      );
      setMessage(editSuccessMessage);
      setUserData(userFormData);
      setFormDisabled(true);
    } catch (e) {
      setMessage(editErrorMessage);
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

        {message && (
          <div className={`alert alert-${message.type}`}>{message.text}</div>
        )}

        <Stack>
          <Form.Group style={{ marginBottom: "1rem" }}>
            <Form.Label htmlFor="firstName">First Name</Form.Label>
            <Form.Control
              type="text"
              id="firstName"
              value={userFormData.firstName}
              disabled={formDisabled}
              onChange={onChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group style={{ marginBottom: "1rem" }}>
            <Form.Label htmlFor="lastName">Last Name</Form.Label>
            <Form.Control
              type="text"
              id="lastName"
              value={userFormData.lastName}
              disabled={formDisabled}
              onChange={onChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control
              type="text"
              id="username"
              value={userFormData.username}
              disabled={formDisabled}
              onChange={onChange}
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
