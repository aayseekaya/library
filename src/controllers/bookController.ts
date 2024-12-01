import { Request, Response } from 'express';
import BookService from '../services/bookService';
import { bookValidationSchema } from "../validators/bookValidator";

const bookService = new BookService();

// Generic error handler
const handleError = (res: Response, error: any) => {
    res.status(500).json({ error: error.message });
};

// Validate request body using the provided schema
const validateRequest = (schema: any, data: any, res: Response) => {
    const { error } = schema.validate(data);
    if (error) {
        res.status(400).json({ error: error.message });
        return false;
    }
    return true;
};

const getAllBooks = async (_: Request, res: Response) => {
    try {
        const books = await bookService.getAllBooks();
        res.status(200).json(books);
    } catch (error: any) {
        handleError(res, error);
    }
};

const getBookById = async (req: Request, res: Response) => {
    const bookId: number = parseInt(req.params.id, 10);

    try {
        const book = await bookService.getBookById(bookId);
        res.status(200).json(book);
    } catch (error: any) {
        handleError(res, error);
    }
};

const createBook = async (req: Request, res: Response) => {
    const bookData = req.body;

    // Validate the book data
    if (!validateRequest(bookValidationSchema, bookData, res)) return;

    try {
        const newBook = await bookService.createBook(bookData);
        res.status(201).json(newBook);
    } catch (error: any) {
        handleError(res, error);
    }
};

export { getAllBooks, getBookById, createBook };
