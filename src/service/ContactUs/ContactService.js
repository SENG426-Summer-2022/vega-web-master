import { doPost } from "../BaseAPI";

export function sendMessage(name, email, message) {
  return doPost(`http://localhost:8000/api/contact`, {
    name,
    email,
    message,
  });
}
