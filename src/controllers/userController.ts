import { Request, Response } from 'express';
import UserService from '../services/userService';
import BookBorrowService from '../services/bookBorrowService';
import { userValidationSchema } from '../validators/userValidator';
import {bookBorrowValidationSchema, returnAndRateBookValidationSchema} from '../validators/bookBorrowValidator';

const userService = new UserService();

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const getUserById = async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.id, 10);

    try {
        const user = await userService.getUserById(userId);
        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const createUser = async (req: Request, res: Response) => {
    const userData = req.body;

    try {

        const validationResult = userValidationSchema.validate(userData);
        if (validationResult.error) {
            return res.status(400).json({ error: validationResult.error.message });
        }

        const newUser = await userService.createUser(userData);
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const borrowBook = async (req: Request, res: Response) => {
    const validationResult = bookBorrowValidationSchema.validate({
        bookId: req.params.bookId,
        userId: req.params.id,
    });

    const validationResult = bookBorrowValidationSchema.validate(req.params);
    if (validationResult.error) {
        return res.status(400).json({ error: validationResult.error.message });
    }

    const bookId: number = parseInt(req.params.bookId, 10);
    const userId: number = parseInt(req.params.id, 10);

    try {
        await BookBorrowService.borrowBook(bookId, userId);
        res.status(200).json({ message: 'Book borrowed successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const returnAndRateBook = async (req: Request, res: Response) => {
    try {
        const bookId: number = parseInt(req.params.bookId, 10);
        const userId: number = parseInt(req.params.id, 10);
        const score: number = parseInt(req.body.score, 10);

        const validationData = {
            bookId,
            userId,
            score,
        };

        const validationResult = returnAndRateBookValidationSchema.validate(validationData);
        if (validationResult.error) {
            return res.status(400).json({ error: validationResult.error.message });
        }

        await BookBorrowService.returnAndRateBook(bookId, userId, score);
        res.status(200).json({ message: 'Book returned and rated successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};


export { getAllUsers, getUserById, createUser, borrowBook, returnAndRateBook};
