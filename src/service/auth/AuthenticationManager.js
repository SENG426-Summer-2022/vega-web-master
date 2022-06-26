import {doPost} from '../BaseAPI.js';

export function login(userInfo){
	console.log("In Auth", userInfo);
	return doPost("http://localhost:8000/api/login", userInfo);
}

// TODO add backend endpoint
export function signup(userInfo) {
	console.log("In Auth", userInfo);
	return doPost("http://localhost:8000/api/signup", userInfo);
}
