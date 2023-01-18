import { Router } from 'express';
import * as productCtrl from '../controllers/products.js';
import { isLoggedIn, isEmployee } from '../middleware/middleware.js';

const router = Router()

// GET /products/edit
router.get('/', isLoggedIn, isEmployee, productCtrl.index);

//GET /products/edit/:id
router.get('/:id/edit', isLoggedIn, isEmployee, productCtrl.edit);

// GET /products/new
router.get('/new', isLoggedIn, isEmployee, productCtrl.new);

// POST /products/create
router.post('/create', isLoggedIn, isEmployee, productCtrl.create);

// POST /products/createAddComps
//!might be depreciated. leaving until i'm 100% sure.
//router.post('/createAddComps', isLoggedIn, isEmployee, productCtrl.createAddComps);

// PUT /products/:id
router.put('/:id', isLoggedIn, isEmployee, productCtrl.update);

// DELETE /products/:id
router.delete('/:id', isLoggedIn, isEmployee, productCtrl.delete);

// Get /products/:id/addComponent
router.get('/:id/addComponent',isLoggedIn, isEmployee, productCtrl.addComp);

// PATCH /products/:id
router.patch('/:id',isLoggedIn, isEmployee, productCtrl.updateComp);

// DELETE /products/:prodId/:compId
router.delete('/:prodId/:idx',isLoggedIn, isEmployee, productCtrl.delComp)

// GET /products/:id
router.get('/:id', productCtrl.show);

export {
  router
}
