let checklogin=(req,res,next)=>{
    
    if(!req.isAuthenticate()){
       return res.render("/api/login")
    }
    next();

}
let checklout=(req,res,next)=>{
    if(req.isAuthenticate()){
      return  res.render("/")
    }
    next();
}
let logOut=(req,res,next)=>{
     
    req.session.destroy(function(error){
        return res.render("/api/login")
    });

}
module.exports={
    checklogin,
    checklout,
    logOut
}