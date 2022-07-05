import {doPostFile, doGet} from '../BaseAPI.js';

export function fileUploader(fileInfo, token){
	var url = process.env.REACT_APP_SERVER_URL;
	return doPostFile(`${process.env.REACT_APP_SERVER_URL}/api/venus/upload`, fileInfo, token);
}

export function fetchFiles(token){
	var url = process.env.REACT_APP_SERVER_URL;
	return doGet(`${process.env.REACT_APP_SERVER_URL}/api/venus/listfiles`, token)
}

export function fetchData(name, token){
	return doGet(`${process.env.REACT_APP_SERVER_URL}/api/venus/fetchcontent?name=`+name, token)
}