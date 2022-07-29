import { doPost, doGet } from "../BaseAPI.js";

export function login(userInfo) {
  return doPost("http://localhost:8000/api/auth/login", userInfo);
}

// TODO add backend endpoint
export function signup(userInfo) {
  return doPost("http://localhost:8000/api/auth/signup", userInfo);
}


export function getCSRF(token){
	return doGet(`http://localhost:8000/api/auth/csrf`, token);
}
