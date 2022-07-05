import express from "express";
import UserController from "../controller/UsersController.js";

let router = express();
router.disable("x-powered-by");

router.post("/updatepassword", UserController.changePassword);

export default router;
