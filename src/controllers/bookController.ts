import { Request, Response } from 'express';
import BookService from '../services/bookService';
import {bookValidationSchema} from "../validators/bookValidator";

const bookService = new BookService();

const getAllBooks = async (req: Request, res: Response) => {
    try {
        const books = await bookService.getAllBooks();
        res.status(200).json(books);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const getBookById = async (req: Request, res: Response) => {
    const bookId: number = parseInt(req.params.id, 10);

    try {
        const book = await bookService.getBookById(bookId);
        res.status(200).json(book);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const createBook = async (req: Request, res: Response) => {
    const bookData = req.body;

    try {


        const validationResult = bookValidationSchema.validate(bookData);
        if (validationResult.error) {
            return res.status(400).json({ error: validationResult.error.message });
        }
        const newBook = await bookService.createBook(bookData);
        res.status(201).json(newBook);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};


export { getAllBooks, getBookById, createBook };
