const db = require("../models");
const User = db.user;
checkDuplicateEmail = (req, res, next) => {
    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
          res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }else if(req.body.email == ''){
        res.status(400).send({
          message: "Failed! Email field is required!"
        });
        return;
      }     
      next();
    });
};
const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
};
module.exports = verifySignUp;