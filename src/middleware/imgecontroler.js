const multer = require('multer');
const path =require("path");



//make an storage 
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {

        callBack(null, './src/public/usersimage/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({
    storage: storage
});
module.exports =upload;
