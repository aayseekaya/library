import express from 'express';
import * as UserController from '../controllers/userController';
import { userValidationSchema } from '../validators/userValidator';
import { bookBorrowValidationSchema, returnAndRateBookValidationSchema } from '../validators/bookBorrowValidator';
import { validateRequest } from '../lib/validator';

const router = express.Router();

// Get all users
router.get('/', UserController.getAllUsers);

// Get user by ID
router.get('/:id', UserController.getUserById);

// Create a new user with validation
router.post('/', (req, res, next) => {
    const isValid = validateRequest(userValidationSchema, req.body, res);
    if (!isValid) return;
    next();
}, UserController.createUser);

// Borrow a book with validation
router.post('/:id/borrow/:bookId', (req, res, next) => {
    const { bookId, userId } = req.params;
    const isValid = validateRequest(bookBorrowValidationSchema, { bookId, userId }, res);
    if (!isValid) return;
    next();
}, UserController.borrowBook);

// Return and rate a book with validation
router.post('/:id/return/:bookId', (req, res, next) => {
    const { bookId, userId } = req.params;
    const { score } = req.body;
    const isValid = validateRequest(returnAndRateBookValidationSchema, { bookId, userId, score }, res);
    if (!isValid) return;
    next();
}, UserController.returnAndRateBook);

export default router;
