import {Router} from "express";
const userRouter = Router();
import userController from "../controllers/userController.js";
import authController from "../controllers/authController.js";

userRouter.get("/",userController.getIndexPage);
userRouter.get("/sign-up",userController.getSignupForm);
userRouter.post("/sign-up",userController.postUser);
userRouter.get("/log-in",userController.getLoginForm);


userRouter.get("/log-out",authController.logout);

export default userRouter;