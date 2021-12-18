const {check}=require("express-validator");

let vladition=[
   check("email","invalild Email").isEmail().trim(),
   check('password')
   .not()
   .isIn(['123', 'password', 'god'])
   .withMessage('Do not use a common word as the password')
   .isLength({ min: 5 })
   .withMessage("the password must be 5+ cracter and atleast one cracter")
   .matches(/\d/)
]

module.exports.vladition=vladition;