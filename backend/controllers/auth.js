const User = require('../models/user');

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((error, user) => {
    if (error) {
      return res.status(400).json({
        error: 'Not able to insert to DB',
      });
    }
    res.json(user);
  });
};

exports.signout = (req, res) => {
  res.json({
    message: 'User Signout',
  });
};
