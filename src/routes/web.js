import express from "express";
import homepageController from "../controllers/homepageController";
import auth from "../validation/authvalidtion";
import initPassportLocal from "../controllers/passport/passportLocal"
import passport from "passport";
import authcontroler, { checklout } from "../controllers/authcontrler"
/*
init all web routes
 */
//init pass port
initPassportLocal();
 

const  router = express.Router();



router.post("/login",passport.authenticate("local",{

    successRedirect:"/api/home",
    failureRedirect:"/api/loginForm",
    successFlash:true,
    failureFlash:true,
   
}));
router.get("/loginForm",authcontroler.checklout , homepageController.loginform);
router.get("/home",checklout,homepageController.getHomepage);
router.get("/RegisterForm" , homepageController.registerform);
router.post("/createUser",auth.vladition,homepageController.createUser);

module.exports = router;
