import { doAuthPost } from "../BaseAPI.js";

export function changePassword(newPassword, token) {
  return doAuthPost("http://localhost:8000/api/changepassword", newPassword, token);
}
