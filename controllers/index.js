import { Component } from '../models/component.js'
import { Product } from '../models/product.js'

function index (req, res) {
  let prodFilter = false, compFilter = false;
  console.log('query',req.query.prodFilter);
  if(req.query.prodFilter){
    switch (req.query.prodFilter) {
      case 'products':
        prodFilter = true;
        break;
      case 'components':
        compFilter = true;
        break;
    }
  }else{
    prodFilter = true;
    compFilter = true;
  }
  Product.find( prodFilter ? {} : {filterOut: true} )
  .then(products =>{
    Component.find( compFilter ? {} : {filterOut: true} )
    .then(components =>{
      console.log('products', products);
      console.log('components', components)
      res.render('index', {
        title: 'Home Page',
        products,
        components
      })
    })
  })
}

export {
  index,
}