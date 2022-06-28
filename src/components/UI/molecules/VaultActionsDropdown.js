import { Dropdown, DropdownButton } from "react-bootstrap";

export const ActionsDropdown = (props) => {
  const { handleDelete, handleView, handleShare } = props;

  return (
    <>
      <DropdownButton
        id="dropdown-basic-button"
        title="Actions"
        style={{ maxWidth: "100px" }}
      >
        <Dropdown.Item onClick={handleView}>View</Dropdown.Item>
        <Dropdown.Item href="#/modify">Modify</Dropdown.Item>
        <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
        <Dropdown.Item onClick={handleShare}>Share</Dropdown.Item>
      </DropdownButton>
    </>
  );
};

export default ActionsDropdown;
