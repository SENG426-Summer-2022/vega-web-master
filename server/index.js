import contact from "./controller/ContactController.js";
import express from "express";
import { config } from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import compression from "compression";
import xss from "xss-clean";
import helmet from "helmet";

import authController from "./controller/AuthController.js";
import fileUploader from "./controller/FileUploadController.js";
import adminPanel from "./controller/AdminPanelController.js";
import users from "./routes/Users.js";

import rateLimiterMiddleware from "./middleware/rateLimiter.js";

const app = express();
const port = 8000;
const env = config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(compression());
app.disable("x-powered-by");
app.use(xss());
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "default-src": ["'self'"],
      "connect-src": ["'self'", "'unsafe-inline'"],
      "img-src": ["'self'", "data:"],
      "style-src-elem": ["'self'", "data:"],
      "script-src": ["'unsafe-inline'", "'self'"],
      "object-src": ["'self'"],
      "frame-ancestors": ["'self'"],
      blockAllMixedContent: [],
    },
  })
);
app.use(rateLimiterMiddleware);

if (process.env.NODE_ENV === "development") {
  var corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
} else {
  var corsOptions = {
    origin: "https://seng426group7frontend.azurewebsites.net",
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
}

app.set("env", process.env.NODE_ENV);

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.use("/api/contact", contact);
app.use("/api/auth", authController);
// TODO determin how this should be connected
app.use("/api/venus", fileUploader);
app.use("/api/venus/admin", adminPanel);
app.use("/api/users", users);

app.listen(port, () => {
  console.log(env.parsed.API_URL);
  console.log(`Example app listening on port ${port}!`);
});
