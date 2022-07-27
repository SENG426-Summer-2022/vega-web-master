import express from 'express';
import {uploader, listFiles, fetchcontent} from '../services/FileHandlerAPI.js';
import fileUpload from 'express-fileupload';

let router = express();
router.disable("x-powered-by");

router.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));


router.post("/upload", (req,res) => {
	var formData = req.files;
    console.log("Entered into File uploader", formData)
    uploader("https://seng426group7backend.azurewebsites.net/venus/admin/handlefileupload", formData, req.headers)
    		.then(response => {
    			console.log("Response", response);
    			res.send(response);
    		})
    		.catch(error => {
    			console.log("ERROR:", error);
    			res.send(error);
    		})
})

router.get("/listfiles", (req, res) => {
	console.log("Entered list files");
	listFiles("https://seng426group7backend.azurewebsites.net/venus/files/listfiles", req.headers)
	.then(response => {
    	console.log("Response", response);
    	res.send(response);
    })
    .catch(error => {
    	console.log("ERROR:", error);
    	res.send(error);
    })
})

router.get("/fetchcontent", (req, res) => {
	console.log("Fetch Content")
	const {name} = req.query
	console.log(name)
	fetchcontent("https://seng426group7backend.azurewebsites.net/venus/files/fetch/"+name, req.headers)
	.then(response => {
    	console.log("Response", response);
    	res.send(response);
    })
    .catch(error => {
    	console.log("ERROR:", error);
    	res.send(error);
    })

})

export default router;