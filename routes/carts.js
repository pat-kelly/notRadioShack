import { Router } from 'express'
import * as cartsCtrl from '../controllers/carts.js'

const router = Router()

//GET /
router.get('/', cartsCtrl.index);

export {
  router
}
