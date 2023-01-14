import mongoose from "mongoose";
import { Product } from '../models/product.js';
import { Component } from '../models/component.js';
import { localsName } from "ejs";

function index(req, res){
  Product.find({})
  .then(products =>{
    res.render('products/', {
      title: 'All Products',
      products
    })
  })
  .catch(err =>{
    console.error(err);
    res.redirect('/');
  })
}

function edit(req, res){
  Product.findById(req.params.id)
  .then(product =>{
    console.log(product);
    res.render('products/edit', {
      title: `Edit ${product.name}`,
      product
    })
  })
}

function newProd(req, res){
  res.render('products/new', {
    title: 'Add New Product'
  })
}

function create(req, res){
  console.log(req.body);
  req.body.available = !!req.body.available;
  req.body.price = req.body.price.replace('$', '');
  // console.log(req.body);
  Product.create(req.body)
  .then(product =>{
    res.redirect('/products');
  })
  .catch(err =>{
    console.error(err);
    res.redirect('/products');
  })
}

function update(req, res){
  Product.findById(req.params.id)
  .then(product =>{
    req.body.available = !!req.body.available;
    Product.updateOne(req.body)
    .then(() =>{
      res.redirect(`/products`)
    })
    .catch(err =>{
      console.error(err);
      res.redirect('/products');
    })
  })
  .catch(err =>{
    console.error(err);
    res.redirect('/products');
  })
}

function delProd(req, res){
  console.log(req.params.id, 'in delete');
  if(req.user.role >=900){
    Product.findByIdAndDelete(req.params.id)
    .then(product =>{
      res.redirect('/products');
    })
    .catch(err =>{
      console.error(err);
      res.redirect('/products');
    })
  }
}

export {
  index,
  edit,
  newProd as new,
  create,
  update,
  delProd as delete,
}