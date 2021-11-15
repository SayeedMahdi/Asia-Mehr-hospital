import express from "express";
import homepageController from "../controllers/homepageController";
import auth from "../validation/authvalidtion";
import initPassportLocal from "../controllers/passport/passportLocal"
import passport from "passport";
import authcontroler, { checklogin, checklout } from "../controllers/authcontrler";
import initfacebook from "../controllers/passport/facebookStrategy"
/*
init all web routes
 */
//init pass port
initPassportLocal();
initfacebook();

const  router = express.Router();



router.post("/login",passport.authenticate("local-user",{

    successRedirect:"/api/home",
    failureRedirect:"/api/loginForm",
    successFlash:true,
    failureFlash:true,
   
}));
router.get("/loginForm",authcontroler.checklout , homepageController.loginform);
router.get("/home",authcontroler.checklogin ,homepageController.getHomepage);
router.get("/RegisterForm" , homepageController.registerform);
router.post("/createUser",auth.vladition,homepageController.createUser);
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


module.exports = router;
