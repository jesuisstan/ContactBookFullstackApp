import express from 'express';
import { update, deleteUser, getUserData } from '../controllers/user.js';
import { authenticateMiddleware } from './authRoute.js';

import { verifyToken } from '../verifyToken.js';

const router = express.Router();

//update user
router.put('/:id', verifyToken, update);

//delete user
router.delete('/:id', verifyToken, deleteUser);

//get a user
//router.get('/find/:id', getUser);
router.get('/getuser', authenticateMiddleware, getUserData);

export default router;
