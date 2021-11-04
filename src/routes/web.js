import express from "express";
import homepageController from "../controllers/homepageController";

/*
init all web routes
 */

const  router = express.Router();

router.get("/home",homepageController.getHomepage);
router.get("/signup", homepageController.signupform);
router.get("/loginForm" , homepageController.loginform);
router.get("/RegisterForm" , homepageController.registerform);
router.post("/createUser",homepageController.createUser);
module.exports = router;
