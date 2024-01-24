// services/bookBorrowService.ts

import BookModel from '../../models/bookModel';
import BookBorrowModel from '../../models/bookBorrowModel';

class BookBorrowService {
    static async borrowBook(bookId: number, userId: number) {
        try {

            const borrowInfo = {
                borrowDate: new Date(),
                score: null
            };

            const borrowedBook = await BookModel.findByPk(bookId);

            if (!borrowedBook) {
                throw new Error('Book not found');
            }

            await borrowedBook.update({ borrowedBy: userId });

            await BookBorrowModel.create({
                ...borrowInfo,
                userId,
                bookId
            });

            return borrowedBook;
        } catch (error) {
            console.error(error);
            throw new Error('Error borrowing book');
        }
    }

    static async returnAndRateBook(bookId: number, userId: number, score: number) {
        try {
            const returnedBook = await BookModel.findByPk(bookId);

            if (!returnedBook) {
                throw new Error('Book not found or not borrowed by the user');
            }

            const borrowInfo = {
                returnDate: new Date(),
                score
            };

            await BookBorrowModel.update(
                { ...borrowInfo },
                { where: { bookId, userId, returnDate: null } }
            );

            return returnedBook;
        } catch (error) {
            console.error(error);
            throw new Error('Error returning and rating book');
        }
    }
}

export default BookBorrowService;
