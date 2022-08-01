import { login, signup, getCsrf } from "../services/LoginRequestAPI.js";
import express from "express";

let router = express();
router.disable("x-powered-by");

router.post("/login", (req, res) => {
  const userInfo = req.body;
  console.log("Authenticating User");
  login("https://seng426group7backend.azurewebsites.net/venus/authenticate", userInfo)
    .then((response) => {
      console.log("Response", response);
      res.send(response);
    })
    .catch((error) => {
      console.log("ERROR:", error);
      res.send(error);
    });
});

// TODO Get sign up hooked up to the spring backend
router.post("/signup", (req, res) => {
  const userInfo = req.body;
  console.log(userInfo);
  console.log("Registering User");
  signup("https://seng426group7backend.azurewebsites.net/venus/register", userInfo)
    .then((response) => {
      console.log("Response", response);
      res.send(response);
    })
    .catch((error) => {
      console.log("ERROR:", error);
      res.send(error);
    });
});

router.get("/csrf", (req, res) => {
	console.log("CSRF")
	getCsrf("https://seng426group7backend.azurewebsites.net/venus/csrf", req.headers)
	.then(response => {
    	console.log("Response", response);
    	res.send(response);
    })
    .catch(error => {
    	console.log("ERROR:", error);
    	res.send(error);
    })

});

export default router;
