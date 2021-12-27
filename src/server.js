const initWebRoutes = require("./routes/web");
const  configViewEngine =require("./config/viewEngine");
require("dotenv").config();
const express = require("express");
const cookie_parser =require("cookie-parser");
const connect_flash=require("connect-flash");

const configSession =require("./config/session")
const passport = require("passport");

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

let port = process.env.PORT || 8000;

app.listen(port, ()=>{
   console.log(`App is running at the port ${port}`);
});