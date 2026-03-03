import {Router} from "express";
const userRouter = Router();
import userController from "../controllers/userController.js";
import authController from "../controllers/authController.js";
import multer, { memoryStorage } from "multer";
const upload = multer({storage:memoryStorage(),
    limits:{
        fileSize: 1024*1024*4
    }
});
userRouter.get("/",userController.getIndexPage);
userRouter.get("/sign-up",userController.getSignupForm);
userRouter.post("/sign-up",userController.postUser);
userRouter.get("/log-in",userController.getLoginForm);
userRouter.get("/upload",authController.isAuth,userController.getUploadForm);
userRouter.post("/upload",authController.isAuth,upload.single('file'), userController.postFile);
userRouter.get("/log-out",authController.logout);
userRouter.get("/folder",authController.isAuth,userController.getFolder);
userRouter.post("/folder",authController.isAuth,userController.postFolder);
userRouter.post("/folder/update",authController.isAuth,userController.updateFolder);
userRouter.get("/folder/delete",authController.isAuth,userController.deleteFolder)
userRouter.get("/file",authController.isAuth,userController.getFilePage)
export default userRouter;