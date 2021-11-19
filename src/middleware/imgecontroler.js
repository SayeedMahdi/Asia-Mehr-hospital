const multer = require('multer');


//make an storage 
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/userimage/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({
    storage: storage
});
module.exports =upload;