import contact from "./controller/ContactController.js";
import express from "express";
import { config } from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import authController from './controller/AuthController.js';
import fileUploader from './controller/FileUploadController.js';
import adminPanel from './controller/AdminPanelController.js';
import users from './routes/Users.js';

const app = express();
const port = 8000;
const env = config();

//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.disable("x-powered-by");

if (process.env.NODE_ENV === "development") {
  var corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
} else {
  console.log("here!!");
  var corsOptions = {
    origin: "https://seng426group7frontend.azurewebsites.net/",
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/contact", contact);
app.use("/api/auth", authController);
// TODO determin how this should be connected
app.use("/api/venus", fileUploader);
app.use("/api/venus/admin", adminPanel);
app.use("/api/users", users);


app.listen(port, () => {
  console.log(process.env.API_URL);
  console.log(`Example app listening on port ${port}!`);
});
