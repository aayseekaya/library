import express from 'express';
import * as UserController from '../controllers/userController';

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.post('/:id/borrow/:bookId', UserController.borrowBook);
router.post('/:id/return/:bookId', UserController.returnAndRateBook);
export default router;
