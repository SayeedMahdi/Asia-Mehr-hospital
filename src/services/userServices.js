const db = require("../models");
const bcrypt=require("bcrypt");
exports.createuser = async (newuser,imagepath) => {
    return new Promise(async (resolve, reject) => {
        try {
            //cheak email if exist 
            let isEamilExist =await CheakEmail(newuser);
            
            //resole if email exist 
            if (isEamilExist) {
             reject(`The email: ${newuser.email} already exist! please chose another email.`);
                
            } else {
                // hash user password
                console.log(newuser)
               
                newuser.photo =imagepath;
                const salt = await bcrypt.genSalt(10);
                const hashpassword = await bcrypt.hash(newuser.password, salt);
                newuser.password=hashpassword;
                await db.User.create(newuser);
                resolve("done")
            }
        } catch (e) {
            reject(e);
        }

    })
}
let CheakEmail=(user)=> {
    return new Promise(async (resolve, reject) => {
        
        try {
            let currentuser = await db.User.findOne({
                where: {
                    email: user.email
                }
            });
            if (currentuser)  resolve( true);
            resolve(false);
        } catch (e) {
            reject(e);
        }
    })
}