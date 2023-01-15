import { Router } from 'express';
import * as compCtrl from '../controllers/components.js';
import { isLoggedIn, isAdmin } from '../middleware/middleware.js';

const router = Router()

// GET /components/edit
router.get('/',isLoggedIn, isAdmin, compCtrl.index);

// GET /components/new
router.get('/new',isLoggedIn, isAdmin, compCtrl.new);

//POST /components
router.post('/', isLoggedIn, isAdmin, compCtrl.create);

//GET /components/:id/edit
router.get('/:id/edit', isLoggedIn, isAdmin, compCtrl.edit);

// PUT /components/:id
router.put('/:id', isLoggedIn, isAdmin, compCtrl.update);

// DELETE /components/:id
router.delete('/:id', isLoggedIn, isAdmin, compCtrl.delete);

export {
  router
}
