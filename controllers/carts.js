import { Cart } from "../models/cart.js";
import { Profile } from "../models/profile.js";
import { User } from "../models/user.js";

function index(req, res){
  console.log('SHOW ME DA CART');
  console.log(req.user);

  res.render('cart/index',{
    title: 'Shopping Cart'
  })
}

export{
  index,
}