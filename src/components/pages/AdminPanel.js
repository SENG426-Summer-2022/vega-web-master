import SimplePageLayout from "../templates/SimplePageLayout.js";
import {
  fetchuser,
  enableAccount,
  changeAccountRole,
} from "../../service/AdminPanel/AdminPanel.js";
import { UserContext } from "../../auth/UserProvider.js";
import { useState, useContext, useEffect } from "react";

import { Form, Button, Table } from "react-bootstrap";

const AdminPanel = (props) => {
  const { user } = useContext(UserContext);
  const [listOfUsers, setUsers] = useState(props.users || []);

  useEffect(() => {
    fetchuser(user.jwt).then((resp) => {
      setUsers(resp);
    });
  }, [user]);

  const enableUser = (username) => {
    enableAccount(username, user.jwt).then((resp) => {
      console.log("User enabled");
      // Update the list of users
      setUsers((users) => {
        return users.map((user) => {
          if (user.username === username) {
            user.enabled = true;
          }
          return user;
        });
      });
    });
  };

  const changeRole = (evt, username) => {
    var role = evt.target.value;
    changeAccountRole(username, role, user.jwt).then((resp) =>
      console.log("Changed Roles")
    );
  };

  const listOfUsersHTML = () => {
    if (listOfUsers.length) {
      return listOfUsers.map((user) => (
        <tr>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.username}</td>
          <td>
            {user.enabled ? (
              "Enabled"
            ) : (
              <Button onClick={() => enableUser(user.username)}>
                Enable User
              </Button>
            )}
          </td>
          <td>
            <Form.Select
              aria-label={`Select role for ${user.username}`}
              onChange={(evt) => changeRole(evt, user.username)}
              value={user.role === "ROLE_STAFF" ? "STAFF" : "USER"}
            >
              <option>Open this select menu</option>
              <option value="ROLE_STAFF">STAFF</option>
              <option value="ROLE_USER">USER</option>
            </Form.Select>
          </td>
        </tr>
      ));
    }
  };

  return (
    <SimplePageLayout>
      <Table>
        <thead>
          <tr>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Username</td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>{listOfUsersHTML()}</tbody>
      </Table>
    </SimplePageLayout>
  );
};
export default AdminPanel;
