import { Request, Response } from 'express';
import UserService from '../services/userService';
import BookBorrowService from '../services/bookBorrowService';
import { userValidationSchema } from '../validators/userValidator';
import {bookBorrowValidationSchema, returnAndRateBookValidationSchema} from '../validators/bookBorrowValidator';

const userService = new UserService();
const bookBorrowService = new BookBorrowService();

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

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error: any) {
        handleError(res, error);
    }
};

const getUserById = async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.id, 10);

    try {
        const user = await userService.getUserById(userId);
        res.status(200).json(user);
    } catch (error: any) {
        handleError(res, error);
    }
};

const createUser = async (req: Request, res: Response) => {
    const userData = req.body;

    if (!validateRequest(userValidationSchema, userData, res)) return;

    try {
        const newUser = await userService.createUser(userData);
        res.status(201).json(newUser);
    } catch (error: any) {
        handleError(res, error);
    }
};

const borrowBook = async (req: Request, res: Response) => {
    const bookId: number = parseInt(req.params.bookId, 10);
    const userId: number = parseInt(req.params.id, 10);

    if (!validateRequest(bookBorrowValidationSchema, { bookId, userId }, res)) return;

    try {
        const result = await bookBorrowService.borrowBook(bookId, userId);
        res.status(200).json({ message: 'Book borrowed successfully', result });
    } catch (error: any) {
        handleError(res, error);
    }
};

const returnAndRateBook = async (req: Request, res: Response) => {
    const { score } = req.body;
    const bookId: number = parseInt(req.params.bookId, 10);
    const userId: number = parseInt(req.params.id, 10);

    if (!validateRequest(returnAndRateBookValidationSchema, { bookId, userId, score }, res)) return;

    try {
        const result = await BookBorrowService.returnAndRateBook(bookId, userId, score);
        res.status(200).json({ message: 'Book returned and rated successfully', result });
    } catch (error: any) {
        handleError(res, error);
    }
};

export { getAllUsers, getUserById, createUser, borrowBook, returnAndRateBook };
