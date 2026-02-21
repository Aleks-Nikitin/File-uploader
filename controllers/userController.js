import {matchedData,validationResult,body} from "express-validator";
import bcrypt from "bcryptjs";
const lengthErr= "length must be more than 1";
const emailErr= "Not a valid email";
const passwordErr="Minimum length: 8 characters Minimum of 1 lowercase character ,Minimum of 1 uppercase character,Minimum of 1 number,Minimum of 1 symbol "
const validateUser=[
    body("firstname").trim()
    .isLength({min:1}).withMessage(`first name err:${lengthErr}`),
    body("lastname").trim()
    .isLength({min:1}).withMessage(`last name err:${lengthErr}`),
    body("username").trim()
    .isEmail().withMessage(`ERROR:${emailErr}`),
    body("password").trim()
    .isStrongPassword().withMessage(`Password err ${passwordErr}`),
    body("confpassword").trim()
    .custom((value,{req})=>{
        return value ==req.body.password;
    }).withMessage("confirm password doesnt match"),
   
]
async function getIndexPage(req,res){
    res.render("index",{title:"Index page welcome"});
}
async function getSignupForm(req,res){
    res.render("signupForm",{title:"Sign Up"});
}
const postUser =[validateUser,async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.render("signupForm",{title:"Sign Up",user:req.body,errors:errors.array()})
    }
    const {firstname,lastname,password,username}=matchedData(req);
    const hashedPassword = await bcrypt.hash(password,10)
    res.send("success")
    // post user to database
}]
export default{
    getIndexPage,
    getSignupForm,
    postUser
}