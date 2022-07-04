import {doGet} from '../BaseAPI.js';

export function fetchuser(token){
	return doGet(`${process.env.REACT_APP_SERVER_URL}/api/venus/admin/getusers`, token)
}

export function enableAccount(username,token){
	return doGet(`${process.env.REACT_APP_SERVER_URL}/api/venus/admin/enableuser?enable=true&username=`+username, token)	
}

export function disableAccount(username,token){
	return doGet(`${process.env.REACT_APP_SERVER_URL}/api/venus/admin/enableuser?enable=false&username=`+username, token)	
}

export function changeAccountRole(username, role, token){
	return doGet(`${process.env.REACT_APP_SERVER_URL}/api/venus/admin/changerole?username=`+username+"&role="+role, token)
}

export function deleteAccount(username, token){
	console.log("In AdminPAnel: Deleting user" + username)
	return doGet("http://localhost:8000/api/venus/admin/deleteuser?username="+username, token)
}

export function updateAccountEmail(username, newEmail, token){
	return doGet("http://localhost:8000/api/venus/admin/changeemail?username="+username+"&newemail="+newEmail, token)
}

export function updateAccountusername(username, newUserFirstname, newUserLastname,token){
	//console.log("In AdminPAnel: Changing user name to" + newUserFirstname + " " + newUserLastname )
	return doGet("http://localhost:8000/api/venus/admin/changeusername?username="+username+"&newfirstname="+newUserFirstname+"&newlastname="+newUserLastname, token)
}
