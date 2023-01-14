import {User} from '../models/user.js';

function passDataToView(req, res, next) {
  res.locals.user = req.user ? req.user : null
  res.locals.googleClientID = process.env.GOOGLE_CLIENT_ID
  next()
}

function setAdminMode(req, res, next) {
  User.findById('63c2e8bae9db1dd059344adb')
  .populate('profile')
  .then(user =>{
    // console.log(user);
    res.locals.user = user;
    next();
  })
}

function isLoggedIn(req, res, next) {
  return next()
  // if (req.isAuthenticated()) return next()
  // res.redirect('/')
}

export {
  passDataToView,
  isLoggedIn,
  setAdminMode,
}
