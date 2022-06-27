import { useContext, useEffect, useState } from "react";
import { Container, Col, DropdownButton, Dropdown, Row } from "react-bootstrap";
import SimplePageLayout from "../templates/SimplePageLayout.js";
import { UserContext } from "../../auth/UserProvider.js";

export const Vault = () => {
  const { user } = useContext(UserContext);
  const [secrets, setSecrets] = useState([
    { name: "Secret 1", id: 1 },
    { name: "Secret 2", id: 2 },
    { name: "Secret 3", id: 3 },
  ]);

  useEffect(() => {
    const getUserSecrets = async () => {
      const response = await fetch(
        `http://localhost:8000/api/v1/users/${user.username}/secrets`,
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      );
      if (response.ok) {
        const secrets = await response.json();
        setSecrets(secrets);
      } else {
        console.log("Error getting secrets");
      }
    };
    getUserSecrets();
  }, [user.jwt, user.username]);

  const actionsDropdown = (secret) => (
    <DropdownButton
      id="dropdown-basic-button"
      title="Actions"
      style={{ maxWidth: "100px" }}
    >
      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    </DropdownButton>
  );

  const secretRow = (secret) => (
    <Row
      key={`secret-${secret.id}`}
      style={{
        marginTop: "1rem",
        padding: "0.5rem",
        backgroundColor: "#F5F5F5",
        borderRadius: "0.5rem",
      }}
    >
      <Col>
        <p>{secret.name}</p>
      </Col>
      <Col>{actionsDropdown(secret)}</Col>
    </Row>
  );

  return (
    <SimplePageLayout>
      <Container>{secrets.map((secret) => secretRow(secret))}</Container>
    </SimplePageLayout>
  );
};

export default Vault;
