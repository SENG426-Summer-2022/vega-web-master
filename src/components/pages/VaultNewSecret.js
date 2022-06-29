import {useState, useContext} from 'react';
import {Container, Row, Col, Form, Button } from 'react-bootstrap';
import { UserContext } from '../../auth/UserProvider';
import { createSecret } from "../../service/Vault";

export const VaultNewSecret = () => {
  const { user } = useContext(UserContext);
  const [secretName, setSecretName] = useState("");
  const [secretContent, setSecretContent] = useState("");
  const [secretFile, setSecretFile] = useState("");

  const handleSecretNameChange = (event) => {
    setSecretName(event.target.value);
  };

  const handleSecretContentChange = (event) => {
    setSecretContent(event.target.value);
  };

  const handleSecretFileChange = (event) => {
    setSecretFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Secret Name: " + secretName);
    console.log("Secret Content: " + secretContent);
    console.log("Secret File: " + secretFile);

    // Create a new secret
    const newSecret = {
      name: secretName,
      content: secretContent,
      file: secretFile,
    };

    // use service to create a new secret
    const response = await createSecret(newSecret, user.jwt);
    console.log(response);
  };

  return (
    <Container>
      <Row style={{marginTop: "2rem", marginBottom: "2rem"}}>
        <Col className="col-md-12">
          <h1>Create Secret</h1>
        </Col>
      </Row>
      <Row>
        <Col className="col-md-12">
          <Form>
            <Form.Group>
              <Form.Label htmlFor="secretName">Secret Name</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                id="secretName"
                placeholder="Enter secret name"
              />
            </Form.Group>
            <Form.Group style={{marginTop: "1rem"}}>
              <Form.Label htmlFor="secretContent">Secret Content</Form.Label>
              <Form.Control
                as="textarea"
                className="form-control"
                id="secretContent"
                rows="3"
              ></Form.Control>
            </Form.Group>
            <Form.Group style={{marginTop: "1rem"}}>
              <Form.Label htmlFor="secretFile">Secret File</Form.Label>
              <Form.Control
                type="file"
                className="form-control-file"
                id="secretFile"
              />
            </Form.Group>
            <Button type="submit" className="btn-primary" style={{marginTop: "2rem"}}>
              Create Secret
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default VaultNewSecret;
