import { Dropdown, DropdownButton } from "react-bootstrap";

export const ActionsDropdown = (props) => {
  const { secret } = props;

  const handleDelete = () => {
    console.log("delete", secret.name);
  };

  const handleView = () => {
    console.log("view", secret.name);
  };

  const handleShare = () => {
    console.log("share", secret.name);
  };

  return (
    <DropdownButton
      id="dropdown-basic-button"
      title="Actions"
      style={{ maxWidth: "100px" }}
    >
      <Dropdown.Item onClick={() => handleView()}>View</Dropdown.Item>
      <Dropdown.Item href="#/modify">Modify</Dropdown.Item>
      <Dropdown.Item onClick={() => handleDelete()}>Delete</Dropdown.Item>
      <Dropdown.Item onClick={() => handleShare()}>Share</Dropdown.Item>
    </DropdownButton>
  );
};

export default ActionsDropdown;
