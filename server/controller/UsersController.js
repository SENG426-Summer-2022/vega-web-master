import { updatePassword } from "../services/UserRequestAPI.js";

export function changePassword(req, res) {
  const { newPassword } = req.body;

  updatePassword(
    `http://localhost:8080/venus/updatepassword/?password=${newPassword}`,
    null,
    req.headers
  );
}

export default {
  changePassword,
};
