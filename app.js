import express from "express"
import passport from "passport";
import session from "express-session";
import {prisma} from "./lib/prisma.js"
import { Strategy as LocalStrategy } from 'passport-local';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import authController from "./controllers/authController.js";

const app = express();
import path from "node:path"
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = 3000;
import userRouter from "./routes/userRouter.js"
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static("public"));
app.use(session({
    saveUninitialized:false,
       store: new PrismaSessionStore(
            prisma,
            {
        checkPeriod: 2 * 60 * 1000,  //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
            }
        ),
    secret:"secret something",
    resave:false,
    cookie:{maxAge:30 * 24 * 60 * 60 * 1000}

}))
app.use(passport.session());
 
passport.use(
  new LocalStrategy(authController.verifyLocal));
passport.serializeUser(authController.serialize);
passport.deserializeUser(authController.deserialize);
app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);

app.use("/",userRouter);

app.listen(port,'localhost',(err)=>{
    if(err){
        throw new Error;
    }
    console.log("server started");
})
