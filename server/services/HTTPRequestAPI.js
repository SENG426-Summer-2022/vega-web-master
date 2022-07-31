import FormData from 'form-data';
import fetch from 'node-fetch';
import Promise from 'promise';

const hostWhitelist = [ "localhost", 
                        "seng426group7frontend.azurewebsites.net", 
                        "seng426group7frontendserver.azurewebsites.net", 
                        "seng426group7backend.azurewebsites.net"
                      ];

function getHostname (url) {
  const nURL = new URL(url);
  return nURL.hostname;
}

export async function doPost(url, data) {
  console.log("In server doPost");
  console.log(url);
  console.log(data);
  if (hostWhitelist.includes(getHostname(url))) {
    const options = createRequestOptions("POST", data);
    console.log("Options:", options);
    
    const response = await fetch(url, options);
    return await handleResponse(response);
  } else {
    throw new Error("Host not allowed");
  }
}

export async function doAuthPost(url, data, token) {
  if (hostWhitelist.includes(getHostname(url))) {
    const csrfToken = await fetch(
      "http://localhost:8080/venus/csrf",
      createRequestOptions("GET", undefined, token)
    );
    const parsedCsrf = await handleResponse(csrfToken);

    const options = createRequestOptions("POST", data, token, parsedCsrf.token);
    const response = await fetch(url, options);

    return await handleResponse(response);
  } else {
    throw new Error("Host not allowed");
  }
}

export async function doAuthGet(url, data, token) {
  if (hostWhitelist.includes(getHostname(url))) {
    const csrfToken = await fetch(
      "http://localhost:8080/venus/csrf",
      createRequestOptions("GET", undefined, token)
    );
    const parsedCsrf = await handleResponse(csrfToken);

    const options = createRequestOptions("GET", data, token, parsedCsrf.token);
    const response = await fetch(url, options);
    return await handleResponse(response);
  } else {
    throw new Error("Host not allowed");
  }
}

export async function doGet(url, token) {
  if (hostWhitelist.includes(getHostname(url))) {
    const response = await fetch(
      url,
      createRequestOptions("GET", undefined, token)
    );
    return await handleResponse(response);
  } else {
    throw new Error("Host not allowed");
  }
}

export async function doPostFile(url, data, headers) {
  if (hostWhitelist.includes(getHostname(url))) {
    const response = await fetch(
      url,
      createRequestOptionsForFile("POST", data, headers)
    );
    return await handleResponse(response);
  } else {
    throw new Error("Host not allowed");
  }
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

function createRequestOptions(method, data, token, csrf) {
  var requestOptions = {
    method: method,
    dataType: "json",
    headers: {
      authorization: token,
      "content-type": "application/json",
    },
  };
  if (data) {
    requestOptions.body = JSON.stringify(data);
  }
  if (csrf) {
    requestOptions.headers["X-XSRF-TOKEN"] = csrf;
  }
  return requestOptions;
}

export async function handleResponse(response) {
  let result;

  console.log("RESPONSE: ", response);

  result = handleJSONResult(await response.text());

  if (response.ok) {
    return result;
  }
  
  // handle error
  console.warn("Response is not OK:", response.status);
  console.warn("Response body:", result);
  let message = response.statusText; // by default
  if (result && result.message) {
    message = result.message;
  } else if (result && result.description) {
    message = result.description;
  }
  return Promise.reject({
    code: response.status,
    message: message,
  });
}

export function handleJSONResult(result) {
  try {
    return JSON.parse(result);
  } catch (error) {
    console.info("Response is not a valid json. Processing it as a text.");
    return result;
  }
}
