import { login, signup } from "../services/LoginRequestAPI.js";
import express from "express";

let router = express();
router.disable("x-powered-by");

router.post("/login", (req, res) => {
  const userInfo = req.body;
  console.log(userInfo);
  console.log("Authenticating User");
  login("http://localhost:8080/venus/authenticate", userInfo)
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
  signup("http://localhost:8080/venus/register", userInfo)
    .then((response) => {
      console.log("Response", response);
      res.send(response);
    })
    .catch((error) => {
      console.log("ERROR:", error);
      res.send(error);
    });
});

export default router;
