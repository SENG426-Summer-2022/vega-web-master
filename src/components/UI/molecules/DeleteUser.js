import { useState } from "react";
import { Button } from "react-bootstrap";

const DeleteUserButton = (props) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (showConfirmation) {
    return (
      <div>
        <p>Are you sure you want to delete this user?</p>
        <div>
          <Button variant="danger" onClick={() => setShowConfirmation(false)}>
            Cancel
          </Button>
        </div>
        <div>
          <Button variant="success" onClick={props.onClick}>
            Confirm
          </Button>
        </div>
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
