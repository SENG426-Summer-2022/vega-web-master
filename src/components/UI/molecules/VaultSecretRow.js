import { useState, useContext } from "react";
import { Row } from "react-bootstrap";

import ActionsDropdown from "./VaultActionsDropdown.js";
import CentredCol from "../atoms/CentredCol.js";
import {
  deleteSecret,
  shareSecret,
  viewSecret,
} from "../../../service/Vault/Secrets";
import { UserContext } from "../../../auth/UserProvider.js";

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const SecretRow = (props) => {
  const { id, name, date } = props.secret;
  const { user } = useContext(UserContext);
  const [secretValue, setSecretValue] = useState(null);

  const handleDelete = async () => {
    console.log("delete", name);
    const result = window.confirm(`Are you sure you want to delete ${name}?`);
    if (result) {
      console.log("delete confirmed");
      const response = await deleteSecret(user.jwt, id);
      if (response.ok) {
        alert("Delete successful");
      } else {
        alert("Delete failed");
      }
    }
  };

  const handleView = async () => {
    console.log("view", name);
    const response = await viewSecret(user.jwt, id);
    if (response.ok) {
      const secret = await response.json();
      setSecretValue(secret.value);
    } else {
      alert("Failed to get secret");
    }
  };

  const handleShare = async () => {
    console.log("share", name);
    const response = await shareSecret(user.jwt, id);
    if (response.ok) {
      alert("Share successful");
    } else {
      alert("Share failed");
    }
  };

  return (
    <>
      <Row
        style={{
          marginTop: "1rem",
          padding: "0.5rem",
          backgroundColor: "#F5F5F5",
          borderRadius: "0.5rem",
        }}
      >
        <CentredCol>
          <h5 style={{ margin: "0" }}>{name}</h5>
        </CentredCol>
        <CentredCol>
          <p style={{ margin: "0" }}>
            {date.toLocaleDateString(undefined, dateOptions)}
          </p>
        </CentredCol>
        <CentredCol />
        <CentredCol lg="1" xs="1">
          <ActionsDropdown
            secret={props.secret}
            handleView={handleView}
            handleDelete={handleDelete}
            handleShare={handleShare}
          />
        </CentredCol>
      </Row>
      {secretValue && { secretValue }}
    </>
  );
};

export default SecretRow;
