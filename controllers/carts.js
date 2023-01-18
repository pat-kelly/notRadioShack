import { Cart } from "../models/cart.js";
import { Profile } from "../models/profile.js";
import { User } from "../models/user.js";

function index(req, res){
  console.log('SHOW ME DA CART');
  if(req.user){
    req.user.populate('profile');
    console.log(req.user);
    console.log(req.user.profile.populate('cart'))
    console.log('cart', req.user.profile.cart)
  }

  res.render('cart/index',{
    title: 'Shopping Cart'
  })
}

function update(req, res){
  
}

export{
  index,
  update,
}