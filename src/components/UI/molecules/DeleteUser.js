import { useState } from "react";
import { Button, Stack } from "react-bootstrap";

const DeleteUserButton = (props) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (showConfirmation) {
    return (
      <div>
        <p>Are you sure you want to delete this user?</p>
        <Stack direction="horizontal">
          <div style={{ marginRight: "2rem" }}>
            <Button variant="danger" onClick={() => setShowConfirmation(false)}>
              Cancel
            </Button>
          </div>
          <div>
            <Button variant="success" onClick={props.onClick}>
              Confirm
            </Button>
          </div>
        </Stack>
      </div>
    );
  }

  return (
    <div>
      <Button variant="danger" onClick={() => setShowConfirmation(true)}>
        Delete User
      </Button>
    </div>
  );
};

export default DeleteUserButton;
