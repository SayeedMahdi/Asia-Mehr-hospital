

let checklogin=(req,res,next)=>{
    
    if(!req.isAuthenticated()){
       return res.redirect("/api/loginForm")
    }
    next();

}
let checklout=(req,res,next)=>{
    if(req.isAuthenticated()){
      return  res.redirect("/api/home")
    }
    next();
}
let logOut=(req,res,next)=>{
     
    req.session.destroy(function(error){
        return res.redirect("/api/loginForm")
    });
  
}
let checkadmin = (req,res,next) =>{
 if(!req.isAuthenticated()){
    return  res.redirect("/api/admin/signin")
 }   
 next()
}

module.exports={
    checklogin,
    checklout,
    logOut,
    checkadmin,
   
}
