import mongoose from "mongoose";
import { Component } from '../models/component.js';


function index(req, res){
  Component.find({})
  .then(components =>{
    res.render('components/', {
      title: 'All Components',
      components
    })
  })
  .catch(err =>{
    console.error(err);
    res.redirect('/');
  })
}

function newComp(req, res){
  res.render('components/new', {
    title: 'Add a New Component'
  })
}

function create(req, res){
  console.log('create', req.body);
  req.body.available = !!req.body.available;
  Component.create(req.body)
  .then(component =>{
    res.redirect('/components');
  })
}

export {
  index,
  newComp as new,
  create,
}