import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import SimplePageLayout from "../templates/SimplePageLayout.js";
import { UserContext } from "../../auth/UserProvider.js";

const UserAccount = (props) => {
  const { user, setUserInfo, logout } = useContext(UserContext);
  const history = useHistory();

  const logoutAndRouteChange = () => {
    logout();
    history.push("/");
  };

  const goToVault = () => {
    history.push("/vault");
  };

  return (
    <SimplePageLayout>
      <Row>
        <Col sm={6}>
          <p>Hello,</p>
          <p>{user.username}</p>
          <Button
            onClick={() => goToVault()}
            size="sm"
            style={{ margin: "1rem" }}
          >
            Vault
          </Button>
          <Button onClick={logoutAndRouteChange} size="sm">
            Sign Out
          </Button>
        </Col>
      </Row>
    </SimplePageLayout>
  );
};
export default UserAccount;
