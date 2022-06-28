import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import SecretRow from "../molecules/VaultSecretRow.js";

import { UserContext } from "../../../auth/UserProvider.js";
import VaultHeader from "../molecules/VaultHeader.js";
import { getSecrets } from "../../../service/Vault/Secrets.js";

export const Vault = () => {
  const { user } = useContext(UserContext);
  const [secrets, setSecrets] = useState([
    { name: "Secret key for webserver", date: new Date(), id: 1 },
    { name: "Mainframe password", date: new Date(), id: 2 },
    { name: "Krusty Krab Secret Formula", date: new Date(), id: 3 },
  ]);

  useEffect(() => {
    const getUserSecrets = async () => {
      const response = await getSecrets(user.jwt);

      if (response.ok) {
        const secrets = await response.json();
        setSecrets(secrets);
      } else {
        console.log("Error getting secrets");
      }
    };
    getUserSecrets();
  }, [user.jwt, user.username]);

  return (
    <Container style={{ marginTop: "2rem" }}>
      <VaultHeader />
      {secrets.map((secret) => (
        <SecretRow secret={secret} key={`secret-${secret.id}`} />
      ))}
    </Container>
  );
};

export default Vault;