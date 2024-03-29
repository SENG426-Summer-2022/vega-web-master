import { doAuthGet, doGet } from "./HTTPRequestAPI.js";

export function fetchusers(url, headers) {
  return doGet(url, headers["authorization"]);
}

export function enableAccount(url, headers) {
  return doGet(url, headers["authorization"]);
}

export function changeRole(url, headers) {
  return doGet(url, headers["authorization"]);
}

//New features:

export function deleteAccount(url, headers) {
  return doGet(url, headers["authorization"]);
}

export function changeEmail(url, headers) {
  return doGet(url, headers["authorization"]);
}

export function changeUsername(url, headers) {
  return doGet(url, headers["authorization"]);
}

export function updateUser(
  { username, newusername, newFirstname, newLastname },
  headers
) {
  return doAuthGet(
    `https://seng426group7backend.azurewebsites.net/venus/admin/updateuser?username=${username}&newusername=${newusername}&newFirstname=${newFirstname}&newLastname=${newLastname}`,
    null,
    headers["authorization"]
  );
}
