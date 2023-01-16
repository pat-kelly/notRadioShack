import { Router } from 'express'
import { Component } from '../models/component.js'
import { Product } from '../models/product.js'

const router = Router()

router.get('/', function (req, res) {
  Product.find({})
  .then(products =>{
    Component.find({})
    .then(components =>{
      res.render('index', {
        title: 'Home Page',
        products,
        components
      })
    })
  })
})

export {
  router
}
