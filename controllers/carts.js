import { Profile } from "../models/profile.js";
import { Product } from "../models/product.js";
import { Component } from "../models/component.js";

function index(req, res){
  Profile.findById(getProf(req))
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
  Profile.findById(getProf(req))
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

function delCart(req, res){
  console.log('IT WORKS!');
}

function checkout(req, res){
  //redirect to thank you page
  Profile.findById(getProf(req))
  .populate('cart.prods', '_id')
  .populate('cart.comps', '_id')
  .then(prof =>{
    for(let i=0; i < prof.cart.prods.length; i++){
      Product.findById(prof.cart.prods[i])
      .populate('components', '_id')
      .then(product =>{
        console.log(product.name);
        // Go through the cart, removing each Product, and all quantities of 
        // components that are attached to it from inventory.
        //TODO check for comp quantities before getting here.
        for(let i=0; i< product.components.length; i++){
          Component.findById(product.components[i]._id)
          .then(comp =>{
            comp.qty = (comp.qty - product.compQty[i]);
            comp.save();
          })
          .catch(err =>{
            throw new Error(err);
          })
        }
        product.qty = product.qty - prof.cart.prodsQty[i];
        product.save();
      })
      .catch(err=>{
        throw new Error(err);
      })
    }
    // Go through components of cart, removing from inventory.
    for(let i=0; i < prof.cart.comps.length; i++){
      Component.findById(prof.cart.comps[i])
      .then(component =>{
        console.log(component);
        component.qty = component.qty - prof.cart.compsQty[i];
        component.save();
      })
      .catch(err =>{
        throw new Error(err);
      })
    }
    res.redirect('/cart/checkout');
  })
  .catch(err =>{
    console.error(err);
    redirect('/');
  })
}

function emptyCart(){

}

function getProf(req){
  let toFind;
  if(req.user){
    toFind = req.user.profile
  }else{
    toFind = res.locals.guest.profile;
  }
  return toFind;
}

export{
  index,
  update,
  delCart as delete,
  checkout
}