import { Profile } from "../models/profile.js";
import { Product } from "../models/product.js";
import { Component } from "../models/component.js";
import { User } from "../models/user.js";

function index(req, res){
  console.log('SHOW ME DA CART');
  Profile.findById(req.user.profile)
  .populate('cart.prods')
  .populate('cart.comps')
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
  .populate('cart')
  .then(prof =>{
    if(req.query.type === 'prod'){
      Product.findById(req.params.id)
      .then(product =>{
        prof.cart.prods.push(product._id);
        prof.cart.prodsQty.push(req.body.prodsQty);
        prof.save()
        .then(()=>{
          res.redirect('/cart')
        })
      })
    }
    else if(req.query.type === 'comp'){
      Component.findById(req.params.id)
      .then(comp =>{
        prof.cart.comps.push(comp._id);
        prof.cart.compsQty.push(req.body.compsQty);
        prof.save()
        .then(()=>{
          res.redirect('/cart')
        })
      })
    }    
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