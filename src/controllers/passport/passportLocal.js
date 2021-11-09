import passport from "passport";
import passportlocal from "passport-local";
import loginServices from "../../services/loginServices";

let LocalStrategy=passportlocal.Strategy;
//initialize user
let initPassportLocal=()=>{
    passport.use(new LocalStrategy({
        usernameField:"email",
        userpasswordField:"password",
        passReqToCallback:true,
    },async(req,email,password,done)=>{
        //findt the uer
        try{
            loginServices.findByEmail(email).then(async(user)=>{
               
                if(!user) return done(null,false,req.flash("errors","User not found!"));
                //mathc the password 
                
                let comare=await loginServices.comparepassword (password,user.password);
                //return the value
                if(comare===true){
                    try{
                    return done(null, user,null);
                    }catch(e){ console.log(e,"This is not work will");}
                }else{
                    console.log(comare);
                    return done(null,false,req.flash("errors","password not match"))
                }
            })
            .catch((error)=>{
                console.log(error.message);

                return done(null,false,req,flash("errors",error))
            })
        }catch(error){
            console.log(error.message);
            return done(null,false,req.flash("errors",error))
        }
    }))
}
passport.serializeUser((user,done)=>{
    return done(null,user.id)
});
passport.deserializeUser((id,done)=>{
    loginServices.findUserByid(id).then(user=>{
        console.log(user);
        done(null,user)
    }).catch(err=>{
        console.log(err);
        return done(err,null);
    })
})
module.exports=initPassportLocal ;