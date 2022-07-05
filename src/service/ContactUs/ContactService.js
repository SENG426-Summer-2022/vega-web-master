import { doPost } from "../BaseAPI";

export function sendMessage(name, email, message) {
  return doPost(`${process.env.REACT_APP_SERVER_URL}/api/contact`, {
    name,
    email,
    message,
  });
}
