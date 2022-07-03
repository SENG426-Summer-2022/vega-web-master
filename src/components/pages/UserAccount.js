import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Stack } from "react-bootstrap";
import SimplePageLayout from "../templates/SimplePageLayout.js";
import { UserContext } from "../../auth/UserProvider.js";
import ChangePasswordFormWrapper from "../UI/organisms/ChangePasswordFormWrapper.js";
import AccountHeader from "../UI/organisms/AccountHeader.js";

const UserAccount = () => {
  const { user, logout } = useContext(UserContext);
  const history = useHistory();

  const logoutAndRouteChange = () => {
    logout();
    history.push("/");
  };

  return (
    <SimplePageLayout>
      <Stack gap={5} style={{ marginTop: "1rem" }}>
        <AccountHeader
          username={user.username}
          logoutOnClick={logoutAndRouteChange}
        />
        <ChangePasswordFormWrapper />
      </Stack>
    </SimplePageLayout>
  );
};
export default UserAccount;
