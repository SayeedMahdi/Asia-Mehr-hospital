import db from "../models"
const bcrypt=require("bcrypt");
let findByEmail = (emailIninput) => {
    console.log(emailIninput);
    return new Promise(async (resole, reject) => {
        try {
            let user = db.User.findOne({
                where: {
                    email: emailIninput
                }
            })
            if (!user) {
                reject(`We can Not find any user with this email: ${emailIninput}`)
            }
          
            resole(user);
        } catch (error) {
            console.log(error.message)
            reject(error)
        }
    })
}
let comparepassword = (loginPass,userpass) => {
    let isMatch=bcrypt.compare(loginPass, userpass);
    
    return isMatch;
}
let findUserByid = (userid) =>{
   return new Promise(async (resole,reject)=>{
       try{
        let user=db.User.findOne({
            where:{id:userid}
        });
        if(!user) reject("User with that id was not found.");
     
        return resole(user);
    }catch(error){
        console.log(error);
        reject(error)
    }
    })
}
module.exports={
    findByEmail,
    comparepassword,
     findUserByid
}