import { updatePassword } from "../services/UserRequestAPI.js";

export async function changePassword(req, res) {
  const { password } = req.body;

  try {
    const response = await updatePassword(
      `http://localhost:8080/venus/updatepassword/?password=${password}`,
      null,
      req.headers
    );

    res.send(response);
  } catch (e) {
    res.send(e);
  }
}

export default {
  changePassword,
};
