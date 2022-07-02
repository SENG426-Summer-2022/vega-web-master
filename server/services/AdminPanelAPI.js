import {doPostFile, doGet} from './HTTPRequestAPI.js';

export function fetchusers(url, headers){
	console.log(headers);
	return doGet(url, headers['authorization'])
}

export function enableAccount(url, headers){
	console.log(headers);
	console.log(url);
	return doGet(url, headers['authorization'])
}

export function changeRole(url,headers){
	console.log(url);
	return doGet(url, headers['authorization'])
}

//New features:

export function deleteAccount(url,headers){
	console.log(headers);
	console.log(url);
	return doGet(url, headers['authorization'])

}

export function changeEmail(url,headers){
	console.log(headers);
	console.log(url);
	return doGet(url, headers['authorization'])
	
}

export function changeUsername(url,headers){
	console.log(headers);
	console.log(url);
	return doGet(url, headers['authorization'])
	
}