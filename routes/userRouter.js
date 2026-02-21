import {Router} from "express";
const userRouter = Router();
import userController from "../controllers/userController";

userRouter.get("/",userController.getIndexPage);
userRouter.get("/sign-up",userController.getSignupForm);
userRouter.post("/sign-up",userController.postUser);
export default userController;