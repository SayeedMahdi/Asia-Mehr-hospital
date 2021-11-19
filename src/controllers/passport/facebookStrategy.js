
const db=require("../../models")
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

let initfacebook=()=>{
passport.use(new FacebookStrategy({
    clientID: 424917292404333,
    clientSecret: "8aa86b58843ed930030c409fc26f929f",
    callbackURL: "http://localhost:8080/api/auth/facebook/secrets"
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
module.exports=initfacebook;