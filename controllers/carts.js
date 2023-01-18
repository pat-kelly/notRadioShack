import { Cart } from "../models/cart.js";
import { Profile } from "../models/profile.js";
import { User } from "../models/user.js";

function index(req, res){
  console.log('SHOW ME DA CART');
  Profile.findById(req.user.profile)
  .then(prof =>{
    res.render('cart/index',{
      title: 'Shopping Cart',
      cart: prof.cart
    })
  })
  .catch(err =>{
    console.error(err);
    res.redirect('/');
  })
}

function update(req, res){
  console.log('productID', req.params.id);
  console.log('qty', req.body.prodsQty);
  console.log('query', req.query.type);
  Profile.findById(req.user.profile)
  .then(prof =>{
    if(req.query.type === 'prod'){
      prof.cart.prods.push(req.params.id);
      prof.cart.prodsQty.push(req.body.prodsQty);
    }
    else if(req.query.type === 'comp'){
      prof.cart.comps.push(req.params.id);
      prof.cart.compsQty.push(req.body.prodsQty);
    }
    prof.save()
    .then(()=>{
      res.redirect('/cart')
    })
    .catch(err =>{
      console.error(err);
      res.redirect('/');
    })
  })
  .catch(err =>{
    console.error(err);
    res.redirect('/');
  })
}

export{
  index,
  update,
}