import { doPost } from "../BaseAPI";

export function sendMessage(name, email, message) {
  return doPost(`https://seng426group7frontendserver.azurewebsites.net/api/contact`, {
    name,
    email,
    message,
  });
}
