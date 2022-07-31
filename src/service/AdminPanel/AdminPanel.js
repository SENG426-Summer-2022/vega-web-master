import { doAuthPost, doGet } from "../BaseAPI.js";

export function fetchuser(token){
	return doGet(`https://seng426group7frontendserver.azurewebsites.net/api/venus/admin/getusers`, token)
}

export function enableAccount(username,token){
	return doGet(`https://seng426group7frontendserver.azurewebsites.net/api/venus/admin/enableuser?enable=true&username=`+username, token)	
}

export function disableAccount(username,token){
	return doGet(`https://seng426group7frontendserver.azurewebsites.net/api/venus/admin/enableuser?enable=false&username=`+username, token)	
}

export function changeAccountRole(username, role, token){
	return doGet(`https://seng426group7frontendserver.azurewebsites.net/api/venus/admin/changerole?username=`+username+"&role="+role, token)
}

export function deleteAccount(username, token) {
  console.log("In AdminPAnel: Deleting user" + username);
  return doGet(
    "https://seng426group7frontendserver.azurewebsites.net/api/venus/admin/deleteuser?username=" + username,
    token
  );
}

export function updateUser(data, token) {
  console.log("UpdateUser authpost frontend")
  return doAuthPost(
    "https://seng426group7frontendserver.azurewebsites.net/api/venus/admin/updateuser",
    data,
    token
  );
}

export function updateAccountEmail(username, newEmail, token) {
  return doGet(
    "https://seng426group7frontendserver.azurewebsites.net/api/venus/admin/changeemail?username=" +
      username +
      "&newemail=" +
      newEmail,
    token
  );
}

export function updateAccountusername(
  username,
  newUserFirstname,
  newUserLastname,
  token
) {
  return doGet(
    "https://seng426group7frontendserver.azurewebsites.net/api/venus/admin/changeusername?username=" +
      username +
      "&newfirstname=" +
      newUserFirstname +
      "&newlastname=" +
      newUserLastname,
    token
  );
}
