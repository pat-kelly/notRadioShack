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
  .populate('components')
  .then(product =>{
    // console.log(product);
    res.render('products/edit', {
      title: `Edit ${product.name}`,
      product
    })
  })
  .catch(err =>{
    console.error(err);
    res.redirect('/');
  })
}

function newProd(req, res){
  Component.find({})
  .then(components =>{
    res.render('products/new', {
      title: 'Add New Product',
      components
    })
  })
}

function create(req, res){
  // console.log(req.body);
  req.body.available = !!req.body.available;
  req.body.price = req.body.price.replace('$', '');
  req.body.shortDesc = req.body.description.slice(0, 45);
  if(req.body.shortDesc.length === 45) req.body.shortDesc += '...';
  // console.log(req.body);
  Product.create(req.body)
  .then(product =>{
    // console.log(req.query);
    req.query.editComps ? 
    res.redirect(`/products/${product._id}/addComponent`)
    : res.redirect('/products');
  })
  .catch(err =>{
    console.error(err);
    res.redirect('/products');
  })
}

function update(req, res){
  // console.log(req.query.editComp ? 'truthy' : 'falsy');
  Product.findById(req.params.id)
  .then(product =>{
    req.body.available = !!req.body.available;
    req.body.shortDesc = req.body.description.slice(0, 45);
    if(req.body.shortDesc.length === 45) req.body.shortDesc += '...';
    product.updateOne(req.body)
    .then(() =>{
      req.query.editComp ? 
        res.redirect(`/products/${product._id}/addComponent`) 
        : res.redirect(`/products`);      
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
  // console.log(req.params.id, 'in delete');
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

function addComp(req, res){
  // console.log('addComp');
  Product.findById(req.params.id)
  .populate('components')
  .then(product =>{
    Component.find({})
    .then(components =>{
      // console.log(product.components)
      res.render('products/addComponent', {
        title: `Adding Components to ${product.name}`,
        product,
        components
      })
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

function updateComp(req, res){
  // console.log('prodID', req.params.id);
  // console.log('body', req.body);
  Product.findById(req.params.id)
  .then(product =>{
    product.components.push(req.body.compId);
    if(!req.body.qty) req.body.qty = 1;
    product.compQty.push(req.body.qty);
    product.save()
    .then(product =>{
      res.redirect(`/products/${product._id}/addComponent`);
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

function delComp(req, res){
  console.log('prodId', req.params.prodId);
  console.log('idx', req.params.idx);
  Product.findById(req.params.prodId)
  .then(product =>{
    product.components.splice(req.params.idx, 1);
    product.compQty.splice(req.params.idx, 1);
    product.save()
    .then(product =>{
      res.redirect(`/products/${product._id}/addComponent`)
    })
  })
}

function show(req, res){
  if(req.query.err){
    res.locals.err = req.query.err;
  }
  Product.findById(req.params.id)
  .populate('components')
  .then(product =>{
    res.render('products/show',{
      title: product.name,
      product,      
    })
  })
}

export {
  index,
  edit,
  newProd as new,
  create,
  update,
  delProd as delete,
  addComp,
  updateComp,
  delComp,
  show,
}