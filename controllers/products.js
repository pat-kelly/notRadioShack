import mongoose from "mongoose";
import { Product } from '../models/product.js';
import { Component } from '../models/component.js';

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
  console.log('render edit view');
}

function newProd(req, res){
  res.render('products/new', {
    title: 'Add New Product'
  })
}

function create(req, res){
  req.body.available = !!req.body.available;
  req.body.price = req.body.price.replace('$', '');
  console.log(req.body);
  Product.create(req.body)
  .then(product =>{
    res.redirect('/products/edit');
  })
  .catch(err =>{
    console.error(err);
    res.redirect('/products/edit');
  })
}

export {
  index,
  edit,
  newProd as new,
  create,
}