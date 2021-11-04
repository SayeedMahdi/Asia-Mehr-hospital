const flash = require('connect-flash');
const newuser=require("../services/userServices")
exports.getHomepage = (req, res) =>{
    return res.render("homepage.ejs");
};

exports.signupform = (req, res)=>{
    return res.render("signUp.ejs");
}
exports.createUser= async(req,res)=>{
    try{
    const user=req.body; 
    const message =await newuser.createuser(user);
    console.log(message);
    return res.redirect("/api/home");
    }catch(e){
        req.flash("errors",e)
       return  res.redirect("/api/RegisterForm")
    }
}
exports.registerform=async(req,res)=>{
    res.render("auth/rigister",{
        errots:req.flash("errors")
    });
}
exports.loginform=async(req,res)=>{
    res.render("auth/login");
}
