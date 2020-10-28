import { Router } from 'express';
import * as AuthCtrl from '../controllers/auth.controllers';
import {verifyToken} from '../middlewares/validate-token'

import {isEmailExist} from '../middlewares/register';

const router = Router();

router.post('/login', AuthCtrl.signIn)
router.post('/register', isEmailExist, AuthCtrl.register );
router.get('/data',verifyToken,  AuthCtrl.getDataUserbyToken);

export default router;