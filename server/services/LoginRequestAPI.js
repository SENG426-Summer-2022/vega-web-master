import {doPost, doGet} from './HTTPRequestAPI.js';

export function login(url, data){
	console.log("In the server login");
	console.log(url);
	console.log(data);
	return doPost(url, data);
}

export function getCsrf(url, headers) {
	return doGet(url, headers["authorization"]);
}
export const signup = login
