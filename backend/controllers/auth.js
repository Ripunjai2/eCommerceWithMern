const User = require('../models/user');
const { check, validationResult } = require('express-validator');
//const user = require('../models/user');
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");


exports.signup = (req, res) => {
  //Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      error: errors.array()[0].msg,
    });
  }
  //Saving to db
  const user = new User(req.body);
  user.save((error, user) => {
    if (error) {
      return res.status(400).json({
        error: 'Not able to insert to DB',
      });
    }
    //Displaying on webpage
    res.json({
      name: user.name,
      email: user.email,
    });
  });
};

exports.signin = ((req, res) => {
  //Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      error: errors.array()[0].msg,
    });
  }

  //lets see if the signin email exists in db or not
  const { email, password } = req.body;


  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      res.status(401).json({
        ERROR: "The email you are trying to signin with does not exist"
      })
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        Error: "The email and password do not match"
      })
    }



    //creating token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //put token in cookies
    res.cookie("token", token, { expire: new Date() + 9999 })

    //send response to front end
    const { _id, name, role } = user;
    res.json({ token, user: { _id, name, email, role } })

  })

})


exports.signout = (req, res) => {
  //remove token from the okies
  res.clearcookies("token");
};


exports.isSignedIn=expressJwt({
  secret:process.env.SECRET,
  userProperty:"auth"
})


exports.isAuthenticated=(req,res,next)=>{
  //req.profile will be set at fronend time.....so keep an eye on that
  let checker=req.profile && req.auth && req.profile._id===req.auth._id;
  if(!checker){
    return res.status(403).json({
      error:"Access Denied"
    })
  } 
  next();
}


exports.isAdmin=(req,res,next)=>{
  if(role===0){
    return res.status(403).json({
      error:"You are not an admin"
    })
  }
  next();
}

