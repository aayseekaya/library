import express from 'express';
import * as BookController from '../controllers/bookController';
import { bookValidationSchema } from "../validators/bookValidator";
import { validateRequest } from '../lib/validator';

const router = express.Router();

// Get all books
router.get('/', BookController.getAllBooks);

// Get book by ID
router.get('/:id', BookController.getBookById);

// Create a new book with validation
router.post('/', (req, res, next) => {
    const isValid = validateRequest(bookValidationSchema, req.body, res);
    if (!isValid) return;
    next();
}, BookController.createBook);

export default router;
