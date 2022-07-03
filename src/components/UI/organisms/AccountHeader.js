import { Button, Stack } from "react-bootstrap";

export const AccountHeader = (props) => (
  <Stack direction="horizontal">
    <p>Hello, {props.username}</p>
    <Button
      onClick={props.logoutOnClick}
      size="sm"
      style={{ maxWidth: "100px" }}
      variant="danger"
      className="ms-auto"
    >
      Sign Out
    </Button>
  </Stack>
);

export default AccountHeader;
