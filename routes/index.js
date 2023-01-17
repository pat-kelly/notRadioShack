import { Router } from 'express'
import * as indexCtrl from '../controllers/index.js'

const router = Router()

//GET /
router.get('/', indexCtrl.index);

//GET /search/?searchQuery
router.get('/search', indexCtrl.search);


export {
  router
}
