import express from 'express';
import {getTransaction,createTransaction,getAssetsTransaction,deleteTransaction,updateTransaction} from '../controllers/transaction.js'

import auth from '../middleware/auth.js';

const router=express.Router();

router.get('/',auth,getTransaction);
router.post('/',auth,createTransaction);
router.get('/getTransaction',auth,getAssetsTransaction);
router.delete('/:id',auth,deleteTransaction);
router.patch('/:id',auth,updateTransaction);


export default router;