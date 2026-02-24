import {matchedData,validationResult,body} from "express-validator";
import { prisma } from "../lib/prisma.js";
import 'dotenv/config';
import bcrypt from "bcryptjs";
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.SUPABASE_URL,process.env.SUPABASE_KEY);

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
    if(req.user){
        const folders = await prisma.folder.findMany({
        where:{
            userId:req.user.id
        }
    })
    if(folders){
        return res.render("index",{title:"Index page welcome",user:req.user,folders:folders});
    }
    }
   
    res.render("index",{title:"Index page welcome",user:req.user});
}
async function getSignupForm(req,res){
    res.render("signupForm",{title:"Sign Up"});
}
async function getUploadForm(req,res) {
    if(req.user){
        const folders = await prisma.folder.findMany({
            where:{
                userId:req.user.id
            }
        })
        if(folders){
            return res.render("uploadForm",{title:"Upload Files",folders:folders})
        }
    }
    res.render("uploadForm",{title:"Upload Files"});
}
async function getLoginForm(req,res){
    res.render("loginForm",{title:"login Form"});
}
async function postFile(req,res){
    if(req.file){
        const file =req.file.buffer;
        const {folder}=req.body //folder id value
        const filePath=`${crypto.randomUUID()}-${Date.now()}`;
        const {errors}=await supabase.storage.from("files").upload(filePath,file);
        if(errors){
        return console.log("Errors uploading file to a supabase");
        }
        const {data}=supabase.storage.from("files").getPublicUrl(filePath);
        await prisma.file.create({
            data:{
                url:data.publicUrl,
                folderId: Number(folder)
            }
        })
    }
  

    res.redirect("/");
}
async function postFolder(req,res){
    const {id}=req.user;
    const {folderName}=req.body;
    await prisma.folder.create({
        data:{
            folderName:folderName,
            userId:id
        }
    })
    // db
    res.redirect("/")
}
async function updateFolder(req,res){
    const {id}=req.query;
    const {folderName}=req.body;
    await prisma.folder.update({
        where:{
            id:Number(id)
        },
        data:{
            folderName:folderName
        }
    })
    res.redirect("/");
}
async function deleteFolder(req,res){
    const {id}=req.query;
    await prisma.folder.delete({
        where:{
            id:Number(id)
        }
    })
    res.redirect("/")
}
const postUser =[validateUser,async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.render("signupForm",{title:"Sign Up",user:req.body,errors:errors.array()})
    }
    const {firstname,lastname,password,username}=matchedData(req);
    const hashedPassword = (await bcrypt.hash(password,10));
    await prisma.user.create({
        data:{
            firstname:firstname,
            lastname:lastname,
            password:hashedPassword,
            username:username
        }
    })
    res.redirect("/");
    
}]

export default{
    getIndexPage,
    getSignupForm,
    postUser,
    getLoginForm,
    getUploadForm,
    postFile,
    postFolder,
    updateFolder,
    deleteFolder
}