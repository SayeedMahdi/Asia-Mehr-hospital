const passport =require( "passport");
const passportlocal =require( "passport-local");
const loginServices =require( "../../services/loginServices");

let LocalStrategy=passportlocal.Strategy;
//initialize user
let initPassportLocal=()=>{
    passport.use("local-user",new LocalStrategy({
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
                    }catch(e){ }
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
    passport.use("local-admin",new LocalStrategy({
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
                
                if(comare===true ){
                    try{
                        if( user.role_id===1){
                    return done(null, user,null);
                        }else {
                            
                        return done(null,false,req.flash("errors","You are not allow to access This page"));
                        }
                    }catch(e){ }
                }else{
                   
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
passport.deserializeUser(async(id,done)=>{
   await  loginServices.findUserByid(id).then(user=>{
        console.log(user);
        done(null,user)
    }).catch(err=>{
        console.log(err);
        return done(err,null);
    })
})
module.exports=initPassportLocal ;