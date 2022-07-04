import express from 'express';
import UserController from "../controller/UsersController.js";

let router = express();

router.post("/changepassword", UserController.changePassword);

export default router;