const {check}=require("express-validator");

let vladition=[
   check("email","invalild Email").isEmail().trim(),
   check('password', 'The password must be 5+ chars long and contain a number')
   .not()
   .isIn(['123', 'password', 'god'])
   .withMessage('Do not use a common word as the password')
   .isLength({ min: 5 })
   .matches(/\d/)
]

module.exports.vladition=vladition;