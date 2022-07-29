import SimplePageLayout from "../templates/SimplePageLayout.js";
import {
  fetchuser,
  disableAccount,
  enableAccount,
  changeAccountRole,
} from "../../service/AdminPanel/AdminPanel.js";
import { getCSRF } from "../../service/auth/AuthenticationManager.js";
import { UserContext } from "../../auth/UserProvider.js";
import { useState, useContext, useEffect } from "react";

import { Form, Button, Table, Container, Row, Stack } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const AdminPanel = (props) => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [listOfUsers, setUsers] = useState([]);
  
  const updateUsers = () => {
    console.log("Updating Users");
    fetchuser(user.jwt).then((resp) => {
      setUsers(resp);
    });
  };

  const csrf = (userInfo) => {
    getCSRF(user.jwt).then((res) => {
      if (res.error) {
        console.log("Failure!");
        console.log(JSON.stringify(res));
        return;
      }
      console.log(JSON.stringify(res));
    });
  }

  useEffect(() => {
    csrf();
    updateUsers();
  }, [user]);

	const enableUser = (username) => {
		enableAccount(username, user.jwt)
			.then(_resp => {
				console.log("User enabled")
				updateUsers()
			})
	}

  const disableUser = (username) => {
    console.log("Disable User called with", username);
    disableAccount(username, user.jwt).then((_resp) => {
      console.log("User disableAccount");
      updateUsers();
    });
  };

	const changeRole = (evt, username) => {
		var role = evt.target.value
		changeAccountRole(username, role, user.jwt)
			.then(_resp => {
				console.log("Changed Roles")
				updateUsers()
			})
	}
	const updateEnabledState = (user) => user.enabled
		? disableUser(user.username)
		: enableUser(user.username);

  const manageUser = (user) => {
    history.push("/usermanagement", user);
  };

  // Possible Roles the text to display for it
  const roles = {
    ROLE_STAFF: "STAFF",
    ROLE_USER: "USER",
  };

  const listOfUsersHTML = () => {
    console.log(listOfUsers);
    if (!listOfUsers.length) return;
    return listOfUsers.map((user, i) => {
      console.log(JSON.stringify(user));
      const auth = user.role.authority ? user.role.authority : "ROLE_USER";
      // HTML elements for the current users role
      const RoleText = <option value={auth}>{roles[auth]}</option>;

      // List of HTML elements that are != to the current users role
      const menuOption = Object.keys(roles)
        .filter((role) => role != auth)
        .map((role) => <option value={role} key={`option-${role}`}>{roles[role]}</option>);

      const EnableText = user.enabled ? "Disable User" : "Enable User";

      return (
        <tr key={`user-list-${i}`}>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.username}</td>
          <td onClick={() => updateEnabledState(user)}>
            <a href="#">{EnableText}</a>
          </td>
          <td>
            <Form.Select
              id="role-select"
              aria-label="Floating label select example"
              value={RoleText}
              onChange={(evt) => changeRole(evt, user.username)}
            >
              {RoleText}
              {menuOption}
            </Form.Select>
          </td>
          <td>
            <Button variant="primary" onClick={() => manageUser(user)}>
              Manage User
            </Button>
          </td>
        </tr>
      );
    });
  };

  return (
    <SimplePageLayout>
      <Container style={{ marginTop: "2rem" }}>
        <Row style={{ marginBottom: "2rem" }}>
          <Stack direction="horizontal" style={{ justifyContent: "flex-end" }}>
            <Button variant="success" href="./signup">
              Add User
            </Button>
          </Stack>
        </Row>
        <Row>
          <Table>
            <thead>
              <tr>
                <td>First Name</td>
                <td>Last Name</td>
                <td>Username</td>
                <td>Enable User</td>
                <td>Change Role</td>
                <td>Manage</td>
              </tr>
            </thead>
            <tbody>{listOfUsersHTML()}</tbody>
          </Table>
        </Row>
      </Container>
    </SimplePageLayout>
  );
};

export default AdminPanel;
