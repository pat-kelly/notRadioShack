import { Router } from 'express';
import * as productCtrl from '../controllers/products.js';
import { isLoggedIn } from '../middleware/middleware.js';

const router = Router()

// GET /products/edit
router.get('/', isLoggedIn, productCtrl.index);

//GET /products/edit/:id
router.get('/:id/edit', isLoggedIn, productCtrl.edit);

// GET /products/new
router.get('/new', isLoggedIn, productCtrl.new);

// POST /products/create
router.post('/create', isLoggedIn, productCtrl.create);

// PUT /products/:id
router.put('/:id', isLoggedIn, productCtrl.update);

// DELETE /products/:id
router.delete('/:id', isLoggedIn, productCtrl.delete);

export {
  router
}
