import { doAuthGet } from "./HTTPRequestAPI.js";

export function updatePassword(url, data, headers) {
  return doAuthGet(url, data, headers["authorization"]);
}
