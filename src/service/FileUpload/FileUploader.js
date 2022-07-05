import {doPostFile, doGet} from '../BaseAPI.js';

export function fileUploader(fileInfo, token){
	return doPostFile(`https://seng426group7frontendserver.azurewebsites.net/api/venus/upload`, fileInfo, token);
}

export function fetchFiles(token){
	return doGet(`https://seng426group7frontendserver.azurewebsites.net/api/venus/listfiles`, token)
}

export function fetchData(name, token){
	return doGet(`https://seng426group7frontendserver.azurewebsites.net/api/venus/fetchcontent?name=`+name, token)
}