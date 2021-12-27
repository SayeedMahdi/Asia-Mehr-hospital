const db = require("../models") ;
const { validationResult } = require("express-validator");
const newuser = require("../services/userServices");
const newDoctor = require("../services/doctorservices")
const authlog=require("../services/loginServices");
//home page api
exports.getHomepage = async(req, res) => {
    const Doctors =await db.Doctors.findAll();
    return res.render("homepage",{ "Doctors": Doctors });
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
        address:req.body.address
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
    const doctors =await db.Doctors.findAll();
    //all Doctors select from this
    res.render ("admin/contact",{"doctors":doctors});
}
 //all users
 exports.allusers=async (req, res) =>{
     const user =await db.User.findAll();
  
    res.render ("admin/allusers",{ "users": user });
}
exports.getDoctorform = async (req,res )=>{
    
    res.render("admin/Formsubmit", {
        errors: req.flash("errors")
    
    });
}
//creat doctort
exports.createDoctor = async (req,res) =>{

        //back to form elements
      
        
        //cheack validtion
        let arrresult = [];
        let validerrrors = validationResult(req);
        if (!validerrrors.isEmpty()) {
            let error = Object.values(validerrrors.mapped());
            error.forEach((item) => {
    
                arrresult.push(item.msg);
    
            });
            req.flash("errors", arrresult);
            return res.render("admin/Formsubmit", {  errors: req.flash("errors")});
        }
        try {
            const Doctor = req.body;
            const path=req.file.filename;
            const message = await newDoctor.addDoctor(Doctor,path);
            console.log(message);
            return res.redirect("/api/admin");
        } catch (e) {
            req.flash("errors", e)
            return res.render("admin/Formsubmit", {   errors: req.flash("errors") })
        }
}