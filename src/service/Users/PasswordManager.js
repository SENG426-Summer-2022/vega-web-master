import { doAuthPost } from "../BaseAPI.js";

export function changePassword(password, token) {
  return doAuthPost(
    "http://localhost:8000/api/users/updatepassword",
    {password},
    token
  );
}
