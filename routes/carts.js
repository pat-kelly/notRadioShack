import { Router } from 'express'
import * as cartsCtrl from '../controllers/carts.js'

const router = Router()

//GET /
router.get('/', cartsCtrl.index);

// PUT /:id
router.put('/:id', cartsCtrl.update);

// EMPTY /
router.delete('/', cartsCtrl.delete);

// POST /
router.post('/', cartsCtrl.checkout)

export {
  router
}
