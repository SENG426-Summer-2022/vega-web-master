import { Row } from "react-bootstrap";
import ActionsDropdown from "./VaultActionsDropdown.js";

import CentredCol from "../atoms/CentredCol.js";

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const SecretRow = (props) => {
  const { id, name, date } = props.secret;

  return (
    <Row
      key={`secret-${id}`}
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
      <CentredCol lg="1" xs="1">
        <ActionsDropdown secret={props.secret} />
      </CentredCol>
    </Row>
  );
};

export default SecretRow;
