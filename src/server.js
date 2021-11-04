require("dotenv").config();
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
const cookie_parser =require("cookie-parser");
const connect_flash=require("connect-flash");
const express_session=require("express-session");
const express_validator=require("express-validator");
let app = express();


//config url 
app.use(express.urlencoded({extended:false}));
//config cookie parser
app.use(cookie_parser("secret"));
//conect flash
app.use(connect_flash())
//config express session
app.use(express_session({
   secret:"secret",
   resave:true,
   saveUninitialized:false,
   cookie:{
      maxAge:1000*60 *60*24
   }
}));

//config view Engine
configViewEngine(app);

//init all web routes
app.use("/api",initWebRoutes)

let port = process.env.PORT || 8080;

app.listen(port, ()=>{
   console.log(`App is running at the port ${port}`);
});