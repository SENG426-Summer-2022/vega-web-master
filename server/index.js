import {auth, signup} from './auth/AuthenticationManager.js';
import fileUploader from './controller/FileUploadController.js';
import adminPanel from './controller/AdminPanelController.js'
import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 8000;
const env = config();

//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({limit: '50mb'}));

if (process.env.NODE_ENV === 'development') {
  var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  };
  app.use(cors(corsOptions));
}

app.get('/', (req, res) => {
  res.send('Hello World!')
});


app.use("/api/login", auth);
// TODO determin how this should be connected
app.use("/api/signup", signup);
app.use("/api/venus", fileUploader)
app.use("/api/venus/admin", adminPanel)

app.listen(port, () => {
  console.log(process.env.API_URL);
  console.log(`Example app listening on port ${port}!`)
});
