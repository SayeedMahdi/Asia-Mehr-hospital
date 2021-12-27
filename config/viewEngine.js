const express =require( "express");

/*
config view engine for nodejs app
 */

let configViewEngine = (app) => {
    app.use(express.static("./public"));
    app.set("view engine", "ejs");
    app.set("views","./views");
};

module.exports = configViewEngine;