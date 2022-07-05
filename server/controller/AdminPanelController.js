import bodyParser from "body-parser";
import express from "express";
import {
  fetchusers,
  enableAccount,
  changeRole,
  deleteAccount,
  updateUser
} from "../services/AdminPanelAPI.js";
import fileUpload from "express-fileupload";

let router = express();

//router.use(bodyParser.json({'limit':'20mb'}));

router.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

router.get("/getusers", (req, res) => {
	console.log("Entered list files");
	fetchusers(`${process.env.API_URL}/venus/admin/fetchusers`, req.headers)
	.then(response => {
    	console.log("Response", response);
    	res.send(response);
    })
    .catch(error => {
    	console.log("ERROR:", error);
    	res.send(error);
    })
})

router.get("/enableuser", (req, res) => {
	console.log("Request: Enable User");
	const {username} = req.query;
	const {enable} = req.query;
	enableAccount(`${process.env.API_URL}/venus/admin/enableuser?username=${username}&enable=${enable}`, req.headers)
	.then(response => {
    	console.log("Response", response);
    	res.send(response);
    })
    .catch(error => {
    	console.log("ERROR:", error);
    	res.send(error);
    })
})

router.get("/changerole", (req, res) => {
	console.log("Request: Change Role")
	const {username} = req.query;
	const {role} = req.query;
	changeRole(`${process.env.API_URL}/venus/admin/changerole?username=${username}&role=${role}`, req.headers)
	.then(response => {
		console.log("Response", response);
		res.send(response);
	})
	.catch(error => {
		console.log("ERROR:", error);
		res.send(error)
	})
})

//Adding new features

router.get("/deleteuser", (req, res) => {
	console.log("Request: Delete User")
	const {username} = req.query;
	deleteAccount(`https://seng426group7backend.azurewebsites.net/venus/admin/deleteuser?username=${username}`, req.headers)
	.then(response => {
		console.log("Response", response);
		res.send(response);
	})
	.catch(error => {
		console.log("ERROR:", error);
		res.send(error)
	})
})

router.get("/changeemail", (req, res) => {
	console.log("Request: Change Email")
	const {username} = req.query;
	const {newemail} = req.query;
	changeEmail(`https://seng426group7backend.azurewebsites.net/venus/admin/changeemail?username=${username}&email=${newemail}`, req.headers)
	.then(response => {
		console.log("Response", response);
		res.send(response);
	})
	.catch(error => {
		console.log("ERROR:", error);
		res.send(error)
	})
})

router.get("/changeusername", (req, res) => {
	console.log("Request: Change Username")
	const {username} = req.query;
	const {newUserFirstname} = req.query;
	const {newUserLastname} = req.query;
	changeUsername(`https://seng426group7backend.azurewebsites.net/venus/admin/changeusername?username=${username}&newuserfirstname=${newUserFirstname}&newuserlastname=${newUserLastname}`, req.headers)
	.then(response => {
		console.log("Response", response);
		res.send(response);
	})
	.catch(error => {
		console.log("ERROR:", error);
		res.send(error)
	})
})

router.post("/updateuser", async (req, res) => {
  const body = req.body;
  const response = await updateUser(body, req.headers);
  res.send(response);
});

export default router;