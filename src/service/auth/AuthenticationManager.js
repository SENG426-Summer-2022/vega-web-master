import { doPost } from "../BaseAPI.js";


export function login(userInfo) {
  return doPost(`${process.env.REACT_APP_SERVER_URL}/api/login`, userInfo);
}

// TODO add backend endpoint
export function signup(userInfo) {
  return doPost(`${process.env.REACT_APP_SERVER_URL}/api/signup`, userInfo);
}
