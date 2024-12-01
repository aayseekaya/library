import { Request, Response } from 'express';
import UserService from '../services/userService';
import BookBorrowService from '../services/bookBorrowService';
import { handleError } from '../lib/errorHandler';

const userService = new UserService();
const bookBorrowService = new BookBorrowService();

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

    try {
        const result = await bookBorrowService.returnAndRateBook(bookId, userId, score);
        res.status(200).json({ message: 'Book returned and rated successfully', result });
    } catch (error: any) {
        handleError(res, error);
    }
};

export { getAllUsers, getUserById, createUser, borrowBook, returnAndRateBook };
