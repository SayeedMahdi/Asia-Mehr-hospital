const db = require("../models");
const bcrypt=require("bcrypt");
exports.addDoctor = async (newDoctor,imagepath) => {
    return new Promise(async (resolve, reject) => {
        try {
            //cheak email if exist 
            let isEamilExist =await CheakEmail(newDoctor);
            
            //resole if email exist 
            if (isEamilExist) {
             reject(`The email: ${newDoctor.email} already exist! please chose another email.`);
                
            } else {
                // hash user password
               
               
                newDoctor.photo =imagepath;
                const salt = await bcrypt.genSalt(9);
                
                await db.Doctors.create(newDoctor);
                console.log("This is Doctor added!");
                resolve("done")
            }
        } catch (e) {
            reject(e);
        }

    })
}
let CheakEmail=(Doctor)=> {
    return new Promise(async (resolve, reject) => {
        
        try {
            let currentuser = await db.Doctors.findOne({
                where: {
                    email: Doctor.email
                }
            });
            if (currentuser)  resolve( true);
            resolve(false);
        } catch (e) {
            reject(e);
        }
    })
}