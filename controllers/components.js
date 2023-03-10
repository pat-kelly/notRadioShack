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
  // console.log('create', req.body);
  req.body.available = !!req.body.available;
  req.body.shortDesc = req.body.description.slice(0, 45);
  if(req.body.shortDesc.length === 45) req.body.shortDesc += '...';
  Component.create(req.body)
  .then(component =>{
    res.redirect('/components');
  })
}

function edit(req, res){
  Component.findById(req.params.id)
  .then(component =>{
    console.log(component);
    res.render('components/edit', {
      title: `Edit ${component.name}`,
      component
    })
  })
  .catch(err =>{
    console.error(err);
    res.redirect('/');
  })
}

function update(req, res){
  Component.findById(req.params.id)
  .then(component =>{
    req.body.available = !!req.body.available;
    req.body.shortDesc = req.body.description.slice(0, 45);
    if(req.body.shortDesc.length === 45) req.body.shortDesc += '...';
    component.updateOne(req.body)
    .then(component =>{
      res.redirect(`/components`)
    })
    .catch(err =>{
      console.error(err);
      res.redirect('/components');
    })
  })
  .catch(err =>{
    console.error(err);
    res.redirect('/components');
  })
}

function delComp(req, res){
  if(req.user.role >=900){
    Component.findByIdAndDelete(req.params.id)
    .then(component =>{
      res.redirect('/components');
    })
    .catch(err =>{
      console.error(err);
      res.redirect('/components');
    })
  }
}

function show(req, res){
  if(req.query.err){
    res.locals.err = req.query.err;
  }
  Component.findById(req.params.id)
  .then(component =>{
    res.render('components/show',{
      title: component.name,
      component
    })
  })
}

export {
  index,
  newComp as new,
  create,
  edit,
  update,
  delComp as delete,
  show,
}