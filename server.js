const initWebRoutes = require("./routes/web");
require("dotenv").config();
const express = require("express");
const cookie_parser =require("cookie-parser");
const connect_flash=require("connect-flash");
const path = require('path')
const configSession =require("./config/session")
const passport = require("passport");

let app = express();

app.use('/', express.static('public'))
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views')); 
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

//init all web routes
app.use("/api",initWebRoutes)

let port = process.env.PORT || 8000;

app.listen(port, ()=>{
   console.log(`App is running at the port ${port}`);
});