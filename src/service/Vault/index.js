import { doAuthPost } from "../BaseAPI";

export function createSecret(secret, token) {
  return doAuthPost("/v1/secrets", secret, token);
}
