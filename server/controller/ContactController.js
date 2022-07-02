import express from 'express';
import bodyParser from 'body-parser';

let router = express();

router.use(bodyParser.json({'limit':'20mb'}));

router.post("/", (req,res) => {
    // unpack the form data from the request
    // name, email, message
    const {name, email, message} = req.body;

    // return a success response
    res.send({
        success: true,
        message: "Message sent successfully"
    });
});

export default router;