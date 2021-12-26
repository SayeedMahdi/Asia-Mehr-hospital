require("dotenv").config();
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
const cookie_parser =require("cookie-parser");
const connect_flash=require("connect-flash");
const express_session=require("express-session");
const configSession =require("./config/session")
const PORT = process.env.PORT || 8000;
import passport from "passport";

let app = express();


//config url 
app.use(express.urlencoded({extended:false}));
//config cookie parser
app.use(cookie_parser("secret"));
//conect flash
app.use(connect_flash())
//config express session
configSession (app);


app.use(passport.initialize());
app.use(passport.session());
//config view Engine
configViewEngine(app);

//init all web routes
app.use("/api",initWebRoutes)


app.listen(PORT, ()=>{
   console.log(`App is running at the port ${port}`);
});