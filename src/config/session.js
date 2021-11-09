
const dotenv=require("dotenv");
dotenv.config({path: "../../dbconection.env"});

let Sequelize = require('sequelize');
let session = require('express-session');


// initalize sequelize with session store
let SequelizeStore = require('connect-session-sequelize')(session.Store);

let sequelize = new Sequelize(
    "Asia-mehr",
    "mahdi",
    "mahdi078",
    {
        host: process.env.host,
        dialect: "mysql",
        storage: "./session.mysql",
        logging: false,

        dialectOptions: {
            "dateStrings": true,
            "typeCast": true,
            "timezone": "+07:00"
        },
        timezone: "+07:00"
    }
    );

let sessionStore = new SequelizeStore({
    db: sequelize
});

let configSession = (app) => {
    app.use(session({
        key: "express.sid",
        secret: "secret",
        store: sessionStore,
        resave: true,
        saveUninitialized: false,
        cookie : { httpOnly: false, secure : false, maxAge : (24 * 60 * 60 * 1000)} // 1day
    }))
};

sessionStore.sync();

module.exports =      configSession

