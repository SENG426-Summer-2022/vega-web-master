import { doAuthPost } from "./HTTPRequestAPI.js";

export function updatePassword(url, data, headers) {
  return doAuthPost(url, data, headers["authorization"]);
}
