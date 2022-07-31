import { doPost, doGet } from "../BaseAPI.js";

export function login(userInfo) {
  return doPost("https://seng426group7frontendserver.azurewebsites.net/api/auth/login", userInfo);
}

// TODO add backend endpoint
export function signup(userInfo) {
  return doPost("https://seng426group7frontendserver.azurewebsites.net/api/auth/signup", userInfo);
}


export function getCSRF(token){
	return doGet(`https://seng426group7frontendserver.azurewebsites.net/api/auth/csrf`, token);
}
