const initWebRoutes = require("./routes/web");
require("dotenv").config();
const express = require("express");
const cookie_parser =require("cookie-parser");
const connect_flash=require("connect-flash");
const passport = require('passport');
const path = require('path')
const configSession =require("./config/session")
const PORT = process.env.PORT || 8000;
let app = express();

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


app.listen(PORT, ()=>{
   console.log(`App is running at the port ${PORT}`);
});