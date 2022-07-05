import { doAuthPost } from "../BaseAPI.js";

export function changePassword(password, token) {
  return doAuthPost(
    "https://seng426group7frontendserver.azurewebsites.net/api/users/updatepassword",
    {password},
    token
  );
}
