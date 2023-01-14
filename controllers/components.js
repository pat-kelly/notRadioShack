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


export {
  index,
}