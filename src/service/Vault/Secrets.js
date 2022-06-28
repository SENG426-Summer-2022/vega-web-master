import { doGet, doAuthPost } from "../BaseAPI";

export function getSecrets(token) {
  return doGet(`http://localhost:8000/api/users/secrets`, token);
}

export function viewSecret(token, secretId) {
  return doGet(`http://localhost:8000/api/users/secrets/${secretId}`, token);
}

export function modifySecret(token, secretId, secret) {
  return doAuthPost(
    `http://localhost:8000/api/users/secrets/${secretId}`,
    secret,
    token
  );
}

export function deleteSecret(token, secretId) {
  return doAuthPost(
    `http://localhost:8000/api/users/secrets/${secretId}/delete`,
    null,
    token
  );
}

export function shareSecret(token, secretId, email) {
  return doAuthPost(
    `http://localhost:8000/api/users/secrets/${secretId}/share`,
    { email },
    token
  );
}
