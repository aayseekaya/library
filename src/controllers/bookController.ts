import { Request, Response } from 'express';
import BookService from '../services/bookService';
import { bookValidationSchema } from "../validators/bookValidator";
import { handleError } from '../lib/errorHandler';
import { validateRequest } from '../lib/validator';

const bookService = new BookService();

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

    try {
        const newBook = await bookService.createBook(bookData);
        res.status(201).json(newBook);
    } catch (error: any) {
        handleError(res, error);
    }
};

export { getAllBooks, getBookById, createBook };
