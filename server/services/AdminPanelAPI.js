import { doAuthPost, doGet } from "./HTTPRequestAPI.js";

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

export function updateUser(data, headers) {
  return doAuthPost("http://localhost:8080/venus/admin/changerole", data, headers);
}
