import express from 'express';
import * as BookController from '../controllers/bookController';
import {getBookById} from "../controllers/bookController";

const router = express.Router();

router.get('/', BookController.getAllBooks);
router.get('/:id', BookController.getBookById);
router.post('/', BookController.createBook);

export default router;
