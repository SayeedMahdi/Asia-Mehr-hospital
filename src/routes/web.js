require('express-async-errors');
import express from "express";
import homepageController from "../controllers/homepageController";
import auth from "../validation/authvalidtion";
import initPassportLocal from "../controllers/passport/passportLocal"
import passport from "passport";
import authcontroler, { checklogin, checklout } from "../controllers/authcontrler";
import initfacebook from "../controllers/passport/facebookStrategy"
import initgoogleauth from "../controllers/passport/googleStrategy"
import upload from "../middleware/imgecontroler"
require("express")
/*
init all web routes
 */
//init pass port
initPassportLocal();
initfacebook();
initgoogleauth();
const  router = express.Router();


router.get("/signUp", homepageController.signupform)
router.post("/login",passport.authenticate("local-user",{

    successRedirect:"/api/home",
    failureRedirect:"/api/loginForm",
    successFlash:true,
    failureFlash:true,
   
}));
router.get("/loginForm",authcontroler.checklout , homepageController.loginform);
router.get("/home",homepageController.getHomepage);
//create user
router.post("/createUser",upload.single('image'),auth.vladition,homepageController.createUser);
//create doctor
router.post("/DoctorCreate",upload.single('image'),homepageController.createDoctor);
router.post("/logout",authcontroler.logOut);
router.get("/admin/signin",homepageController.adminlogin);
router.get("/auth/facebook", passport.authenticate("facebook"));
router.get("/admin",authcontroler.checkadmin,homepageController.adminpage);
router.post("/admin/signin",passport.authenticate("local-admin",{
    
    successRedirect:"/api/admin",
    failureRedirect:"/api/admin/signin",
    successFlash:true,
    failureFlash:true,
    
}));
//login with face book call back
router.get('/auth/facebook/secrets',
  passport.authenticate('facebook', { failureRedirect: '/admin/signin' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/admin');
  });
//google
router.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));

  router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/api/admin/signin'  }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/api/admin');
  });

  //all users in system
  router.get("/allusers",authcontroler.checkadmin,homepageController.allusers);
  //Doctors get page
  router.get("/doctors",authcontroler.checkadmin,homepageController.alldoctors);
  //get Rigister Doctor
  router.get("/DoctorProfile",homepageController.getDoctorform)
module.exports = router;
