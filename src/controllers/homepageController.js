import db from "../models"
const { validationResult } = require("express-validator");
const newuser = require("../services/userServices");
const authlog=require("../services/loginServices");
//home page api
exports.getHomepage = (req, res) => {
    return res.render("homepage.ejs");
};
//sign up form
exports.signupform = (req, res) => {
    return res.render("signUp.ejs",{errors: req.flash("errors")});
}
//Rigister 
exports.
createUser = async (req, res) => {
    //back to form elements
    let form = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        image1:req.body.image1
    }
    
    //cheack validtion
    let arrresult = [];
    let validerrrors = validationResult(req);
    if (!validerrrors.isEmpty()) {
        let error = Object.values(validerrrors.mapped());
        error.forEach((item) => {

            arrresult.push(item.msg);

        });
        req.flash("errors", arrresult);
        return res.render("signUp", {  errors: req.flash("errors"), form: form });
    }
    try {
        const user = req.body;
        const path=req.file.filename;
        const message = await newuser.createuser(user,path);
        console.log(message);
        return res.redirect("/api/home");
    } catch (e) {
        req.flash("errors", e)
        return res.render("signUp", {   errors: req.flash("errors"),
            form: form })
    }
}
exports.registerform = async (req, res) => {
    let form = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    }
    res.render("signUp", {
        errors: req.flash("errors"),
        form: form

    });
}
//adminpage
exports.adminpage = async (req,res) => {
    res.render("admin/index");
}
//login form 
exports.loginform = async (req, res) => {
    res.render("auth/login",{errors: req.flash("errors")});
}
exports.adminlogin= async(req,res)=>{
   
    res.render("admin/signin",{errors :req.flash("errors")});
}
//Doctors get page
exports.alldoctors=async (req, res) =>{
    res.render ("admin/contact");
}
 //all users
 exports.allusers=async (req, res) =>{
     const user =await db.User.findAll();
    console.log(user.photo);
    res.render ("admin/allusers",{ "users": user });
}
exports.getDoctorform = async (req,res )=>{
    
    res.render("admin/DoctorProfile", {
        errors: req.flash("errors")
    
    });
}
//creat doctort
exports.createDoctor = async (req,res) =>{

}