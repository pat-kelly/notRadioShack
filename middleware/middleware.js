import {User} from '../models/user.js';
import { Profile } from '../models/profile.js';

function passDataToView(req, res, next) {
  console.log('inPassData', req.user);
  res.locals.user = req.user ? req.user : null
  res.locals.googleClientID = process.env.GOOGLE_CLIENT_ID
  next()
}

function setGuest(req, res, next){
  if(req.user){
    next()
  }else{
    User.findOne({email: req.sessionID})
    .then(foundUser =>{
      if(foundUser){
        console.log('found user', foundUser);
        res.locals.guest = foundUser;
        next()
      }else{
        const newProfile = new Profile({
          name: req.sessionID,
          avatar: null
        })
        const newUser = new User({
          email: req.sessionID,
          googleId: null,
          profile: newProfile._id
        })
        newProfile.save()
        .then(() =>{
          newUser.save()
          .then(() =>{
            res.locals.guest = newUser;
            next()
          })
          .catch(err =>{
            Profile.findByIdAndDelete(newProfile._id);
            throw new Error(err);
          })
        })
      }
    })
  }
}

function setAdminMode(req, res, next) {
  User.findById('63c896575f5eec803a93f550')
  .populate('profile')
  .then(user =>{
    // console.log(user);
    res.locals.user = user;
    req.user = user;
    next();
  })
}

function isLoggedIn(req, res, next) {
  // return next()
  if (req.isAuthenticated()) return next()
  res.redirect('/')
}

function isAdmin(req, res, next){
  if(res.locals.user.role >=900) return next();
  throw new Error('You are not authorized to view this page');
}

function isEmployee(req, res, next){
  if(res.locals.user.role >=200) return next();
  throw new Error('You are not authorized to view this page')
}

export {
  passDataToView,
  isLoggedIn,
  setAdminMode,
  isAdmin,
  isEmployee,
  setGuest,
}
