const passport=require("passport");
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const db=require("../../models")
let Googlepassportinit=()=>{
    passport.use(new GoogleStrategy({
        clientID: "500320248274-sqg812rmapssf6e1sjd7fpld7slfhbdo.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/api/google/callback"
      },
     async function(accessToken, refreshToken, profile, done) {
       
        const user = await db.User.findOne({
          where: {
            email: profile.emails[0].value
          },
        });
        done(null, user);
      
    
      }
    ));
    
    }
module.exports=Googlepassportinit;