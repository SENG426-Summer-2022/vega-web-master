import {login, signup} from '../services/LoginRequestAPI.js';

export function authModule(req, res) {
	if (req.method == 'POST') {
    	const userInfo = req.body;
    	console.log(userInfo);
        console.log("Authenticating User");
    	login(`${process.env.API_URL}/venus/authenticate`, userInfo)
    		.then(response => {
    			console.log("Response", response);
    			res.send(response);
    		})
    		.catch(error => {
    			console.log("ERROR:", error);
    			res.send(error);
    		})
    }
}

// TODO Get sign up hooked up to the spring backend
export function signupModule(req, res) {
	if (req.method == 'POST') {
    	const userInfo = req.body;
    	console.log(userInfo);
        console.log("Registering User");
        signup(`${process.env.API_URL}/venus/register`, userInfo)
            .then(response => {
                console.log("Response", response);
                res.send(response);
            })
            .catch(error => {
                console.log("ERROR:", error);
                res.send(error);
            })
    }
}

export default { authModule, signupModule };
