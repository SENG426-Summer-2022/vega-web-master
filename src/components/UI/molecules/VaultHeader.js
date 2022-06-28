import { Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import CentredCol from "../atoms/CentredCol.js";

export const VaultHeader = (props) => {
  const history = useHistory();

  return (
    <Row>
      <Col>
        <h1 style={{ marginBottom: "2rem" }}>Vault</h1>
      </Col>
      <CentredCol lg="2" xs="2">
        <Button
          onClick={() => {
            history.push("/vault/new");
          }}
          size="md"
          variant="success"
        >
          New Secret
        </Button>
      </CentredCol>
    </Row>
  );
};

export default VaultHeader;
