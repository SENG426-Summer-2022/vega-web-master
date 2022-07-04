import FormData from 'form-data';
import fetch from 'node-fetch';
import Promise from 'promise';

const API_URL = 'http://localhost:8080';

export async function doPost(url, data){
	const response = await fetch(url, createRequestOptions('POST', data));
	return await handleResponse(response);
}

export async function doAuthPost(url, data, headers){
  const response = await fetch(`${API_URL}${url}`, createRequestOptions('POST', data, headers));
  return await handleResponse(response);
}


export async function doGet(url, token){
  const response = await fetch(url, createRequestOptions('GET', undefined, token));
  return await handleResponse(response);
}

export async function doPostFile(url, data, headers){
  const response = await fetch(url, createRequestOptionsForFile('POST', data, headers));
  return await handleResponse(response);
}

function createRequestOptionsForFile(method, data, headers){
  const formData = new FormData();
  formData.append("file", data.file.data, data.file.name);
  var requestOptions = {
    method: method,
    headers: {
      authorization: headers.authorization,
    },
    body: formData
  }
  console.log(requestOptions)
  return requestOptions;
}

function  createRequestOptions(method, data, token){
  var requestOptions = {
    'method': method,
    'dataType': 'json',
    'headers': {
      'authorization': token,
      'content-type': 'application/json'
    }
  }
  if(data){
    requestOptions.body = JSON.stringify(data);
  }
  return requestOptions;
}

export async function handleResponse(response) {
  let result;
 
   result = handleJSONResult(await response.text());
  if (response.ok) {
    return result;
  }
  // handle error
  console.warn('Response is not OK:', response.status);
  console.warn('Response body:', result);
  let message = response.statusText; // by default
  if (result && result.message) {
    message = result.message;
  } else if (result && result.description) {
    message = result.description;
  }
  return Promise.reject({
    code: response.status,
    message: message
  });
}

export function handleJSONResult(result) {
  try {
    return JSON.parse(result);
  } catch (error) {
    console.info('Response is not a valid json. Processing it as a text.');
    return result;
  }
}