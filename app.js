import express from "express"
const app = express();
import path from "node:path"
const port = 3000;
import userRouter from "./routes/userRouter.js"
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use("/",userRouter);

app.listen(port,'localhost',(err)=>{
    if(err){
        throw new Error;
    }
    console.log("server started");
})
