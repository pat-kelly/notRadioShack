import { Router } from 'express'
import * as indexCtrl from '../controllers/index.js'

const router = Router()

//GET /
router.get('/', indexCtrl.index);



export {
  router
}
