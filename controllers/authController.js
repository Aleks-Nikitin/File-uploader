
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs"

const verifyLocal = async (username,password,done)=>{
    try {
      const user = await prisma.user.findUnique({
        where:{
            username:username
        }
      })//db.findByEmail(username)

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
         const match = await bcrypt.compare(password, user.password);
        if (!match) {
      
        return done(null, false, { message: "Incorrect password" })
        }

      return done(null, user);
    } catch(err) {
      return done(err);
    }
}
const deserialize = async (id, done)=>  {
  try {
    const user = await prisma.user.findUnique({
        where:{
            id:id
        }
    })//db.findUserById(id);
    done(null, user);
  } catch(err) {
    done(err);
  }
}

const serialize = async(user, done)=>  {
  done(null, user.id);
} 
const logout = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
const isAuth = async(req,res,next)=>{
    if(req.isAuthenticated()){
       return next()
    }
    res.status(401).render("401",{title:"Access denied"});
}
export default{
    verifyLocal,
    deserialize,
    serialize,
    logout,
    isAuth
}