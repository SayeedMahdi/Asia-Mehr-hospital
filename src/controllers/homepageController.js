const { validationResult } = require("express-validator");
const newuser = require("../services/userServices");
const authlog=require("../services/loginServices");
//home page api
exports.getHomepage = (req, res) => {
    return res.render("homepage.ejs");
};
//sign up form
exports.signupform = (req, res) => {
    return res.render("signUp.ejs");
}
//Rigister 
exports.createUser = async (req, res) => {
    //back to form elements
    let form = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
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
        return res.render("auth/rigister", {  errors: req.flash("errors"), form: form });
    }
    try {
        const user = req.body;
        const message = await newuser.createuser(user);
        console.log(message);
        return res.redirect("/api/home");
    } catch (e) {
        req.flash("errors", e)
        return res.render("auth/rigister", {   errors: req.flash("errors"),
            form: form })
    }
}
exports.registerform = async (req, res) => {
    let form = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    }
    res.render("auth/rigister", {
        errors: req.flash("errors"),
        form: form

    });
}
//login form 
exports.loginform = async (req, res) => {
    res.render("auth/login",{errors: req.flash("errors")});
}
