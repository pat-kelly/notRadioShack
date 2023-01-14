import { Router } from 'express';
import * as compCtrl from '../controllers/components.js';
import { isLoggedIn, isAdmin } from '../middleware/middleware.js';

const router = Router()

// GET /components/edit
router.get('/', isAdmin, compCtrl.index);

export {
  router
}
