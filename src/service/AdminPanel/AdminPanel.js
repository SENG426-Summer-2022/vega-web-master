import {doPostFile, doGet} from '../BaseAPI.js';

export function fetchuser(token){
	return doGet("http://localhost:8000/api/venus/admin/getusers", token)
}

export function enableAccount(username,token){
	return doGet("http://localhost:8000/api/venus/admin/enableuser?enable=true&username="+username, token)	
}

export function changeAccountRole(username, role, token){
	return doGet("http://localhost:8000/api/venus/admin/changerole?username="+username+"&role="+role, token)
}

export function deleteAccount(username, token){
	return
}

export function updateAccountEmail(username, newEmail, token){
	return doGet("http://localhost:8000/api/venus/admin/changeemail?username="+username+"&newemail="+newEmail, token)
}

export function updateAccountusername(username, newUsername, token){
	return doGet("http://localhost:8000/api/venus/admin/changeusername?username="+username+"&newusername="+newUsername, token)
}